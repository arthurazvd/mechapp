from dataclasses import dataclass, field
from datetime import datetime
from decimal import Decimal
from uuid import uuid4
from re import match

from .value_objects import *
from .exceptions import *

@dataclass
class Usuario:
    nome: str
    email: str
    senha: str
    tipo: TipoUsuario
    telefone: str | None = None
    id: str = field(default_factory=lambda: str(uuid4()))

    def __post_init__(self):
        """ Criptografar senha de usuário """
        self.senha = str(hash(self.senha))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "email": self.email,
            "senha": self.senha,
            "tipo": str(self.tipo),
            "telefone": self.telefone,
        }

    @staticmethod
    def validar_email(email: str) -> bool:
        padrao = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
        if not match(padrao, email):
            return False
        return True

@dataclass
class Peca:
    nome: str
    descricao: str
    quantidade: int
    preco: float
    imagem: bytes | None = None
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        if not isinstance(self.preco, float):
            self.preco = float(self.preco)
        return {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "quantidade": self.quantidade,
            "preco": self.preco,
            "imagem": self.imagem.hex() if self.imagem else None,
        }

@dataclass
class Oficina:
    nome: str
    cnpj: str
    endereco: str
    proprietario: Usuario
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nome": self.nome,
            "cnpj": self.cnpj,
            "endereco": self.endereco,
            "proprietario": self.proprietario.to_dict(),
        }
    
    @staticmethod
    def validar_cnpj(cnpj: str) -> bool:
        padrao = r'^(\d{2}\.?\d{3}\.?\d{3}/?\d{4}-?\d{2})$'
        if not match(padrao, cnpj):
            return False
        return True

@dataclass
class Servico:
    nome: str
    descricao: str
    tempo: int
    preco_min: float | Decimal
    preco_max: float | Decimal
    oficina: Oficina
    id: str = field(default_factory=lambda: str(uuid4()))
    
    def to_dict(self, include_oficina: bool = False) -> dict:
        def convert_decimal(value):
            """Converte Decimal para float se necessário"""
            if isinstance(value, Decimal):
                return float(value)
            return value
        
        servico = {
            "id": self.id,
            "nome": self.nome,
            "descricao": self.descricao,
            "tempo": self.tempo,
            "preco_min": convert_decimal(self.preco_min),
            "preco_max": convert_decimal(self.preco_max),
            "oficina": self.oficina.id,
        }

        if include_oficina:
            servico["oficina"] = self.oficina.to_dict()
        
        return servico
@dataclass
class PecaDoAgendamento:
    peca: Peca
    quantidade: int
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "peca":self.peca.to_dict(),
            "quantidade":self.quantidade,
        }

@dataclass 
class Agendamento:
    data: datetime
    status: StatusAgendamento
    cliente: Usuario
    servico: Servico
    pecas_do_agendamento: list[PecaDoAgendamento]
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "data": self.data.isoformat(),
            "status": str(self.status),
            "cliente": self.cliente.to_dict(),
            "servico": self.servico.to_dict(include_oficina=True),
            "pecas_do_agendamento": [peca.to_dict() for peca in self.pecas_do_agendamento],
        }

@dataclass
class Avaliacao:
    nota: NotaAvaliacao
    comentario: str
    data: datetime
    cliente: Usuario
    servico: Servico
    id: str = field(default_factory=lambda: str(uuid4()))

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "nota": int(self.nota),
            "comentario": self.comentario,
            "data": self.data.isoformat(),
            "cliente": self.cliente.to_dict(),
            "servico": self.servico.to_dict(),
        }