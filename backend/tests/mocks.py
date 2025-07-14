# mocks.py
import pytest
import uuid # Importar uuid explicitamente
from uuid import uuid4
from datetime import datetime
from sqlalchemy import text
from src.domain.models import * # Assumindo que PecaDoAgendamento, Agendamento, Peca, Usuario, Servico, Oficina estão aqui
from sqlalchemy.orm import Session # Importar Session explicitamente


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
            tipo=tipo, 
            telefone=telefone,
        )
    yield _usuario_base

@pytest.fixture
def mock_criar_usuario(session: Session):
    def _criar_usuario(
        id: str = None,
        nome: str = "Usuário",
        email: str = None,
        senha: str = "1234",
        tipo: TipoUsuario = TipoUsuario.CLIENTE,
        telefone: str = "(99) 98765-4321"
    ):
        id = id or str(uuid4())

        if email is None:
            email = f"{nome.lower().replace(' ', '')}_{uuid4().hex[:8]}@test.com"

        usuario_existente = session.query(Usuario).filter_by(email=email).first()
        if usuario_existente:
            return usuario_existente

        usuario = Usuario(
            id=id,
            nome=nome,
            email=email,
            senha=senha,
            tipo=tipo,
            telefone=telefone,
        )

        session.add(usuario)
        session.commit()
        session.refresh(usuario) 

        return usuario
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
def mock_criar_peca(session):
    def _criar_peca(
        id: str = None,
        nome: str = "Peça Teste",
        descricao: str = "Descrição da peça teste",
        quantidade: int = 10,
        preco: float = 99.90,
        imagem: bytes = b"imagem_teste"
    ):
        id = id or str(uuid4())
        
        peca = Peca(
            id=id,
            nome=nome,
            descricao=descricao,
            quantidade=quantidade,
            preco=preco,
            imagem=imagem,
        )
        session.add(peca)
        session.commit()
        session.refresh(peca) 

        return peca
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
        proprietario=None,
    ):
        return Oficina(
            id=id or str(uuid4()),
            nome=nome,
            cnpj=cnpj,
            endereco=endereco,
            proprietario=proprietario or usuario_base(
                tipo=TipoUsuario.MECANICO,
                email=f"mecanico_{uuid4().hex[:8]}@email.com"
            )
        )
    return _oficina_base


