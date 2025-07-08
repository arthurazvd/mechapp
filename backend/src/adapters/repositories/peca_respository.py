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
    
    @abstractmethod
    def consultar_por_nome(self, nome: str) -> Peca|None:
        raise NotImplementedError

    @abstractmethod
    def listar(self) -> list[Peca]:
        raise NotImplementedError
    
class PecaRepository(AbstractPecaRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, peca: Peca):
        self.session.add(peca)

    def remover(self, peca: Peca):
        self.session.delete(peca)
    
    def salvar(self, peca: Peca):
        self.session.merge(peca)

    def consultar(self, id: str) -> Peca | None:    
        return self.session.query(Peca).filter(Peca.id == id).first()
    
    def consultar_por_nome(self, nome: str) -> Peca|None:
        return self.session.query(Peca).filter(Peca.nome.like(f'%{nome}%')).all()

    def listar(self) -> list[Peca]:
        return self.session.query(Peca).all()