import pytest
from sqlalchemy import text
from src.domain.models import *

# =========================
# MOCK DE USUÁRIO
# =========================

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
            telefone=telefone,
        )
    yield _usuario_base

@pytest.fixture
def criar_usuario(session):
    def _criar_usuario(
        id: str = None,
        nome: str ="Usuário",
        email: str ="usuario@teste.com.br",
        senha: str ="1234",
        tipo: TipoUsuario = TipoUsuario.CLIENTE,
        telefone: str = "(99) 98765-4321"
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

        return Usuario(
            id=id,
            nome=nome,
            email=email,
            senha=senha,
            tipo=tipo,
            telefone=telefone,
        )
    yield _criar_usuario

# =========================
# MOCK DE PEÇA
# =========================

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
            imagem=imagem,
        )
    yield _peca_base

@pytest.fixture
def criar_peca(session):
    def _criar_peca(
        id: str = None,
        nome: str = "Peça Teste",
        descricao: str = "Descrição da peça teste",
        quantidade: int = 10,
        preco: float = 99.90,
        imagem: bytes = b"imagem_teste"
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

        return Peca(
            id=id,
            nome=nome,
            descricao=descricao,
            quantidade=quantidade,
            preco=preco,
            imagem=imagem,
        )
    yield _criar_peca

# =========================
# MOCK DE OFICINA
# =========================

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
        id: str = None,
        nome: str = "Oficina Teste",
        cnpj: str = "00000000000100",
        endereco: str= "Rua Teste, 123",
        proprietario: Usuario = None,
        persistir_proprietario: bool = False,
    ):
        id = id or str(uuid4())

        # Persistindo proprietário
        if proprietario and persistir_proprietario:
            criar_usuario(**proprietario.to_dict())

        # Criando novo proprietário
        if proprietario is None:
            proprietario = criar_usuario(nome="Mecanico", email="mecanico@email.com", tipo=TipoUsuario.MECANICO)

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
                "usuario_id": proprietario.id,
            }
        )

        return Oficina(
            id=id,
            nome=nome,
            cnpj=cnpj,
            endereco=endereco,
            proprietario=proprietario
        )
    yield _criar_oficina

# =========================
# MOCK DE SERVIÇO
# =========================

@pytest.fixture
def servico_base(oficina_base):
    def _servico_base(
        id=None,
        nome="Serviço Teste",
        descricao="Serviço Genérico",
        tempo=30,
        preco_min=10.99,
        preco_max=15.99,
        oficina=None,
    ):
        return Servico(
            nome=nome,
            descricao=descricao,
            tempo=tempo,
            preco_min=preco_min,
            preco_max=preco_max,
            oficina=oficina or oficina_base(),
            id=id or str(uuid4())
        )
    yield _servico_base

@pytest.fixture
def criar_servico(session, criar_oficina):
    def _criar_servico(
        id: str = None,
        nome: str = "Serviço Teste",
        descricao: str = "Serviço Genérico",
        tempo: int = 30,
        preco_min: float = 10.99,
        preco_max: float = 15.99,
        oficina: Oficina = None,
        persistir_oficina: bool = False,
        persistir_proprietario: bool = False,
    ):
        id = id or str(uuid4())

        # Persistindo oficina
        if oficina and persistir_oficina:
            criar_oficina(**oficina, persistir_proprietario=persistir_proprietario)

        # Criando nova oficina
        if oficina is None:
            oficina = criar_oficina()

        session.execute(
            text(
                """
                INSERT INTO servicos
                (id, nome, descricao, tempo, preco_min, preco_max, oficina_id)
                VALUES
                (:id, :nome, :descricao, :tempo, :preco_min, :preco_max, :oficina_id)
                """
            ), 
            params={
                "id": id,
                "nome": nome,
                "descricao": descricao,
                "tempo": tempo,
                "preco_min": preco_min,
                "preco_max": preco_max,
                "oficina_id": oficina.id,
            }
        )

        return Servico(
            id=id,
            nome=nome,
            descricao=descricao,
            tempo=tempo,
            preco_min=preco_min,
            preco_max=preco_max,
            oficina=oficina,
        )
    yield _criar_servico

# =========================
# MOCKS AGENDAMENTO
# =========================

