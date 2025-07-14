import pytest
from src.adapters.orm import usuarios, oficinas, pecas, servicos, agendamentos, avaliacoes, pecas_do_agendamento

def test_tabelas_refletidas():
    assert usuarios is not None
    assert oficinas is not None
    assert pecas is not None
    assert servicos is not None
    assert agendamentos is not None
    assert avaliacoes is not None
    assert pecas_do_agendamento is not None

def test_colunas_usuarios():
    colunas = usuarios.columns.keys()
    assert 'id' in colunas
    assert 'nome' in colunas
    assert 'email' in colunas
    assert 'senha' in colunas
    assert 'tipo' in colunas
    assert 'telefone' in colunas

def test_colunas_oficinas():
    colunas = oficinas.columns.keys()
    assert 'id' in colunas
    assert 'usuario_id' in colunas
    assert 'nome' in colunas
    assert 'cnpj' in colunas
    assert 'endereco' in colunas

def test_colunas_pecas():
    colunas = pecas.columns.keys()
    assert 'id' in colunas
    assert 'nome' in colunas
    assert 'descricao' in colunas
    assert 'quantidade' in colunas
    assert 'preco' in colunas
    assert 'imagem' in colunas

def test_colunas_servicos():
    colunas = servicos.columns.keys()
    assert 'id' in colunas
    assert 'oficina_id' in colunas
    assert 'nome' in colunas
    assert 'descricao' in colunas
    assert 'tempo' in colunas
    assert 'preco_max' in colunas
    assert 'preco_min' in colunas

def test_colunas_agendamentos():
    colunas = agendamentos.columns.keys()
    assert 'id' in colunas
    assert 'cliente_id' in colunas
    assert 'servico_id' in colunas
    assert 'data' in colunas
    assert 'status' in colunas

def test_colunas_avaliacoes():
    colunas = avaliacoes.columns.keys()
    assert 'id' in colunas
    assert 'cliente_id' in colunas
    assert 'servico_id' in colunas
    assert 'nota' in colunas
    assert 'comentario' in colunas
    assert 'data' in colunas

def test_colunas_pecas_do_agendamento():
    colunas = pecas_do_agendamento.columns.keys()
    assert 'agendamento_id' in colunas
    assert 'peca_id' in colunas
    assert 'quantidade' in colunas
