import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.scss";
import { ReactFlowProvider } from "@xyflow/react";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ReactFlowProvider>
  </React.StrictMode>
);
