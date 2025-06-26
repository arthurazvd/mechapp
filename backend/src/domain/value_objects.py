from enum import Enum

class TipoUsuario(Enum):
    CLIENTE = "CLIENTE"
    MECANICO = "MECANICO"

class StatusAgendamento(Enum):
    PENDENTE = "PENDENTE"
    CONFIRMADO = "CONFIRMADO"
    CANCELADO = "CANCELADO"
    FINALIZADO = "FINALIZADO"

class NotaAvaliacao(Enum):
    PESSIMO = 1,
    RUIM = 2,
    REGULAR = 3,
    BOM = 4,
    EXCELENTE = 5,
