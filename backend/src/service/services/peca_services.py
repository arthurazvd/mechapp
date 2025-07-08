from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Peca
from src.domain.exceptions import (
    PecaInvalida,
    PecaNaoEncontrada,
)

def criar_peca(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    descricao: str,
    quantidade: int,
    preco: float,
    imagem: bytes | None = None,
) -> str:
    """
    Serviço de criação de peças no sistema. Recebendo as informações de uma peça, levantando possíveis problemas
    e persistindo as informações quando possível.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        nome (str): Nome da peça.
        descricao (str): Descrição da peça.
        quantidade (int): Quantidade da peça em estoque.
        preco (float): Preço da peça.
        imagem (bytes | None): Imagem da peça. 
    Returns:
        str: Identificador da peça criada.
    Raises:
        PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
    """
    
    # Verificando preço e quantidade da peça
    if quantidade < 0 or preco <= 0:
        raise PecaInvalida("Quantidade e preço devem ser maiores ou iguais a zero.")

    # Adicionando peça
    with uow:
        peca = Peca(nome=nome, descricao=descricao, quantidade=quantidade, preco=preco, imagem=imagem)
        uow.pecas.adicionar(peca)
        uow.commit()

        return peca.id

def alterar_peca(
    uow: AbstractUnidadeDeTrabalho,
    peca_id: str,
    novo_nome: str | None = None,
    nova_descricao: str | None = None,
    nova_quantidade: int | None = None,
    novo_preco: float | None = None,
    nova_imagem: bytes | None = None,
):
    """
    Serviço de alteração de informações de uma peça no sistema. Recebendo a peça identificada, modificando seus valores 
    e verificando a possibilidade de persistência do dado.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        peca_id (str): ID da peça a ser alterada.
        novo_nome (str | None): Novo nome da peça.
        nova_descricao (str | None): Nova descrição da peça.
        nova_quantidade (int | None): Nova quantidade da peça em estoque.
        novo_preco (float | None): Novo preço da peça.
        nova_imagem (bytes | None): Nova imagem da peça. 
    Raises:
        PecaInvalida: Quantidade e preço devem ser maiores ou iguais a zero.
        PecaNaoEncontrada: A peça informada não foi encontrada.
    """

    # Verificando preço e quantidade da peça
    if nova_quantidade < 0 or novo_preco <= 0:
        raise PecaInvalida("Quantidade e preço devem ser maiores ou iguais a zero.")

    with uow:
        # Verifica se a peça existe
        peca = uow.pecas.consultar(peca_id)
        if peca is None:
            raise PecaNaoEncontrada("A peça informada não foi encontrada.")
        
        # Atualiza os campos conforme necessário
        peca.nome = novo_nome or peca.nome
        peca.preco = novo_preco or peca.preco
        peca.imagem = nova_imagem or peca.imagem
        peca.descricao = nova_descricao or peca.descricao
        peca.quantidade = nova_quantidade or peca.quantidade
        
        uow.pecas.salvar(peca)
        uow.commit()

def remover_peca(
    uow: AbstractUnidadeDeTrabalho,
    peca_id: str,
):
    """
    Serviço de remoção de uma peça do sistema. Recebendo a peça identificada e verificando a possibilidade de remoção.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        peca_id (str): ID da peça a ser removida.
    Raises:
        PecaNaoEncontrada: A peça informada não foi encontrada.
    """
    
    with uow:
        # Verifica se a peça existe
        peca = uow.pecas.consultar(peca_id)
        if peca is None:
            raise PecaNaoEncontrada("A peça informada não foi encontrada.")
        
        uow.pecas.remover(peca)
        uow.commit()

def consultar_peca(
    uow: AbstractUnidadeDeTrabalho,
    peca_id: str,
) -> dict:
    """
    Serviço de consulta de uma peça no sistema. Recebendo a peça identificada e retornando suas informações.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
        peca_id (str): ID da peça a ser consultada.
    Returns:
        dict: Dicionário com as informações da peça encontrada, ou nada caso não haja.
    """
    
    with uow:
        peca = uow.pecas.consultar(peca_id)
        if peca:
            return peca.to_dict()
        return {}

def listar_pecas(
    uow: AbstractUnidadeDeTrabalho,
) -> dict:
    """
    Serviço de listagem de todas as peças do sistema.

    Args:
        uow (AbstractUnidadeDeTrabalho): Unidade de Trabalho abstrata.
    Returns:
        dict: Dicionário com as informações da peça encontrada, ou nada caso não haja.
    """
    
    with uow:
        pecas = uow.pecas.listar()
        return [peca.to_dict() for peca in pecas]

## Pesquisar Peças -- FUTURO