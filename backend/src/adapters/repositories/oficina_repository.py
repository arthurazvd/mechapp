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
    
class OficinaRepository(AbstractOficinaRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, oficina: Oficina):
        self.session.add(oficina)
    
    def remover(self, oficina: Oficina):
        self.session.delete(oficina)
    
    def salvar(self, oficina: Oficina):
        self.session.merge(oficina)
    
    def consultar(self, id: str) -> Oficina | None:
        self.session.query(Oficina).filter(Oficina.id == id).first()
        return self.session.query(Oficina).filter(Oficina.id == id).first()
    
    def consultar_por_cnpj(self, cnpj: str) -> Oficina | None:
        return self.session.query(Oficina).filter(Oficina.cnpj == cnpj).first()

    def consultar_por_proprietario(self, proprietario_id: str) -> list[Oficina]:
        return self.session.query(Oficina).filter(Oficina.proprietario_id == proprietario_id).all()