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
    
    @abstractmethod
    def consultar_por_email(self, email: str) -> Usuario|None:
        raise NotImplementedError
    
class UsuarioRepository(AbstractUsuarioRepository, AbstractSQLAlchemyRepository):
    def adicionar(self, usuario: Usuario):
        self.session.add(usuario)

    def remover(self, usuario: Usuario):
        self.session.delete(usuario)
    
    def salvar(self, usuario: Usuario):
        self.session.merge(usuario)

    def consultar(self, id: str) -> Usuario|None:
        return self.session.query(Usuario).filter(Usuario.id == id).first()
    
    def consultar_por_email(self, email: str) -> Usuario|None:
        return self.session.query(Usuario).filter(Usuario.email == email).first()