export const currencyFormatter = (currency = "GBP") =>
  new Intl.NumberFormat(undefined, {
    currency: currency,
    style: "currency",
    minimumFractionDigits: 0,
  });

export const sliceString = (string) => {
  return string.length < 13 ? string : string.substring(0,13) + '...' 
}

export const sortAscending = (array) => {
  const sorted =  array.sort((a,b) => Date.parse(b.date) - Date.parse(a.date))
  return sorted;
}

export const formatDate = (date, format) => {
  const map = {
    mm: (date.getMonth() + 1).toString().padStart(2, '0'),
    dd: date.getDate().toString().padStart(2, '0'),
    yyyy: date.getFullYear(),
  }
  return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
}
