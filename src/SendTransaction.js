import React from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para transações

const SendTransaction = () => {
  const sendTx = async () => {
    try {
      // Argumentos da transação
      const amount = "10.0"; // Valor a ser transferido
      const recipient = "0xcee767cac4c076fb"; // Endereço do destinatário na mainnet (substituir pelo correto)

      // Transação assinada e enviada para a rede Flow na mainnet
      const transactionId = await fcl.mutate({
        cadence: `
        import FungibleToken from 0xf233dcee88fe0abe
        import brasil from 0x7bf07d719dcb8480

        transaction(amount: UFix64, recipient: Address) {

          // Recurso Vault que contém os tokens a serem transferidos
          let sentVault: @{FungibleToken.Vault}

          prepare(signer: auth(Storage, BorrowValue) &Account) {
            // Obtém referência ao vault armazenado do signatário
            let vaultRef = signer.storage.borrow<auth(FungibleToken.Withdraw) &brasil.Vault>(from: /storage/brasilVault)
              ?? panic("Não foi possível obter referência ao Vault do proprietário!")

            // Retira tokens do vault armazenado do signatário
            self.sentVault <- vaultRef.withdraw(amount: amount)
          }

          execute {
            // Obtém o objeto da conta pública do destinatário
            let recipientAccount = getAccount(recipient)

            // Obtém uma referência ao Receiver do destinatário
            let receiverRef = recipientAccount.capabilities.borrow<&{FungibleToken.Receiver}>(/public/brasilReceiver)!
              
            // Deposita os tokens retirados no receiver do destinatário
            receiverRef.deposit(from: <-self.sentVault)
          }
        }
        `,
        args: (arg, t) => [arg(amount, t.UFix64), arg(recipient, t.Address)], // Passa os argumentos amount e recipient
        proposer: fcl.currentUser().authorization, // O usuário atual é o proponente
        payer: fcl.currentUser().authorization, // O usuário atual paga pela transação
        authorizations: [fcl.currentUser().authorization], // O usuário atual é o autorizado
        limit: 100, // Limite de uso de recursos (gas)
      });

      console.log("ID da Transação:", transactionId); // Exibe o ID da transação no console
    } catch (error) {
      console.error("Erro ao enviar transação:", error); // Log de erros
    }
  };

  return <button onClick={sendTx}>Enviar Transação</button>; // Botão para enviar a transação
};

export default SendTransaction;
