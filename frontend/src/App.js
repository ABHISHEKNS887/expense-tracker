import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Theme";
import { Typography } from "@mui/material";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Typography variant="h4">Expense tracker</Typography>
        </header>
      </div>
    </ThemeProvider>
  );
}

export default App;
