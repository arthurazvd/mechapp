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