@pytest.fixture
def peca_do_agendamento_base(peca_base):
    def _peca_do_agendamento_base(
        id: str = None,
        quantidade: int = 1,
        peca: Peca = None,
    ):
        return PecaDoAgendamento(
            id=id or str(uuid4()),
            quantidade=quantidade,
            peca=peca or peca_base()
        )
    yield _peca_do_agendamento_base

@pytest.fixture
def criar_pecas_do_agendamento(session, criar_peca):
    def _criar_pecas_do_agendamento(
        id: str = None,
        quantidade: int = 1,
        peca: Peca = None,
        agendamento: Agendamento = None,
        persistir_peca: bool = False,
    ):
        id = id or str(uuid4())

        if peca and persistir_peca:
            criar_peca(**peca)

        if peca is None:
            peca = criar_peca()
        
        session.execute(
            text(
                """
                INSERT INTO pecas_do_agendamento
                (id, agendamento_id, peca_id, quantidade)
                VALUES
                (:id, :agendamento_id, :peca_id, :quantidade)
                """
            ),
            params={
                "id":id,
                "agendamento_id":agendamento.id if isinstance(agendamento, Agendamento) else None,
                "peca_id":peca.id,
                "quantidade":quantidade,
            }
        )

        return PecaDoAgendamento(
            id=id,
            peca=peca,
            quantidade=quantidade,
        )
    yield _criar_pecas_do_agendamento

@pytest.fixture
def agendamento_base(
    peca_do_agendamento_base, 
    usuario_base, 
    servico_base,
):
    def _agendamento_base(
        id: str = None,
        data: datetime = datetime.now(),
        status: StatusAgendamento = StatusAgendamento.PENDENTE,
        cliente: Usuario = None,
        servico: Servico = None,
        pecas_do_agendamento: list[PecaDoAgendamento] = [],
    ):
        return Agendamento(
            id=id or str(uuid4()),
            data=data,
            status=status,
            cliente=cliente or usuario_base(),
            servico=servico or servico_base(),
            pecas_do_agendamento=pecas_do_agendamento or [peca_do_agendamento_base()],
        )
    yield _agendamento_base

@pytest.fixture
def criar_agendamento(
    session,
    criar_pecas_do_agendamento,
    criar_servico,
    criar_usuario,
):
    def _criar_agendamento(
        id: str = None,
        data: datetime = datetime.now(),
        status: StatusAgendamento = StatusAgendamento.PENDENTE,
        cliente: Usuario = None,
        servico: Servico = None,
        pecas_do_agendamento: list[PecaDoAgendamento] = [],
        persistir_servico: bool = False,
        persistir_oficina: bool = False,
        persistir_proprietario: bool = False,
        persistir_cliente: bool = False,
        persistir_pecas_do_agendamento: bool = False,
    ):
        id = id or str(uuid4())

        # Persistir serviço
        if servico and persistir_servico:
            criar_servico(**servico, persistir_oficina=persistir_oficina, persistir_proprietario=persistir_proprietario)

        # Criar novo serviço
        if servico is None:
            servico = criar_servico()

        # Persistir usuário
        if cliente and persistir_cliente:
            criar_usuario(**cliente)

        # Criar novo usuário
        if cliente is None:
            cliente = criar_usuario()

        session.execute(
            text(
                """
                INSERT INTO agendamentos
                (id, data, status, cliente_id, servico_id)
                VALUES
                (:id, :data, :status, :cliente_id, :servico_id)
                """
            ),
            params={
                "id":id,
                "data":data,
                "status":status,
                "cliente_id":cliente.id,
                "servico_id":servico.id,
            }
        )

        agendamento = Agendamento(
            id=id,
            data=data,
            status=status,
            cliente=cliente,
            servico=servico,
            pecas_do_agendamento=pecas_do_agendamento
        )

        # Persistir peça do agendamento
        if len(pecas_do_agendamento) > 0 and persistir_pecas_do_agendamento:
            for peca in pecas_do_agendamento:
                criar_pecas_do_agendamento(**peca, agendamento_id=id)

        # Criar nova peça do agendamento
        if len(pecas_do_agendamento) == 0:
            pecas_do_agendamento = [criar_pecas_do_agendamento(agendamento=agendamento)]
            agendamento.pecas_do_agendamento = pecas_do_agendamento

        return agendamento
    yield _criar_agendamento