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
    
class ServicoRepository(AbstractServicoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, servico: Agendamento):
        self.session.add(servico)

    def remover(self, servico: Agendamento):
        self.session.delete(servico)
    
    def salvar(self, servico: Agendamento):
        self.session.merge(servico)

    def consultar(self, id: str) -> Agendamento | None:
        return self.session.query(Agendamento).filter(Agendamento.id == id).first()
    
    def consultar_por_nome(self, nome: str) -> list[Agendamento]:
        return self.session.query(Agendamento).filter(Agendamento.nome == nome).all()