from src.domain.models import *
from datetime import datetime

from tests.mocks import (
    mock_criar_usuario,
    mock_criar_peca,
    mock_criar_oficina,
    mock_criar_servico,
    mock_criar_pecas_do_agendamento,
    mock_criar_agendamento,
)

def test_orm_usuarios(session):
    usuario = Usuario(
        nome="Fulano Cliente",
        senha="1234",
        email="fulano@cliente.com.br",
        tipo=TipoUsuario.CLIENTE.value,
    )

    # Adicionando Usuário
    session.add(usuario)
    assert session.query(Usuario).filter(Usuario.id == usuario.id).first() == usuario

    # Excluindo Usuário
    session.delete(usuario)
    assert session.query(Usuario).filter(Usuario.id == usuario.id).first() == None

def test_orm_oficinas(
    session,
    mock_criar_usuario,
):
    # Criando um mecânico persistente
    mecanico = mock_criar_usuario(tipo=TipoUsuario.MECANICO)

    # Como o objeto foi criado somente no BANCO, é preciso fazê-lo ser reconhecido
    mecanico = session.merge(mecanico)

    oficina = Oficina(
        nome="Oficina de Fulano",
        cnpj="27373012000118",
        endereco="Sitio do Pica-pau Amarelo",
        proprietario=mecanico,
    )

    # Adicionando oficina
    session.add(oficina)
    assert session.query(Oficina).filter(Oficina.id == oficina.id).first() == oficina

    # Excluindo oficina
    session.delete(oficina)
    assert session.query(Oficina).filter(Oficina.id == oficina.id).first() == None    

def test_orm_pecas(
    session,
):
    peca = Peca(
        nome="Peça Qualquer",
        descricao="Peça Genérica",
        quantidade=5,
        preco=12.99,
        imagem=b"imagem_teste",
    )

    # Adicionando peça
    session.add(peca)
    assert session.query(Peca).filter(Peca.id == peca.id).first() == peca

    # Removendo peça
    session.delete(peca)
    assert session.query(Peca).filter(Peca.id == peca.id).first() == None

def test_orm_servicos(
    session,
    mock_criar_oficina,
):
    # Criando uma oficina persistente
    oficina = mock_criar_oficina()

    # Como o objeto foi criado somente no BANCO, é preciso fazê-lo ser reconhecido
    oficina = session.merge(oficina)

    servico = Servico(
        nome="ServiÇo Qualquer",
        descricao="Serviço Genérico",
        tempo=30,
        preco_min=12.00,
        preco_max=15.00,
        oficina=oficina,
    )

    # Adicionando serviço
    session.add(servico)
    assert session.query(Servico).filter(Servico.id == servico.id).first() == servico

    # Removendo serviço
    session.delete(servico)
    assert session.query(Servico).filter(Servico.id == servico.id).first() == None

def test_orm_agendamentos(
    session,
    mock_criar_pecas_do_agendamento,
    mock_criar_usuario,
    mock_criar_servico,
):
    
    # Criando peça, serviço e cliente persistentes
    peca = mock_criar_pecas_do_agendamento()
    cliente = mock_criar_usuario()
    servico = mock_criar_servico()

    # Reconhecer objetos através da ORM
    peca = session.merge(peca)
    servico = session.merge(servico)
    cliente = session.merge(cliente)

    agendamento = Agendamento(
        data=datetime.today(),
        status=StatusAgendamento.PENDENTE,
        cliente=cliente,
        servico=servico,
        pecas_do_agendamento=[peca],
    )

    # Adicionando agendamento
    session.add(agendamento)
    assert session.query(Agendamento).filter(Agendamento.id == agendamento.id).first() == agendamento

    # Removendo agendamento
    session.delete(agendamento)
    assert session.query(Agendamento).filter(Agendamento.id == agendamento.id).first() == None

def test_orm_avaliacoes(
    session,
    mock_criar_usuario,
    mock_criar_servico,
):
    # Criando cliente e serviço consistnete
    cliente = mock_criar_usuario()
    servico = mock_criar_servico()

    # Reconhecer objetos através da ORM
    servico = session.merge(servico)
    cliente = session.merge(cliente)
    
    avaliacao = Avaliacao(
        nota=NotaAvaliacao.REGULAR,
        comentario="Serviço Simples",
        data=datetime.now(),
        cliente=cliente,
        servico=servico,
    )

    # Adicionando avaliação
    session.add(avaliacao)
    assert session.query(Avaliacao).filter(Avaliacao.id == avaliacao.id).first() == avaliacao

    # Removendo avaliação
    session.delete(avaliacao)
    assert session.query(Avaliacao).filter(Avaliacao.id == avaliacao.id).first() == None