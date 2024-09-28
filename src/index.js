import React from "react";
import ReactDOM from "react-dom";
import * as fcl from "@blocto/fcl"; // Importa FCL
import "./index.css";
import App from "./App";

fcl.config({
  "accessNode.api": "https://rest-mainnet.onflow.org", // Conecta ao Flow testnet
  "discovery.wallet":
    "https://wallet-v2.blocto.app/dd84a1e5-b351-4893-95cf-edf433c137d9/flow/authn", // Conecta com Blocto Wallet usando seu DApp ID
  "app.detail.title": "brasil",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
