"use strict";

import { Router } from "express";
import { verifyUserJWT } from "../../middlewares/auth.middleware.js";
import { userExpenseCard } from "../../controllers/client/dashBoard.controller.js"

const router = Router()

router.route("/get-user-card-details").get(verifyUserJWT, userExpenseCard)

export default router;