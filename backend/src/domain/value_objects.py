from enum import Enum

class TipoUsuario(str, Enum):
    CLIENTE = "cliente"
    MECANICO = "mecanico"

    def __str__(self):
        return self.value

class StatusAgendamento(str, Enum):
    PENDENTE = "pendente"
    CONFIRMADO = "confirmado"
    CANCELADO = "cancelado"
    FINALIZADO = "finalizado"

    def __str__(self):
        return self.value

class NotaAvaliacao(Enum):
    PESSIMO = 1,
    RUIM = 2,
    REGULAR = 3,
    BOM = 4,
    EXCELENTE = 5,

    def __int__(self):
        return int(self.value)

    def __str__(self):
        return self.value
