import { ServicoAbstrato } from "./servico";
import { UsuarioAbstrato } from "./usuario";

export enum NotaAvaliacao {
  PESSIMO = 1,
  RUIM = 2,
  REGULAR = 3,
  BOM = 4,
  EXCELENTE = 5,
}

export interface AvaliacaoAbstrata {
  id?: number;
  nota: NotaAvaliacao;
  comentario: string;
  data: Date;
  cliente: UsuarioAbstrato;
  servico: ServicoAbstrato;
}

export class Avaliacao implements AvaliacaoAbstrata {
  id?: number;
  nota: NotaAvaliacao;
  comentario: string;
  data: Date;
  cliente: UsuarioAbstrato;
  servico: ServicoAbstrato;

  constructor(
    nota: NotaAvaliacao,
    comentario: string,
    data: Date,
    cliente: UsuarioAbstrato,
    servico: ServicoAbstrato
  ) {
    this.nota = nota;
    this.comentario = comentario;
    this.data = data;
    this.cliente = cliente;
    this.servico = servico;
  }

  // Método estático para criação de nova avaliação
  static create(avaliacao: AvaliacaoAbstrata): void {
    try {
      // TO DO: Registrar avaliação no banco de dados
    } catch {
      // TO DO: Tratamento de erros na criação
    }
  }

  // Método estático para buscar avaliação por ID
  static get(id: number): Avaliacao {
    // TO DO: Implementar busca por ID
  }

  // Método para atualizar avaliação existente
  save(): void {
    try {
      // TO DO: Salvar alterações da avaliação
    } catch {
      // TO DO: Tratamento de erros na atualização
    }
  }

  // Método para remover avaliação
  delete(): void {
    try {
      // TO DO: Excluir avaliação permanentemente
    } catch {
      // TO DO: Tratamento de erros na exclusão
    }
  }
}
