import { BASE_URL } from "..";

interface UsuarioCreate {
  nome: string;
  email: string;
  senha: string;
  tipo?: string;
  telefone?: string;
}

// Função de cadastro
export const registar_usuario = async (usuario: UsuarioCreate) => {
  const response = await fetch(`${BASE_URL}/usuario/registrar`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });
  const data = await response.json();
  return data;
};

// Função de autenticação
export const autenticar_usuario = async (email: string, senha: string) => {
  console.log(JSON.stringify({ email, senha }));
  const response = await fetch(`${BASE_URL}/usuario/autenticar`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });
  const data = await response.json();
  return data;
};

// Função de verificação de usuário já autenticado
export const verificar_autenticacao = () => {
    const usuario_encontrado = localStorage.getItem("usuario_atual")
    if (usuario_encontrado === null) {
        return false;
    }
    return true;
}
