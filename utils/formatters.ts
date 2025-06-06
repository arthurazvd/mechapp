export function formatarPreco(valor: string) {
  let numeroLimpo = valor.replace(/\D/g, '');
  let numero = Number(numeroLimpo) / 100;
  return numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}