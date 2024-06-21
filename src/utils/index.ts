export function formatCurrency(value: string): string {
  const numberValue = parseInt(value.replace(/\D/g, ''), 10);
  if (isNaN(numberValue)) return '';
  return '$' + numberValue.toLocaleString('es-CL');
}

export function snakeToCamel(obj: Record<string, any>): Record<string, any> {
  const camelCaseObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
      camelCaseObj[camelCaseKey] = obj[key];
    }
  }
  return camelCaseObj;
}
