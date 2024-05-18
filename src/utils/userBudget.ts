export function formatCurrency(value: string): string {
  const numberValue = parseInt(value.replace(/\D/g, ''), 10);
  if (isNaN(numberValue)) return '';
  return '$' + numberValue.toLocaleString('es-CL');
}
