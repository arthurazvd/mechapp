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
    
class AvaliacaoRepository(AbstractAvaliacaoRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, avaliacao: Avaliacao):
        self.session.add(avaliacao)

    def remover(self, avaliacao: Avaliacao):
        self.session.delete(avaliacao)
    
    def salvar(self, avaliacao: Avaliacao):
        self.session.merge(avaliacao)

    def consultar(self, id: str) -> Avaliacao | None:
        avaliacao = self.session.query(Avaliacao).filter(Avaliacao.id == id).first()
        return avaliacao

    def consultar_por_servico(self, servico_id: str) -> list[Avaliacao]:
        return self.session.query(Avaliacao).filter(Avaliacao.servico_id == servico_id).all() 
    
    def consultar_por_cliente(self, cliente_id: str) -> list[Avaliacao]:
        return self.session.query(Avaliacao).filter(Avaliacao.cliente_id == cliente_id).all()