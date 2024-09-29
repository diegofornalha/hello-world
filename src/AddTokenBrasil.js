import React, { useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para transações
import Button from "@mui/material/Button"; // Importa botão do Material-UI
import CircularProgress from "@mui/material/CircularProgress"; // Importa indicador de carregamento
import Typography from "@mui/material/Typography"; // Importa tipografia do Material-UI
import Link from "@mui/material/Link"; // Importa componente de link do Material-UI
import Box from "@mui/material/Box"; // Para organizar layout
import Alert from "@mui/material/Alert"; // Importa componente de alerta para mensagens de sucesso

const AddTokenBrasil = () => {
  const [status, setStatus] = useState(""); // Estado para mostrar o status da transação
  const [transactionId, setTransactionId] = useState(null); // Estado para armazenar o ID da transação
  const [loading, setLoading] = useState(false); // Estado para controlar o indicador de carregamento

  const addToken = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    setStatus("Adicionando Token Brasil..."); // Mostra status de envio

    try {
      // Envia a transação para adicionar o Token Brasil
      const txId = await fcl.mutate({
        cadence: `
     import FungibleToken from 0xf233dcee88fe0abe
     import brasil from 0x7bf07d719dcb8480

     transaction {
        prepare(signer: auth(Storage, Capabilities) &Account) {
            if signer.storage.borrow<&brasil.Vault>(from: /storage/brasilVault ) == nil {
                signer.storage.save(<- brasil.createEmptyVault(vaultType: Type<@brasil.Vault>()), to: /storage/brasilVault)
            }

            if signer.capabilities.exists(/public/brasilReceiver) == false {
                let receiverCapability = signer.capabilities.storage.issue<&brasil.Vault>(/storage/brasilVault)
                signer.capabilities.publish(receiverCapability, at: /public/brasilReceiver)
            }
       
            if signer.capabilities.exists(/public/brasilMetadata) == false {
                let balanceCapability = signer.capabilities.storage.issue<&brasil.Vault>(/storage/brasilVault)
                signer.capabilities.publish(balanceCapability, at: /public/brasilMetadata)
            }
        }
      }
        `,
        proposer: fcl.currentUser().authorization,
        payer: fcl.currentUser().authorization,
        authorizations: [fcl.currentUser().authorization],
        limit: 100, // Limite de gas
      });

      // Armazena o ID da transação no estado
      setTransactionId(txId);

      // Monitora o status da transação até ser selada (confirmada)
      const txStatus = await fcl.tx(txId).onceSealed();

      if (txStatus.status === 4) {
        setStatus("Token Brasil adicionado com sucesso!");
      } else {
        setStatus(
          `Erro ao adicionar o Token Brasil: Status ${txStatus.status}`
        );
      }

      console.log("ID da Transação:", txId); // Exibe o ID da transação no console
    } catch (error) {
      setStatus(`Erro ao adicionar o Token Brasil: ${error.message}`);
      console.error("Erro ao adicionar o Token Brasil:", error); // Log de erro no console
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        onClick={addToken}
        disabled={loading}
        style={{ marginBottom: "20px" }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Adicionar Token Brasil"
        )}
      </Button>

      {status && (
        <Box my={2} width="100%" display="flex" justifyContent="center">
          {status === "Token Brasil adicionado com sucesso!" ? (
            <Alert severity="success" style={{ textAlign: "center" }}>
              {status} <br />
              {transactionId && (
                <Link
                  href={`https://www.flowscan.io/tx/${transactionId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                >
                  Ver transação no FlowScan
                </Link>
              )}
            </Alert>
          ) : (
            <Typography variant="body1" color="textSecondary">
              {status}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AddTokenBrasil;
