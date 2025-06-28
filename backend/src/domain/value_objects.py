from enum import Enum

class TipoUsuario(str, Enum):
    CLIENTE = "cliente"
    MECANICO = "mecanico"

class StatusAgendamento(str, Enum):
    PENDENTE = "pendente"
    CONFIRMADO = "confirmado"
    CANCELADO = "cancelado"
    FINALIZADO = "finalizado"

class NotaAvaliacao(Enum):
    PESSIMO = 1,
    RUIM = 2,
    REGULAR = 3,
    BOM = 4,
    EXCELENTE = 5,
