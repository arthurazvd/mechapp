# agendamento_repository.py
from src.adapters.repository import AbstractSQLAlchemyRepository
from src.domain.models import Agendamento, PecaDoAgendamento, StatusAgendamento
from abc import abstractmethod
from datetime import datetime

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
    def consultar(self, id: str) -> PecaDoAgendamento | None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_agendamento(self, agendamento_id: str) -> list[PecaDoAgendamento]:
        raise NotImplementedError

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
    def consultar(self, id: str) -> Agendamento | None:
        raise NotImplementedError
    
    @abstractmethod
    def consultar_por_dia(self, data: tuple[datetime]) -> list[Agendamento]:
        raise NotImplementedError
    
    @abstractmethod
    def listar(
        self, 
        cliente_id: str = None, 
        servico_id: str = None, 
        status: StatusAgendamento = None
    ) -> list[Agendamento]:
        raise NotImplementedError

class PecasDoAgendamentoRepository(AbstractPecasDoAgendamentoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, peca_do_agendamento: PecaDoAgendamento):
        self.session.add(peca_do_agendamento)
    
    def remover(self, peca_do_agendamento: PecaDoAgendamento):
        self.session.delete(peca_do_agendamento)
    
    def salvar(self, peca_do_agendamento: PecaDoAgendamento):
        self.session.merge(peca_do_agendamento)
    
    def consultar(self, id: str) -> PecaDoAgendamento | None:
        return self.session.query(PecaDoAgendamento).filter(PecaDoAgendamento.id == id).first()
    
    def consultar_por_agendamento(self, agendamento_id: str) -> list[PecaDoAgendamento]:
        return self.session.query(PecaDoAgendamento).filter(PecaDoAgendamento.agendamento_id == agendamento_id).all()

class AgendamentoRepository(AbstractAgendamentoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, agendamento: Agendamento):
        self.session.add(agendamento)

    def remover(self, agendamento: Agendamento):
        self.session.delete(agendamento)
    
    def salvar(self, agendamento: Agendamento):
        self.session.merge(agendamento)

    def consultar(self, id: str) -> Agendamento | None:
        return self.session.query(Agendamento).filter(Agendamento.id == id).first()

    def consultar_por_dia(self, data: tuple[datetime]) -> list[Agendamento]:
        return self.session.query(Agendamento).filter(
            Agendamento.data >= data[0],
            Agendamento.data <= data[1],
        ).all()
    
    def listar(
        self, 
        cliente_id: str = None, 
        servico_id: str = None, 
        status: StatusAgendamento = None
    ) -> list[Agendamento]:
        print("\nDEBUG - INÍCIO DO REPOSITÓRIO listar()")
        print(f"Filtros - cliente_id: {cliente_id}, servico_id: {servico_id}, status: {status}")
        
        query = self.session.query(Agendamento)
        
        if cliente_id:
            print("Aplicando filtro por cliente_id")
            query = query.filter(Agendamento.cliente_id == cliente_id)
        if servico_id:
            print("Aplicando filtro por servico_id")
            query = query.filter(Agendamento.servico_id == servico_id)
        if status:
            print("Aplicando filtro por status")
            query = query.filter(Agendamento.status == status)
        
        # Debug da query SQL gerada
        print(f"SQL gerado: {str(query)}")
        
        result = query.all()
        print(f"DEBUG - Total de resultados encontrados: {len(result)}")
        print("DEBUG - FIM DO REPOSITÓRIO listar()")
        return result