import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SettingsProvider } from "./contexts/SettingsContext";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <StrictMode>
      <Provider store={store}>
        <SettingsProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SettingsProvider>
      </Provider>
    </StrictMode>
  </>
);
