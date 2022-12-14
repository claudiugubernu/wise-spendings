export const currencyFormatter = (currency = "GBP") =>
  new Intl.NumberFormat(undefined, {
    currency: currency,
    style: "currency",
    minimumFractionDigits: 0,
  });

export const sliceString = (string) => {
  return string.length < 13 ? string : string.substring(0,13) + '...' 
}
