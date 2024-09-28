import React, { useEffect, useState } from "react";
import * as fcl from "@blocto/fcl"; // Importa FCL para autenticação

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
        <div>
          <p>Usuário conectado: {user?.addr}</p>
          <button onClick={logOut}>Logout</button>
        </div>
      ) : (
        <button onClick={logIn}>Login com Blocto</button>
      )}
    </div>
  );
};

export default Authenticate;