@pytest.fixture
def mock_criar_oficina(session, mock_criar_usuario):
    def _criar_oficina(
        id: str = None,
        nome: str = "Oficina Teste",
        cnpj: str = "00000000000100",
        endereco: str = "Rua Teste, 123",
        proprietario: Usuario = None,
    ):
        id = id or str(uuid4())

        oficina_existente = session.query(Oficina).filter_by(id=id).first()
        if oficina_existente:
            return oficina_existente

        if proprietario is None:
            proprietario = mock_criar_usuario(
                nome="Mecânico",
                email=f"mecanico_{uuid4().hex[:8]}@email.com",
                tipo=TipoUsuario.MECANICO
            )
        
        # Garante que o proprietário esteja persistido e na sessão.
        # Se 'proprietario' veio de mock_criar_usuario, já está.
        # Caso contrário, adiciona e faz refresh.
        if proprietario and not session.query(Usuario).filter_by(id=proprietario.id).first():
            session.add(proprietario)
            session.commit()
            session.refresh(proprietario)


        oficina = Oficina(
            id=id,
            nome=nome,
            cnpj=cnpj,
            endereco=endereco,
            proprietario=proprietario,
        )

        session.add(oficina)
        session.commit()
        session.refresh(oficina) 
        return oficina
    return _criar_oficina


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
def mock_criar_servico(session, mock_criar_oficina):
    def _criar_servico(
        id: str = None,
        nome: str = "Serviço Teste",
        descricao: str = "Serviço Genérico",
        tempo: int = 30,
        preco_min: float = 10.99,
        preco_max: float = 15.99,
        oficina: Oficina = None,
    ):
        id = id or str(uuid4())

        servico_existente = session.query(Servico).filter_by(id=id).first()
        if servico_existente:
            return servico_existente

        if oficina is None:
            oficina = mock_criar_oficina() 
        elif not session.query(Oficina).filter_by(id=oficina.id).first():
            session.add(oficina)
            session.commit()
            session.refresh(oficina)
            
        servico = Servico(
            id=id,
            nome=nome,
            descricao=descricao,
            tempo=tempo,
            preco_min=preco_min,
            preco_max=preco_max,
            oficina=oficina,
        )

        session.add(servico)
        session.commit()
        session.refresh(servico) 
        return servico
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
def mock_criar_pecas_do_agendamento(session, mock_criar_peca):
    def _criar_pecas_do_agendamento(
        id: str = None,
        quantidade: int = 1,
        peca: Peca = None, # Espera-se um objeto Peca aqui
        agendamento: Agendamento = None, # Espera-se um objeto Agendamento aqui
        persistir_peca: bool = False,
    ):
        id = id or str(uuid4())

        # Garante que 'peca' seja um objeto Peca persistido antes de usá-lo.
        if peca is None:
            peca = mock_criar_peca()
        elif persistir_peca and not session.query(Peca).filter_by(id=peca.id).first():
            # Se a 'peca' é um dicionário, crie-a. Se é um objeto Peca não persistido, persista-o.
            if isinstance(peca, dict):
                peca = mock_criar_peca(**peca)
            else: # Assumindo que 'peca' é uma instância de Peca
                session.add(peca)
                session.commit()
                session.refresh(peca)

        # Cria a peça do agendamento sem passar agendamento no construtor
        peca_do_agendamento = PecaDoAgendamento(
            id=id,
            quantidade=quantidade,
            peca=peca
        )
        
        # Se um agendamento foi fornecido, estabelece a relação
        if agendamento:
            peca_do_agendamento.agendamento = agendamento
            peca_do_agendamento.agendamento_id = agendamento.id

        session.add(peca_do_agendamento)
        session.commit()
        session.refresh(peca_do_agendamento)
        
        return peca_do_agendamento
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
def mock_criar_agendamento(
    session,
    mock_criar_pecas_do_agendamento,
    mock_criar_servico,
    mock_criar_usuario,
    mock_criar_peca # Adicionado para garantir a criação de peças se necessário
):
    def _criar_agendamento(
        id: str = None,
        data: datetime = datetime.now(),
        status: StatusAgendamento = StatusAgendamento.PENDENTE,
        cliente: Usuario = None,
        servico: Servico = None,
        pecas_do_agendamento: list[PecaDoAgendamento] = None, # Alterado para None para ser mais explícito
    ):
        id = id or str(uuid4())

        if servico is None:
            servico = mock_criar_servico()
        elif not session.query(Servico).filter_by(id=servico.id).first():
            # Se o serviço foi passado mas não está na sessão, adiciona/persiste
            session.add(servico)
            session.commit()
            session.refresh(servico)

        if cliente is None:
            cliente = mock_criar_usuario()
        elif not session.query(Usuario).filter_by(id=cliente.id).first():
            session.add(cliente)
            session.commit()
            session.refresh(cliente)

        agendamento = Agendamento(
            id=id,
            data=data,
            status=status,
            cliente=cliente, 
            servico=servico, 
            pecas_do_agendamento=[] # Inicializa vazio e preenche depois
        )
        session.add(agendamento)
        session.commit()
        session.refresh(agendamento) 

        # Processa peças do agendamento
        if pecas_do_agendamento:
            lista_pecas_agendamento_criadas = []
            for item_peca_agendamento in pecas_do_agendamento:
                peca_obj_para_mock = None
                # Se o item já é uma instância de PecaDoAgendamento, usa-o diretamente (não deveria precisar recriar)
                if isinstance(item_peca_agendamento, PecaDoAgendamento):
                    # Se PecaDoAgendamento já tem um agendamento_id, é melhor que seja o ID do agendamento atual
                    if item_peca_agendamento.agendamento_id != agendamento.id:
                        item_peca_agendamento.agendamento = agendamento # Reatribui a relação
                    lista_pecas_agendamento_criadas.append(item_peca_agendamento)
                else: # Assume que é um dicionário ou similar para criar PecaDoAgendamento
                    # Garante que a peça (Peca) associada esteja persistida
                    peca_info = item_peca_agendamento.get('peca')
                    if peca_info:
                        if isinstance(peca_info, Peca):
                            peca_obj_para_mock = peca_info
                            if not session.query(Peca).filter_by(id=peca_obj_para_mock.id).first():
                                session.add(peca_obj_para_mock)
                                session.commit()
                                session.refresh(peca_obj_para_mock)
                        elif isinstance(peca_info, dict):
                            # Se a peça é um dicionário, cria uma nova peça.
                            peca_obj_para_mock = mock_criar_peca(**peca_info)
                    else:
                        # Se nenhuma peça foi fornecida para o PecaDoAgendamento, cria uma padrão
                        peca_obj_para_mock = mock_criar_peca()

                    # Cria a PecaDoAgendamento, passando o objeto Peca
                    peca_agendamento_criada = mock_criar_pecas_do_agendamento(
                        agendamento=agendamento, # Passa o objeto Agendamento
                        peca=peca_obj_para_mock, # Passa o objeto Peca
                        quantidade=item_peca_agendamento.get('quantidade', 1)
                    )
                    lista_pecas_agendamento_criadas.append(peca_agendamento_criada)
            
            agendamento.pecas_do_agendamento = lista_pecas_agendamento_criadas
            session.commit() # Commit para persistir as peças do agendamento relacionadas
            session.refresh(agendamento) # Refresh novamente para carregar a coleção de peças

        # Se nenhuma peça do agendamento foi fornecida e a lista ainda está vazia, cria uma padrão.
        if not agendamento.pecas_do_agendamento: # Verifica se a lista ainda está vazia após processamento
            agendamento.pecas_do_agendamento = [mock_criar_pecas_do_agendamento(agendamento=agendamento)]
            session.commit() 
            session.refresh(agendamento)

        return agendamento
    yield _criar_agendamento

