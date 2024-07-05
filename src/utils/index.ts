export function formatCurrency(value: string | number): string {
  const numberValue = parseInt(value.toString().replace(/\D/g, ''), 10);
  if (isNaN(numberValue)) return '';
  return '$' + numberValue.toLocaleString('es-CL');
}

export function snakeToCamel(obj: Record<string, any>): Record<string, any> {
  const newObj: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = key.replace(/_([a-z])/g, (match) => match[1].toUpperCase());
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[newKey] = snakeToCamel(obj[key] as Record<string, any>);
      } else {
        newObj[newKey] = obj[key];
      }
    }
  }
  return newObj;
}

export function dateToUTC(date: Date): Date {
  const utc = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
  return new Date(utc);
}
