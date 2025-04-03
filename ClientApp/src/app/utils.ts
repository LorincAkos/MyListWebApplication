export function getEnumText(enumType: any, value: number): string{
    const enumKey = Object.keys(enumType).find(key => enumType[key] === value);
    return enumKey ? enumKey : '';
}