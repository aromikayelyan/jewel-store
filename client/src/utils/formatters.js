const currencyFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0
})

export const formatPrice = value => currencyFormatter.format(Number(value) || 0)

export const truncate = (text, limit = 120) => {
  if (!text) return ''
  if (text.length <= limit) return text
  return `${text.slice(0, limit).trim()}…`
}
