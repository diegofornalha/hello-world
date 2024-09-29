import React, { useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para transações
import Button from "@mui/material/Button"; // Importa botão do Material-UI
import CircularProgress from "@mui/material/CircularProgress"; // Importa indicador de carregamento
import Typography from "@mui/material/Typography"; // Importa tipografia do Material-UI
import Link from "@mui/material/Link"; // Importa componente de link do Material-UI
import Box from "@mui/material/Box"; // Para organizar layout
import Alert from "@mui/material/Alert"; // Importa componente de alerta para mensagens de sucesso

const SendTransaction = () => {
  const [status, setStatus] = useState(""); // Estado para mostrar o status da transação
  const [transactionId, setTransactionId] = useState(null); // Estado para armazenar o ID da transação
  const [loading, setLoading] = useState(false); // Estado para controlar o indicador de carregamento

  const sendTx = async () => {
    setLoading(true); // Ativa o indicador de carregamento
    setStatus("Enviando transação..."); // Mostra status de envio

    try {
      const amount = "10.0"; // Valor a ser transferido
      const recipient = "0xcee767cac4c076fb"; // Endereço do destinatário na mainnet

      // Envia a transação para a rede Flow Mainnet
      const txId = await fcl.mutate({
        cadence: `
        import FungibleToken from 0xf233dcee88fe0abe
        import brasil from 0x7bf07d719dcb8480

        transaction(amount: UFix64, recipient: Address) {
          let sentVault: @{FungibleToken.Vault}

          prepare(signer: auth(Storage, BorrowValue) &Account) {
            let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &brasil.Vault>(from: /storage/brasilVault)
              ?? panic("Não foi possível acessar o Vault do proprietário!")

            self.sentVault <- vaultRef.withdraw(amount: amount)
          }

          execute {
            let recipientAccount = getAccount(recipient)
            let receiverRef = recipientAccount.capabilities.borrow<&{FungibleToken.Receiver}>(/public/brasilReceiver)!
            receiverRef.deposit(from: <-self.sentVault)
          }
        }
        `,
        args: (arg, t) => [arg(amount, t.UFix64), arg(recipient, t.Address)], // Argumentos para a transação
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
        // Status 4 significa sucesso (selada)
        setStatus(`Transação bem-sucedida!`);
      } else {
        setStatus(`Erro ao processar a transação: Status ${txStatus.status}`);
      }

      console.log("ID da Transação:", txId); // Exibe o ID da transação no console
    } catch (error) {
      // Mostra o erro no estado
      setStatus(`Erro ao enviar transação: ${error.message}`);
      console.error("Erro ao enviar transação:", error); // Log de erro no console
    } finally {
      setLoading(false); // Desativa o indicador de carregamento
    }
  };

  return (
    <div>
      {/* Botão de envio da transação */}
      <Button
        variant="contained"
        color="primary"
        onClick={sendTx}
        disabled={loading} // Desativa o botão enquanto a transação está sendo enviada
        style={{ marginBottom: "20px" }}
      >
        {loading ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Enviar Transação"
        )}
      </Button>

      {/* Exibição do status da transação */}
      {status && (
        <Box my={2}>
          {status === "Transação bem-sucedida!" ? (
            <Alert severity="success">
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
    </div>
  );
};

export default SendTransaction;
