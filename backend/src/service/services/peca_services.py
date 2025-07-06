from src.service.unit_of_work import AbstractUnidadeDeTrabalho
from src.domain.models import Peca
from src.domain.exceptions import *

def criar_peca(
    uow: AbstractUnidadeDeTrabalho,
    nome: str,
    descricao: str,
    quantidade: int,
    preco: float,
    imagem: bytes | None = None,
):
    
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

    Raises:
        PecaInvalida: A peça informada é inválida.
    """
    
    #precisa nem comentar isso
    if quantidade < 0 or preco < 0:
        raise PecaInvalida("Quantidade e preço devem ser maiores ou iguais a zero.")
    
    if not nome or not descricao:
        raise PecaInvalida("Nome e descrição não podem ser vazios.")
    
    if not peca:
        raise PecaNaoEncontrada("A peça informada não foi encontrada.")

    with uow:
        # adiciona peca
        peca = Peca(nome, descricao, quantidade, preco, imagem)
        uow.pecas.adicionar(peca)
        uow.commit()

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
        PecaNaoEncontrada: A peça informada não foi encontrada.
    """
    
    with uow:
        # Verifica se a peça existe
        peca = uow.pecas.consultar(peca_id)
        if not peca:
            raise PecaNaoEncontrada("A peça informada não foi encontrada.")
        
        # Atualiza os campos conforme necessário
        if novo_nome is not None:
            peca.nome = novo_nome
        if nova_descricao is not None:
            peca.descricao = nova_descricao
        if nova_quantidade is not None:
            peca.quantidade = nova_quantidade
        if novo_preco is not None:
            peca.preco = novo_preco
        if nova_imagem is not None:
            peca.imagem = nova_imagem
        
        uow.pecas.atualizar(peca)
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
        if not peca:
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

    Raises:
        PecaNaoEncontrada: A peça informada não foi encontrada.
    """
    
    with uow:
        peca = uow.pecas.consultar(peca_id)
        if not peca:
            raise PecaNaoEncontrada("A peça informada não foi encontrada.")
        
        return peca.to_dict()
