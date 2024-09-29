import React from "react";
import styled from "styled-components";
import Authenticate from "./Authenticate"; // Componente para login/logout
import GetLatestBlock from "./GetLatestBlock"; // Componente para ver o último bloco
import SendTransaction from "./SendTransaction"; // Componente para enviar transações
import AddTokenBrasil from "./AddTokenBrasil"; // Componente para adicionar o Token Brasil

// Estilos globais para o Wrapper principal
const Wrapper = styled.div`
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  padding: 40px 20px; /* Aumenta o espaçamento superior */
  text-align: center;
  background-color: #f7f7f7; /* Fundo claro para separar o conteúdo do fundo */
  min-height: 100vh;
`;

// Container centralizado com sombra para destacar o conteúdo
const Container = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

// Estilo do título principal
const Title = styled.h1`
  color: #a00000;
  font-size: 2.5rem;
  margin-bottom: 30px;
  font-weight: bold;
`;

// Subtítulo reutilizável
const SubTitle = styled.h2`
  color: #a00000;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 600;
`;

// Seção reutilizável para espaçamento e estrutura
const Section = styled.section`
  margin: 40px 0; /* Aumenta o espaçamento entre seções */
`;

function App() {
  return (
    <Wrapper>
      <Container>
        {/* Título principal */}
        <Title>Ganhe mais Tokens Brasil 🐋</Title>

        {/* Seção de Autenticação */}
        <Section>
          <SubTitle>Autenticação</SubTitle>
          <Authenticate /> {/* Componente de login e logout */}
        </Section>

        {/* Seção para adicionar o Token Brasil */}
        <Section>
          <SubTitle>Adicionar Token Brasil</SubTitle>
          <AddTokenBrasil /> {/* Componente para adicionar o Token Brasil */}
        </Section>

        {/* Seção de Blocos */}
        <Section>
          <SubTitle>Último Bloco na Rede Flow</SubTitle>
          <GetLatestBlock /> {/* Componente para obter o último bloco */}
        </Section>

        {/* Seção de Transações */}
        <Section>
          <SubTitle>Enviar Transação</SubTitle>
          <SendTransaction /> {/* Componente para enviar transações */}
        </Section>
      </Container>
    </Wrapper>
  );
}

export default App;
