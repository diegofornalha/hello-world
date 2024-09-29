import React, { useState, useEffect } from "react";
import * as fcl from "@blocto/fcl";
import Prism from "prismjs"; // Importa Prism.js para formatação de código
import "prismjs/components/prism-json"; // Importa suporte para JSON
import Button from "@mui/material/Button"; // Importa o botão do Material-UI
import CircularProgress from "@mui/material/CircularProgress"; // Importa o indicador de carregamento
import Typography from "@mui/material/Typography"; // Importa tipografia do Material-UI
import Box from "@mui/material/Box"; // Para organizar os botões lado a lado

const GetLatestBlock = () => {
  const [block, setBlock] = useState(null); // Estado para armazenar o último bloco
  const [loading, setLoading] = useState(false); // Estado para mostrar o indicador de carregamento
  const [isVisible, setIsVisible] = useState(true); // Estado para alternar a visibilidade do JSON

  // Função para buscar o último bloco na Flow blockchain
  const runGetLatestBlock = async () => {
    setLoading(true); // Ativa o estado de carregamento
    try {
      const response = await fcl.send([fcl.getBlock(true)]);
      const latestBlock = await fcl.decode(response);
      setBlock(latestBlock);
    } catch (error) {
      console.error("Erro ao obter o bloco:", error);
    } finally {
      setLoading(false); // Desativa o estado de carregamento
    }
  };

  // Atualiza o destaque de sintaxe para o JSON usando Prism.js
  useEffect(() => {
    if (block && isVisible) {
      Prism.highlightAll(); // Mantém o realce de sintaxe ao reexibir o JSON
    }
  }, [block, isVisible]);

  return (
    <div>
      {/* Organização dos botões lado a lado */}
      <Box
        display="flex"
        justifyContent="center"
        gap="10px"
        marginBottom="20px"
      >
        {/* Botão para obter o último bloco */}
        <Button
          variant="contained"
          color="primary"
          onClick={runGetLatestBlock}
          disabled={loading} // Desativa o botão enquanto os dados estão sendo carregados
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Obter Último Bloco"
          )}
        </Button>

        {/* Botão para alternar a visibilidade do JSON */}
        {block && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setIsVisible((prev) => !prev)}
          >
            {isVisible ? "Recolher" : "Mostrar"}
          </Button>
        )}
      </Box>

      {/* Mostra o JSON formatado quando o bloco é carregado e visível */}
      {block && isVisible && (
        <pre
          style={{
            textAlign: "left",
            backgroundColor: "#1d1f21",
            padding: "20px",
            borderRadius: "8px",
            color: "#f8f8f2", // Cor do texto para melhor legibilidade no fundo escuro
          }}
        >
          <code className="language-json">
            {JSON.stringify(block, null, 2)}
          </code>
        </pre>
      )}

      {/* Mensagem caso não tenha carregado nada ainda */}
      {!block && !loading && (
        <Typography variant="body1" color="textSecondary">
          Clique no botão para obter o último bloco da Flow blockchain.
        </Typography>
      )}
    </div>
  );
};

export default GetLatestBlock;
