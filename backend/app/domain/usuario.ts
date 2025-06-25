import { client } from "../database/connection";

export enum TipoUsuario {
  CLIENTE = "CLIENTE",
  MECANICO = "MECÂNICO",
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
      console.log("Criando usuário...");
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Fução estática para recuperar um usuário existente
  static get(id: number): Usuario {
    // TO DO: Recuperando usuário a partir de um identificador
    console.log("Encontrado usuário...");
    return new Usuario(
      "Usuário Teste",
      "usuario@teste.com.br",
      "testador_de_ilusoes",
      TipoUsuario.MECANICO
    );
  }

  static login(email: string, password: string): any {
    const result = client.query(
      `SELECT * FROM usuarios u WHERE u.email = ${email} AND u.password = ${password}`
    );
    console.log(result);
  }

  // Função para salvar o estado atual do usuário
  save(): void {
    try {
      // TO DO: Salvar estado atual do usuário
      console.log("Salvando usuário...");
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Função para deletar o usuário atual
  delete(): void {
    try {
      //  TO DO: Excluindo usuário
      console.log("Excluindo usuário...");
    } catch (error) {
      // TO DO: Traando possíveis erros
    }
  }
}
