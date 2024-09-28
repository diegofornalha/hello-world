import React, { useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa a biblioteca FCL

// Função principal do componente
const GetLatestBlock = () => {
  const [block, setBlock] = useState(null); // Estado para armazenar as informações do bloco

  // Função chamada ao clicar no botão
  const runGetLatestBlock = async () => {
    try {
      // Consulta a API do Flow para obter o bloco mais recente
      const response = await fcl.send([fcl.getBlock(true)]);
      const latestBlock = await fcl.decode(response);
      setBlock(latestBlock); // Define o estado com as informações do bloco
    } catch (error) {
      console.error("Erro ao obter o bloco:", error);
    }
  };

  return (
    <div>
      <button onClick={runGetLatestBlock}>Obter Último Bloco</button>
      {block && (
        <pre>
          <code>{JSON.stringify(block, null, 2)}</code>
        </pre>
      )}
    </div>
  );
};

export default GetLatestBlock;
