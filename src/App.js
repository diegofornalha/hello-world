import React from "react";
import styled from "styled-components";

import GetLatestBlock from "./GetLatestBlock"; // Componente para ver o último bloco
import Authenticate from "./Authenticate"; // Componente para login/logout
import SendTransaction from "./SendTransaction"; // Componente para enviar transações
const Wrapper = styled.div`
  font-size: 13px;
  font-family: Arial, Helvetica, sans-serif;
`;

function App() {
  return (
    <Wrapper>
      <h1>Deploy de Contrato e Transações Flow</h1>
      <Authenticate /> {/* Login e Logout */}
      <GetLatestBlock /> {/* Último bloco */}
      <SendTransaction /> {/* Enviar transação */}
    </Wrapper>
  );
}

export default App;
