from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Avaliacao
from abc import abstractmethod

class AbstractAvaliacaoRepository():
    @abstractmethod
    def adicionar(self, avaliacao: Avaliacao):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, avaliacao: Avaliacao):
        raise NotImplementedError

    @abstractmethod
    def salvar(self, avaliacao: Avaliacao):
        raise NotImplementedError 
    
    @abstractmethod
    def consultar(self, id: str) -> Avaliacao|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_servico(self, servico_id: str) -> list[Avaliacao]:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_cliente(self, cliente_id: str) -> list[Avaliacao]:
        raise NotImplementedError