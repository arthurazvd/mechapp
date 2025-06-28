from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Peca
from abc import abstractmethod

class AbstractPecaRepository():
    @abstractmethod
    def adicionar(self, peca: Peca):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, peca: Peca):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, peca: Peca):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> Peca|None:
        raise NotImplementedError