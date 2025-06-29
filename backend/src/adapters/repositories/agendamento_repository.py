from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Agendamento, PecaDoAgendamento
from abc import abstractmethod
from datetime import datetime

class AbstractAgendamentoRepository():
    @abstractmethod
    def adicionar(self, agendamento: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, agendamento: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, agendamento: Agendamento):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> Agendamento|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_dia(self, data: tuple[datetime]) -> list[Agendamento]:
        raise NotImplementedError
    
class AbstractPecasDoAgendamentoRepository():
    @abstractmethod
    def adicionar(self, peca_do_agendamento: PecaDoAgendamento):
        raise NotImplementedError
    
    @abstractmethod
    def remover(self, peca_do_agendamento: PecaDoAgendamento):
        raise NotImplementedError
    
    @abstractmethod
    def salvar(self, peca_do_agendamento: PecaDoAgendamento):
        raise NotImplementedError
    
    @abstractmethod
    def consultar(self, id: str) -> PecaDoAgendamento|None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_agendamento(self, agendamento_id: str) -> list[PecaDoAgendamento]:
        raise NotImplementedError
    
class AgendamentoRepository(AbstractAgendamentoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, agendamento: Agendamento):
        self.session.add(agendamento)

    def remover(self, agendamento: Agendamento):
        self.session.delete(agendamento)
    
    def salvar(self, agendamento: Agendamento):
        self.session.merge(agendamento)

    def consultar(self, id:str) -> Agendamento | None:
        return self.session.query(Agendamento).filter(Agendamento.id == id).first()

    def consultar_por_dia(self, data) -> list[PecaDoAgendamento]:
        return self.session.query(PecaDoAgendamento).filter(PecaDoAgendamento.data == data).all()