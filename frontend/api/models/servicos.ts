import { BASE_URL } from "..";

interface ServicoCreate {
  nome: string;
  descricao: string;
  tempo: number;
  preco_min: number;
  preco_max: number;
  oficina_id: string | string[];
}

interface ServicoUpdate {
  nome?: string;
  descricao?: string;
  tempo?: number;
  preco_min?: number;
  preco_max?: number;
}

// Função de criação de peças
export const criar_servico = async (servico: ServicoCreate) => {
  const response = await fetch(`${BASE_URL}/servico/criar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...servico,
    }),
  });
  const data = await response.json();
  return data;
};

// Alterar uma servico existente
export const alterar_servico = async (
  servico: ServicoUpdate,
  servico_id: string | string[]
) => {
  const response = await fetch(`${BASE_URL}/servico/${servico_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(servico),
  });
  const data = await response.json();
  return data;
};

// Remover uma peça existente
export const remover_servico = async (servico_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/servico/${servico_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Recuperar uma servico especificada
export const consultar_servico = async (servico_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/servico/${servico_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Listar servicos Existentes
export const listar_servicos = async (oficina_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/servico/listar/${oficina_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
