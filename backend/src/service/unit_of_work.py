from src.adapters.repositories import *
from sqlalchemy.orm import sessionmaker
import abc

class AbstractUnidadeDeTrabalho(abc.ABC):
    pecas: AbstractPecaRepository
    usuarios: AbstractUsuarioRepository
    oficinas: AbstractOficinaRepository
    servicos: AbstractServicoRepository
    avaliacoes: AbstractAvaliacaoRepository
    agendamentos: AbstractAgendamentoRepository
    pecas_do_agendamento: AbstractPecasDoAgendamentoRepository

    def __enter__(self) -> 'AbstractUnidadeDeTrabalho':
        return self
    
    def __exit__(self, *args):
        self.rollback()

    @abc.abstractmethod
    def commit(self):
        raise NotImplementedError

    @abc.abstractmethod
    def rollback(self):
        raise NotImplementedError
    
class UnidadeDeTrabalho(AbstractUnidadeDeTrabalho):
    def __init__(self, session_maker: sessionmaker):
        self.session_maker = session_maker

    def __enter__(self):
        self.session = self.session_maker()
        self.pecas = PecaRepository(self.session)
        self.usuarios = UsuarioRepository(self.session)
        self.oficinas = OficinaRepository(self.session)
        self.servicos = ServicoRepository(self.session)
        self.avaliacoes = AvaliacaoRepository(self.session)
        self.agendamentos = AgendamentoRepository(self.session)
        self.pecas_do_agendamento = PecasDoAgendamentoRepository(self.session)
        return super().__enter__()
    
    def __exit__(self, *args):
        super().__exit__(*args)
        self.session.close()
    
    def commit(self):
        self.session.commit()

    def flush(self):
        self.session.flush()

    def rollback(self):
        self.session.rollback()