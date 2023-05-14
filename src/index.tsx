/** @format */
import { Provider } from "react-redux";
import { StyledEngineProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import GlobalStyles from "./components/GlobalStyles/";
import Routing from "./Routing";
import {store} from "./app/store"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
   <StyledEngineProvider injectFirst>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
  <Provider store={store}>
  <GlobalStyles>
    <Routing />
  </GlobalStyles>
  </Provider>
   </LocalizationProvider>
  </StyledEngineProvider>
   //</React.StrictMode> 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
