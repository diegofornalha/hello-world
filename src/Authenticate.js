import React, { useEffect, useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para autenticação
import Button from "@mui/material/Button"; // Importa o botão do Material-UI
import Typography from "@mui/material/Typography"; // Importa tipografia do Material-UI
import Box from "@mui/material/Box"; // Para organizar o layout
import IconButton from "@mui/material/IconButton"; // Importa o botão de ícone
import AccountCircleIcon from "@mui/icons-material/AccountCircle"; // Ícone de perfil/conta
import FileCopyIcon from "@mui/icons-material/FileCopy"; // Ícone de copiar
import Tooltip from "@mui/material/Tooltip"; // Importa componente de tooltip para copiar
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Ícone de status online
import Snackbar from "@mui/material/Snackbar"; // Importa componente de Snackbar para notificações

const Authenticate = () => {
  const [user, setUser] = useState({ loggedIn: false }); // Estado para o usuário
  const [showDetails, setShowDetails] = useState(false); // Estado para mostrar/ocultar detalhes
  const [copied, setCopied] = useState(false); // Estado para controlar notificação de cópia

  useEffect(() => {
    fcl.currentUser().subscribe(setUser); // Monitora o estado do usuário
  }, []);

  const logIn = () => {
    fcl.logIn(); // Função para fazer login no Blocto
  };

  const logOut = () => {
    fcl.unauthenticate(); // Função para deslogar
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user?.addr || "");
    setCopied(true); // Ativa a notificação de cópia
  };

  const handleCloseSnackbar = () => {
    setCopied(false); // Fecha o Snackbar
  };

  return (
    <div>
      {/* Exibição inicial com ícone de perfil */}
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        gap="10px"
      >
        <Tooltip title="Minhas Informações">
          <IconButton
            onClick={() => setShowDetails(!showDetails)}
            color="primary"
            size="large"
          >
            <AccountCircleIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        {/* Mostra os detalhes apenas se o usuário clicar no ícone */}
        {showDetails && (
          <>
            {user.loggedIn ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="10px"
              >
                <Box display="flex" alignItems="center" gap="10px">
                  <CheckCircleIcon style={{ color: "green" }} />{" "}
                  {/* Ícone de status online */}
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Usuário conectado
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" gap="10px">
                  <Typography variant="body1">
                    Endereço: {user?.addr}
                  </Typography>
                  <Tooltip title="Copiar endereço">
                    <IconButton onClick={copyToClipboard}>
                      <FileCopyIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Button variant="contained" color="secondary" onClick={logOut}>
                  Logout
                </Button>
              </Box>
            ) : (
              <Button variant="contained" color="primary" onClick={logIn}>
                Login com Blocto
              </Button>
            )}
          </>
        )}

        {/* Snackbar para notificação de cópia */}
        <Snackbar
          open={copied}
          autoHideDuration={2000}
          onClose={handleCloseSnackbar}
          message="Endereço copiado para a área de transferência!"
        />
      </Box>
    </div>
  );
};

export default Authenticate;
