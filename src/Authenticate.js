import React, { useEffect, useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para autenticação
import Button from "@mui/material/Button"; // Importa o botão do Material-UI
import Typography from "@mui/material/Typography"; // Importa tipografia do Material-UI
import Box from "@mui/material/Box"; // Para organizar o layout
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // Ícone de status online
import Avatar from "@mui/material/Avatar"; // Avatar do usuário

const Authenticate = () => {
  const [user, setUser] = useState({ loggedIn: false }); // Estado para o usuário

  useEffect(() => {
    fcl.currentUser().subscribe(setUser); // Monitora o estado do usuário
  }, []);

  const logIn = () => {
    fcl.logIn(); // Função para fazer login no Blocto
  };

  const logOut = () => {
    fcl.unauthenticate(); // Função para deslogar
  };

  return (
    <div>
      {user.loggedIn ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          gap="10px"
        >
          {/* Exibição do usuário conectado */}
          <Box display="flex" alignItems="center" gap="10px">
            <CheckCircleIcon style={{ color: "green" }} />{" "}
            {/* Ícone de status online */}
            <Typography variant="h6">
              Usuário conectado: {user?.addr}
            </Typography>
          </Box>

          {/* Botão de logout */}
          <Button variant="contained" color="secondary" onClick={logOut}>
            Logout
          </Button>
        </Box>
      ) : (
        <Button variant="contained" color="primary" onClick={logIn}>
          Login com Blocto
        </Button>
      )}
    </div>
  );
};

export default Authenticate;
