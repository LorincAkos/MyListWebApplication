export function getEnumText(enumType: any, value: number): string {
  const enumKey = Object.keys(enumType).find(key => enumType[key] === value);
  return enumKey ? enumKey : '';
}

export function getEnumKey<T extends Record<string, string | number>>(enumObj: T, value: number): string | undefined {
  return (enumObj as any)[value]; // Reverse lookup
}

export function getSeason(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = January, 11 = December

  if (month >= 2 && month <= 4) {
    return 'Spring ' + year;  // March, April, May
  } else if (month >= 5 && month <= 7) {
    return 'Summer ' + year;  // June, July, August
  } else if (month >= 8 && month <= 10) {
    return 'Fall ' + year;    // September, October, November
  } else {
    return 'Winter ' + year;  // December, January, February
  }
}

export function toDateOnlyString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function deepEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (typeof a !== 'object' || a === null || typeof b !== 'object' || b === null)
    return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(a[key], b[key])) return false;
  }

  return true;
}

export const RatingOptions = [
  { label: "10" },
  { label: "13" },
  { label: "15" },
  { label: "17" },
]