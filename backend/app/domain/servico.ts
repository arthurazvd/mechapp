import { OficinaAbstrata } from "./oficina";

export interface ServicoAbstrato {
  id?: number;
  nome: string;
  descricao: string;
  tempo: number;
  preco_min: number;
  preco_max: number;
  oficina: OficinaAbstrata;
}

export class Servico implements ServicoAbstrato {
  id?: number;
  nome: string;
  descricao: string;
  tempo: number;
  preco_min: number;
  preco_max: number;
  oficina: OficinaAbstrata;

  constructor(
    nome: string,
    descricao: string,
    tempo: number,
    preco_min: number,
    preco_max: number,
    oficina: OficinaAbstrata
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.tempo = tempo;
    this.preco_min = preco_min;
    this.preco_max = preco_max;
    this.oficina = oficina;
  }

  // Método estático para criação de um novo serviço
  static create(servico: ServicoAbstrato): void {
    try {
      // TO DO: Adicionando serviço ao banco de dados
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método estático para recuperar um serviço existente
  static get(id: number): Servico {
    // TO DO: Recuperando serviço a partir de um identificador
  }

  // Método para salvar o estado atual do serviço
  save(): void {
    try {
      // TO DO: Salvar estado atual do serviço
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método para deletar o serviço atual
  delete(): void {
    try {
      // TO DO: Excluindo serviço
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }
}
