from src.domain.models import *
from tests.mocks import (
    usuario_base, criar_usuario,
    peca_base, criar_peca,
    oficina_base, criar_oficina,
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
    usuario_base,
    criar_usuario,
):
    # Criando um mecânico persistente
    mecanico = usuario_base(tipo=TipoUsuario.MECANICO)
    criar_usuario(**mecanico.to_dict())

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
    oficina_base,
    criar_oficina,
):
    # Criando ua oficina persistente
    oficina = oficina_base()
    criar_oficina(**oficina.to_dict(), persistir_proprietario=True)

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

def test_orm_agendamentos(session):
    pass

def test_orm_avaliacoes(session):
    pass