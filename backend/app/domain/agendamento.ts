import { Peca, PecaAbstrata } from "./peca";
import { ServicoAbstrato } from "./servico";
import { UsuarioAbstrato } from "./usuario";

export enum StatusAgendamento {
  PENDENTE = "PENDENTE",
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO",
  FINALIZADO = "FINALIZADO",
}

export interface AgendamentoAbstrato {
  id?: number;
  data: Date;
  status: StatusAgendamento;
  cliente: UsuarioAbstrato;
  servico: ServicoAbstrato;
  pecas_do_agendamento: PecaAbstrata[];
}

export class Agendamento implements AgendamentoAbstrato {
  id?: number;
  data: Date;
  status: StatusAgendamento;
  cliente: UsuarioAbstrato;
  servico: ServicoAbstrato;
  pecas_do_agendamento: PecaAbstrata[];

  constructor(
    data: Date,
    status: StatusAgendamento,
    cliente: UsuarioAbstrato,
    servico: ServicoAbstrato,
    pecas_do_agendamento: PecaAbstrata[]
  ) {
    this.data = data;
    this.status = status;
    this.cliente = cliente;
    this.servico = servico;
    this.pecas_do_agendamento = pecas_do_agendamento;
  }

  // Método estático para criação de novo agendamento
  static create(agendamento: AgendamentoAbstrato): void {
    try {
      // TO DO: Adicionando agendamento ao banco de dados
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método estático para recuperar agendamento existente
  static get(id: number): Agendamento {
    // TO DO: Recuperando agendamento por ID
  }

  // Método para salvar estado atual do agendamento
  save(): void {
    try {
      // TO DO: Atualizando agendamento no banco
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método para cancelar (deletar) agendamento
  delete(): void {
    try {
      // TO DO: Removendo agendamento do sistema
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }

  // Método adicional sugerido para mudança de status
  atualizarStatus(novoStatus: string): void {
    try {
      // TO DO: Persistir mudança de status
    } catch (error) {
      // TO DO: Tratando possíveis erros
    }
  }
}
