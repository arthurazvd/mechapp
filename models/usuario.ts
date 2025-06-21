export enum TipoUsuario {
  CLIENTE = "CLIENTE",
  BARBEIRO = "BARBEIRO",
}

export interface UsuarioAbstrato {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  telefone?: string;
}

export class Usuario implements UsuarioAbstrato {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  tipo: TipoUsuario;
  telefone?: string;

  constructor(
    nome: string,
    email: string,
    senha: string,
    tipo: TipoUsuario,
    telefone?: string
  ) {
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.tipo = tipo;
    this.telefone = telefone;
  }

  // Função estática de criação de um novo usuário
  static create(usuario: UsuarioAbstrato): void {
    try {
      // TO DO: Adicionando usuário ao banco de dados
    } catch {
      // TO DO: Tratando possíveis erros
    }
  }

  // Fução estática para recuperar um usuário existente
  static get(id: number): Usuario {
    // TO DO: Recuperando usuário a partir de um identificador
  }

  // Função para salvar o estado atual do usuário
  save(): void {
    try {
      // TO DO: Salvar estado atual do usuário
    } catch {
      // TO DO: Tratando possíveis erros
    }
  }

  // Função para deletar o usuário atual
  delete(): void {
    try {
      //  TO DO: Excluindo usuário
    } catch {
      // TO DO: Traando possíveis erros
    }
  }
}
