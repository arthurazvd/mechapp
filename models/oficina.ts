import { UsuarioAbstrato } from "./usuario";

export interface OficinaAbstrata {
  id?: number;
  nome: string;
  cnpj: string;
  endereco: string;
  proprietario: UsuarioAbstrato;
}

export class Oficina implements OficinaAbstrata {
  id?: number;
  nome: string;
  cnpj: string;
  endereco: string;
  proprietario: UsuarioAbstrato;

  constructor(
    nome: string,
    cnpj: string,
    endereco: string,
    proprietario: UsuarioAbstrato
  ) {
    this.nome = nome;
    this.cnpj = cnpj;
    this.endereco = endereco;
    this.proprietario = proprietario;
  }

  // Método estático para criação de uma nova oficina
  static create(oficina: OficinaAbstrata): void {
    try {
      // TO DO: Adicionando oficina ao banco de dados
    } catch {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método estático para recuperar uma oficina existente
  static get(id: number): Oficina {
    // TO DO: Recuperando oficina a partir de um identificador
  }

  // Método para salvar o estado atual da oficina
  save(): void {
    try {
      // TO DO: Salvar estado atual da oficina
    } catch {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método para deletar a oficina atual
  delete(): void {
    try {
      // TO DO: Excluindo oficina
    } catch {
      // TO DO: Tratando possíveis erros
    }
  }
}
