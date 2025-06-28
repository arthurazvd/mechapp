from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Agendamento
from abc import abstractmethod

class AbstractServicoRepository():
    @abstractmethod
    def adicionar(self, servico: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, servico: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, servico: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> Agendamento|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_nome(self, nome: str) -> list[Agendamento]:
        raise NotImplementedError