import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./app/App";
import "./css/App.css";
import store from "./context/store/globalStore";
import { Provider } from "react-redux";
const root = ReactDOM.createRoot(document.getElementById("root"));
const Apps = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </HashRouter>
  );
};
root.render(<Apps />);
