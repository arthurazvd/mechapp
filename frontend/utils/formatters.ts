export function formatarPreco(valor: string) {
  let numeroLimpo = valor.replace(/\D/g, '');
  let numero = Number(numeroLimpo) / 100;
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}
export function formatarDocumento(valor: string) {
  const doc = valor.replace(/\D/g, '').slice(0, 14); // CPF: 11 dígitos, CNPJ: 14

  if (doc.length <= 11) {
    // CPF: 000.000.000-00
    return doc
      .replace(/^(\d{3})(\d)/, '$1.$2')
      .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2-$3');
  } else {
    // CNPJ: 00.000.000/0000-00
    return doc
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})\.(\d{3})(\d)/, '.$1.$2/$3')
      .replace(/(\d{4})(\d)/, '$1-$2');
  }
}

export function formatarContato(valor: string) {
  const numero = valor.replace(/\D/g, '').slice(0, 11);

  if (numero.length <= 10) {
    // Formato fixo ou celular antigo: (99) 9999-9999
    return numero
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2');
  } else {
    // Formato celular novo: (99) 99999-9999
    return numero
      .replace(/^(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
}