# =========================
# MOCK DE AVALIAÇÃO
# =========================

@pytest.fixture
def avaliacao_base(usuario_base, servico_base):
    def _avaliacao_base(
        id=None,
        nota=NotaAvaliacao.BOM,
        comentario="Serviço muito bom, recomendo!",
        data=datetime.now(),
        cliente=None,
        servico=None,
    ):
        return Avaliacao(
            id=id or str(uuid4()),
            nota=nota,
            comentario=comentario,
            data=data,
            cliente=cliente or usuario_base(),
            servico=servico or servico_base(),
        )
    yield _avaliacao_base

@pytest.fixture
def mock_criar_avaliacao(session: Session, mock_criar_usuario, mock_criar_servico):
    def _criar_avaliacao(
        id: str = None,
        nota: NotaAvaliacao = NotaAvaliacao.BOM,
        comentario: str = "Serviço muito bom, recomendo!",
        data: datetime = None,
        cliente: Usuario = None,
        servico: Servico = None,
    ):
        id = id or str(uuid4())
        data = data or datetime.now()

        if cliente is None:
            cliente = mock_criar_usuario()
        elif not session.query(Usuario).filter_by(id=cliente.id).first():
            session.add(cliente)
            session.commit()
            session.refresh(cliente)

        if servico is None:
            servico = mock_criar_servico()
        elif not session.query(Servico).filter_by(id=servico.id).first():
            session.add(servico)
            session.commit()
            session.refresh(servico)

        avaliacao = Avaliacao(
            id=id,
            nota=nota,
            comentario=comentario,
            data=data,
            cliente=cliente,
            servico=servico,
        )

        session.add(avaliacao)
        session.commit()
        session.refresh(avaliacao) 
        return avaliacao
    yield _criar_avaliacao