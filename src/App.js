import ThemeProvider from "./theme";

import Router from "./routes";

import React from "react";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </>
  );
}
export default App;
