import { BASE_URL } from "..";

interface OficinaCreate {
  nome: string;
  endereco: string;
  cnpj: string;
}

interface OficinaUpdate {
  nome?: string;
  endereco?: string;
  cnpj?: string;
}

// Função de criação de peças
export const criar_oficina = async (
  proprietario_id: string,
  oficina: OficinaCreate
) => {
  const response = await fetch(`${BASE_URL}/oficina/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      proprietario_id,
      ...oficina,
    }),
  });
  const data = await response.json();
  return data;
};

// Alterar uma oficina existente
export const alterar_oficina = async (
  oficina: OficinaUpdate,
  oficina_id: string | string[]
) => {
  const response = await fetch(`${BASE_URL}/oficina/${oficina_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(oficina),
  });
  const data = await response.json();
  return data;
};

// Remover uma peça existente
export const remover_oficina = async (oficina_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/oficina/${oficina_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Recuperar uma oficina especificada
export const consultar_oficina = async (oficina_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/oficina/${oficina_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Listar oficinas Existentes
export const listar_oficinas = async () => {
  const response = await fetch(`${BASE_URL}/oficina/listar`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
