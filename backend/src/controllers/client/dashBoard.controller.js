import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/apiError.js";
import { ApiResponse } from "../../utils/apiResponse.js";
import { Expense } from "../../models/client/expenses.model.js";

const userExpenseCard = asyncHandler(async (req, res) => {
    // Get the current year as a string
    const currentYear = new Date().getFullYear().toString();

    // Aggregate data from the database with optimized $lookup and projection
    const userData = await Expense.aggregate([
        {
            $match: {
                empId: req.user._id,
                expenseMonthYear: { $regex: currentYear } // Match year in expenseMonthYear
            }
        },
        {
            $lookup: {
                from: "expensetypes",
                localField: "expenseType",
                foreignField: "_id",
                as: "expenseType",
                pipeline: [
                    {
                        $project: { _id: 0, expenseType: 1, limit: 1 } // Only project needed fields
                    }
                ]
            }
        },
        {
            $addFields: {
                expenseType: { $arrayElemAt: ["$expenseType.expenseType", 0] },
                limit: { $arrayElemAt: ["$expenseType.limit", 0] }
            }
        }
    ]);

    // Early return if no userData is found
    if (!userData || userData.length === 0) {
        return res.status(404).json(new ApiResponse(404, [], "No data found"));
    }

    // Use reduce to create a Map of expenseType with aggregated spent amount
    const data = userData.reduce((acc, i) => {
        const expenseType = i.expenseType;
        if (!expenseType) return acc; // Skip if no expenseType
        
        const existing = acc.get(expenseType);
        
        // If the expenseType exists, update the spent amount
        if (existing) {
            existing.spent += i.amount;
        } else {
            // Otherwise, create a new entry
            acc.set(expenseType, { 
                expenseType: expenseType, 
                spent: i.amount, 
                limit: i.limit 
            });
        }

        return acc;
    }, new Map());

    // Convert Map to array and send the response
    res.status(200).json(new ApiResponse(200, [...data.values()], "Fetched User Expense Card data"));
});


export { userExpenseCard }