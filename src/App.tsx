import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Quiz from "./components/Quiz";
import InputFileUpload from "./components/InputFileUpload";
import { QuestionItem } from "./types/quiz";
import toQuizQuestion from "./utils/toQuizQuestion";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#121212", paper: "#1e1e1e" },
    text: { primary: "#ffffff" },
  },
});

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: { main: "#1976d2" },
//     background: { default: "#f5f5f5", paper: "#ffffff" },
//     text: { primary: "#000000" },
//   },
// });

const App: React.FC = () => {
  const [data, setData] = useState<QuestionItem[]>([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <Container sx={{ textAlign: "center" }}>
        <Typography variant="h3">Quiz The Web</Typography>
        <Divider sx={{ margin: "15px 0" }} />
        {data?.length ? (
          <Quiz questions={data.map(toQuizQuestion)} />
        ) : (
          <InputFileUpload
            onUpload={(uploadedData: QuestionItem[]) => setData(uploadedData)}
          />
        )}
      </Container>
    </ThemeProvider>
  );
};

export default App;
