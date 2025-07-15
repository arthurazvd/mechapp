from tests.mocks import *
from src.service.unit_of_work import UnidadeDeTrabalho
import pytest

def test_uow_usuario(session_maker, usuario_base):
    usuario = usuario_base()
    
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.usuarios.adicionar(usuario)
    
        # Consulta
        usuario_encontrado = uow.usuarios.consultar(usuario.id)

        assert usuario_encontrado.id == usuario.id
        assert usuario_encontrado.nome == usuario.nome
    
        # Remoção
        uow.usuarios.remover(usuario_encontrado)
        
        usuario_encontrado = uow.usuarios.consultar(usuario.id)
        assert usuario_encontrado is None

def test_uow_peca(session_maker, peca_base):
    peca = peca_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.pecas.adicionar(peca)

        # Consulta
        peca_encontrada = uow.pecas.consultar(peca.id)
        assert peca_encontrada.id == peca.id
        assert peca_encontrada.nome == peca.nome

        # Remoção
        uow.pecas.remover(peca_encontrada)
        peca_encontrada = uow.pecas.consultar(peca.id)
        assert peca_encontrada is None


def test_uow_oficina(session_maker, oficina_base):
    oficina = oficina_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.oficinas.adicionar(oficina)

        # Consulta
        oficina_encontrada = uow.oficinas.consultar(oficina.id)
        assert oficina_encontrada.id == oficina.id
        assert oficina_encontrada.nome == oficina.nome

        # Remoção
        uow.oficinas.remover(oficina_encontrada)
        oficina_encontrada = uow.oficinas.consultar(oficina.id)
        assert oficina_encontrada is None


def test_uow_servico(session_maker, servico_base):
    servico = servico_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.servicos.adicionar(servico)

        # Consulta
        servico_encontrado = uow.servicos.consultar(servico.id)
        assert servico_encontrado.id == servico.id
        assert servico_encontrado.nome == servico.nome

        # Remoção
        uow.servicos.remover(servico_encontrado)
        servico_encontrado = uow.servicos.consultar(servico.id)
        assert servico_encontrado is None


def test_uow_agendamento(session_maker, agendamento_base):
    agendamento = agendamento_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.agendamentos.adicionar(agendamento)

        # Consulta
        agendamento_encontrado = uow.agendamentos.consultar(agendamento.id)
        assert agendamento_encontrado.id == agendamento.id
        assert agendamento_encontrado.data == agendamento.data

        # Remoção
        uow.agendamentos.remover(agendamento_encontrado)
        agendamento_encontrado = uow.agendamentos.consultar(agendamento.id)
        assert agendamento_encontrado is None

def test_uow_pecas_do_agendamento(session_maker, peca_do_agendamento_base):
    peca_do_agendamento = peca_do_agendamento_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.pecas_do_agendamento.adicionar(peca_do_agendamento)

        # Consulta
        peca_do_agendamento_encontrada = uow.pecas_do_agendamento.consultar(peca_do_agendamento.id)
        assert peca_do_agendamento_encontrada.id == peca_do_agendamento.id
        assert peca_do_agendamento_encontrada.quantidade == peca_do_agendamento.quantidade

        # Remoção
        uow.pecas_do_agendamento.remover(peca_do_agendamento_encontrada)
        peca_do_agendamento_encontrada = uow.pecas_do_agendamento.consultar(peca_do_agendamento.id)
        assert peca_do_agendamento_encontrada is None

def test_uow_avaliacao(session_maker, avaliacao_base):
    avaliacao = avaliacao_base()
    with UnidadeDeTrabalho(session_maker) as uow:
        # Adição
        uow.avaliacoes.adicionar(avaliacao)

        # Consulta
        avaliacao_encontrada = uow.avaliacoes.consultar(avaliacao.id)
        assert avaliacao_encontrada.id == avaliacao.id
        assert avaliacao_encontrada.nota == avaliacao.nota

        # Remoção
        uow.avaliacoes.remover(avaliacao_encontrada)
        avaliacao_encontrada = uow.avaliacoes.consultar(avaliacao.id)
        assert avaliacao_encontrada is None

def test_uow_faz_rollback_se_nao_comitar(session_maker, usuario_base):
    usuario = usuario_base()
    
    # Teste de adição sem commit
    with UnidadeDeTrabalho(session_maker) as uow:
        uow.usuarios.adicionar(usuario)
        
    with UnidadeDeTrabalho(session_maker) as uow:
        usuario_encontrado = uow.usuarios.consultar(usuario.id)
        assert usuario_encontrado == None

def test_uow_faz_rollback_em_erro(session_maker, usuario_base):
    class ExcecaoTeste(Exception):
        pass

    usuario = usuario_base()

    with pytest.raises(ExcecaoTeste):
        with UnidadeDeTrabalho(session_maker) as uow:
            uow.usuarios.adicionar(usuario)
            raise ExcecaoTeste()
        
    with UnidadeDeTrabalho(session_maker) as uow:
        usuario_encontrado = uow.usuarios.consultar(usuario.id)
        assert usuario_encontrado == None