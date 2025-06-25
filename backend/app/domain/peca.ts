export interface PecaAbstrata {
  id?: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  imagem: Buffer;
}

export class Peca implements PecaAbstrata {
  id?: number;
  nome: string;
  descricao: string;
  quantidade: number;
  preco: number;
  imagem: Buffer;

  constructor(
    nome: string,
    descricao: string,
    quantidade: number,
    preco: number,
    imagem: Buffer
  ) {
    this.nome = nome;
    this.descricao = descricao;
    this.quantidade = quantidade;
    this.preco = preco;
    this.imagem = imagem;
  }

  // Método estático para criação de uma nova peça
  static create(peca: PecaAbstrata): void {
    try {
      // TO DO: Adicionando peça ao banco de dados
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método estático para recuperar uma peça existente
  static get(id: number): Peca {
    // TO DO: Recuperando peça a partir de um identificador
  }

  // Método para salvar o estado atual da peça
  save(): void {
    try {
      // TO DO: Salvar estado atual da peça
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método para deletar a peça atual
  delete(): void {
    try {
      // TO DO: Excluindo peça
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }
}
