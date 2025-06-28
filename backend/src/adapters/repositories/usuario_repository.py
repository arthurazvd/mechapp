from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Usuario
from abc import abstractmethod

class AbstractUsuarioRepository():
    @abstractmethod
    def adicionar(self, usuario: Usuario):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, usuario: Usuario):
        raise NotImplementedError

    @abstractmethod
    def salvar(self, usuario: Usuario):
        raise NotImplementedError 
    
    @abstractmethod
    def consultar(self, id: str) -> Usuario|None:
        raise NotImplementedError