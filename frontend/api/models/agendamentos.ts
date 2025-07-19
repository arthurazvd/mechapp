import { BASE_URL } from "..";

interface AgendamentoCreate {
  nome: string;
  endereco: string;
  cnpj: string;
}

interface AgendamentoUpdate {
  nome?: string;
  endereco?: string;
  cnpj?: string;
}

export interface Agendamento {
  id: string;
  data: string;
  status: "PENDENTE" | "CONFIRMADO" | "CONCLUIDO" | "CANCELADO";
  cliente: {
    id: string;
    nome: string;
    email: string;
    senha: string;
    tipo: string;
    telefone: string | null;
  };
  servico: {
    id: string;
    nome: string;
    descricao: string;
    tempo: number;
    preco_min: number;
    preco_max: number;
    oficina: {
      id: string;
      nome: string;
    };
  };
  pecas_do_agendamento: any[];
}

// Função de criação de agendamentos
export const criar_agendamento = async (
  proprietario_id: string,
  oficina: AgendamentoCreate
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

// Alterar um agendamento existente
export const alterar_agendamento = async (
  oficina: AgendamentoUpdate,
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

// Remover um agendamento existente
export const remover_agendamento = async (oficina_id: string | string[]) => {
  const response = await fetch(`${BASE_URL}/oficina/${oficina_id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Recuperar um agendamento específico
export const consultar_agendamento = async (
  agendamento_id: string | string[]
) => {
  const response = await fetch(`${BASE_URL}/agendamento/${agendamento_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

// Listar agendamentos existentes
export const listar_agendamentos = async (
  cliente_id?: string,
  oficina_id?: string,
  status?: string
) => {
  const paramArray: string[] = [];

  // Adicionando parâmetros
  if (cliente_id) {
    paramArray.push(`cliente_id=${encodeURIComponent(cliente_id)}`);
  }
  if (oficina_id) {
    paramArray.push(`oficina_id=${encodeURIComponent(oficina_id)}`);
  }
  if (status) {
    paramArray.push(`status=${encodeURIComponent(status)}`);
  }

  // Juntando parâmetros
  const queryString = paramArray.length > 0 ? `?${paramArray.join("&")}` : "";
  const response = await fetch(`${BASE_URL}/agendamento/listar${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
