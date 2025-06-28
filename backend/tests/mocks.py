import pytest
from sqlalchemy import text
from src.domain.models import *

@pytest.fixture
def usuario_base():
    def _usuario_base(
        id=None,
        nome="Usuário",
        email="usuario@teste.com.br",
        senha="1234",
        tipo=TipoUsuario.CLIENTE,
        telefone="(99) 98765-4321"
    ):
        return Usuario(
            id=id or str(uuid4()),
            nome=nome, 
            email=email, 
            senha=senha, 
            tipo=str(tipo), 
            telefone=telefone
        )
    yield _usuario_base

@pytest.fixture
def criar_usuario(session):
    def _criar_usuario(
        id=None,
        nome="Usuário",
        email="usuario@teste.com.br",
        senha="1234",
        tipo=TipoUsuario.CLIENTE,
        telefone="(99) 98765-4321"
    ):
        id = id or str(uuid4())

        session.execute(
            text(
                """
                INSERT INTO usuarios (id, nome, email, senha, tipo, telefone) VALUES
                (:id, :nome, :email, :senha, :tipo, :telefone)
                """
            ),
            params={
                "id":id,
                "nome":nome,
                "email":email,
                "senha":senha,
                "tipo":str(tipo),
                "telefone":telefone,
            }
        )

        return id
    yield _criar_usuario

@pytest.fixture
def peca_base():
    def _peca_base(
        id = None,
        nome = "Peça Teste",
        descricao = "Descrição da peça teste",
        quantidade = 10,
        preco = 99.90,
        imagem = b"imagem_teste"
    ):
        return Peca(
            id=id or str(uuid4()),
            nome=nome,
            descricao=descricao,
            quantidade=quantidade,
            preco=preco,
            imagem=imagem
        )
    yield _peca_base

@pytest.fixture
def criar_peca(session):
    def _criar_peca(
        id = None,
        nome = "Peça Teste",
        descricao = "Descrição da peça teste",
        quantidade = 10,
        preco = 99.90,
        imagem = b"imagem_teste"
    ):
        id = id or str(uuid4())
        session.execute(
            text(
                """
                INSERT INTO pecas (id, nome, descricao, quantidade, preco, imagem) VALUES
                (:id, :nome, :descricao, :quantidade, :preco, :imagem)
                """
            ),
            params={
                "id": id,
                "nome": nome,
                "descricao": descricao,
                "quantidade": quantidade,
                "preco": preco,
                "imagem": imagem
            }
        )

        return id
    yield _criar_peca

@pytest.fixture
def oficina_base(usuario_base):
    def _oficina_base(
        id=None,
        nome="Oficina Teste",
        cnpj="00000000000100",
        endereco="Rua Teste, 123",
        proprietario=None
    ):
        return Oficina(
            id=id or str(uuid4()),
            nome=nome,
            cnpj=cnpj,
            endereco=endereco,
            proprietario=proprietario or usuario_base(tipo=TipoUsuario.MECANICO)
        )
    yield _oficina_base

@pytest.fixture
def criar_oficina(session, criar_usuario):
    def _criar_oficina(
        id=None,
        nome="Oficina Teste",
        cnpj="00000000000100",
        endereco="Rua Teste, 123",
        proprietario = None,
        persistir_proprietario = False,
    ):
        id = id or str(uuid4())

        # Persistindo proprietário
        if proprietario and persistir_proprietario:
            criar_usuario(**proprietario)

        # Criando novo proprietário
        if proprietario is None:
            proprietario = criar_usuario(tipo=TipoUsuario.MECANICO).to_dict()

        session.execute(
            text(
                """
                INSERT INTO oficinas 
                (id, nome, cnpj, endereco, usuario_id) 
                VALUES
                (:id, :nome, :cnpj, :endereco, :usuario_id)
                """
            ),
            params={
                "id": id,
                "nome": nome,
                "cnpj": cnpj,
                "endereco": endereco,
                "usuario_id": proprietario['id'],
            }
        )

        return id
    yield _criar_oficina