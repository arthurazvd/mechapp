from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Servico, Oficina
from abc import abstractmethod

class AbstractServicoRepository():
    @abstractmethod
    def adicionar(self, servico: Servico):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, servico: Servico):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, servico: Servico):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> Servico|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_nome(self, nome: str) -> list[Servico]:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_oficina(self, oficina_id: str) -> list[Servico]:
        raise NotImplementedError
    
class ServicoRepository(AbstractServicoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, servico: Servico):
        self.session.add(servico)

    def remover(self, servico: Servico):
        self.session.delete(servico)
    
    def salvar(self, servico: Servico):
        self.session.merge(servico)

    def consultar(self, id: str) -> Servico | None:
        return self.session.query(Servico).filter(Servico.id == id).first()
    
    def consultar_por_nome(self, nome: str) -> list[Servico]:
        return self.session.query(Servico).filter(Servico.nome == nome).all()
    
    def consultar_por_oficina(self, oficina_id: str) -> list[Servico]:
        return self.session.query(Servico).filter(Servico.oficina_id == oficina_id).all()