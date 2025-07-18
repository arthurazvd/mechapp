class DomainError(Exception):
    pass

# Usuário

class EmailInvalido(DomainError):
    pass

class TipoInvalido(DomainError):
    pass

class EmailExistente(DomainError):
    pass

class UsuarioNaoEncontrado(DomainError):
    pass

class UsuarioInvalido(DomainError):
    pass

# Peça

class PecaInvalida(DomainError):
    pass

class PecaNaoEncontrada(DomainError):
    pass

# Oficina

class OficinaNaoEncontrada(DomainError):
    pass

class CNPJInvalido(DomainError):
    pass

# Servico

class ServicoInvalido(DomainError):
    pass

class ServicoNaoEncontrado(DomainError):
    pass

# Agendamento

class AgendamentoInvalido(DomainError):
    pass

class AgendamentoNaoEncontrado(DomainError):
    pass

# peca do agendamento

class PecaDoAgendamentoInvalida(DomainError):
    pass

class PecaDoAgendamentoNaoEncontrada(DomainError):
    pass

# Avaliacao

class AvaliacaoInvalida(DomainError):
    pass

class AvaliacaoNaoEncontrada(DomainError):
    pass