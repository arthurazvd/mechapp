from enum import Enum

class TipoUsuario(str, Enum):
    CLIENTE = "CLIENTE"
    MECANICO = "MECANICO"

    def __str__(self):
        return self.value
    
    @staticmethod
    def valor_valido(valor: str) -> bool:
        if valor in ["CLIENTE","MECANICO"]:
            return True
        return False

class StatusAgendamento(str, Enum):
    PENDENTE = "PENDENTE"
    CONFIRMADO = "CONFIRMADO"
    CANCELADO = "CANCELADO"
    CONCLUIDO = "CONCLUIDO"

    def __str__(self):
        return self.value
    
    @staticmethod
    def valor_valido(valor: str) -> bool:
        if valor in ["PENDENTE","CONFIRMADO","CANCELADO","CONCLUIDO"]:
            return True
        return False

class NotaAvaliacao(int, Enum):
    PESSIMO = 1
    RUIM = 2
    REGULAR = 3
    BOM = 4
    EXCELENTE = 5

    def __int__(self):
        return self.value

    def __str__(self):
        return self.name

    @staticmethod
    def valor_valido(valor: int) -> bool:
        if 1 <= valor <= 5:
            return True
        return False