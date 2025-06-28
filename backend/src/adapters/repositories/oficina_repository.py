from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Oficina
from abc import abstractmethod

class AbstractOficinaRepository():
    @abstractmethod
    def adicionar(self, oficina: Oficina):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, oficina: Oficina):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, oficina: Oficina):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> Oficina|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_cnpj(self, cnpj: str) -> Oficina|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_proprietario(self, proprietario_id: str) -> list[Oficina]:
        raise NotImplementedError