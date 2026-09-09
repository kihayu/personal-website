export const text = (value: unknown): string => (typeof value === 'string' ? value.trim() : '')
