export const currencyFormatter = (currency) =>
  new Intl.NumberFormat(undefined, {
    currency: currency,
    style: "currency",
    minimumFractionDigits: 0,
  });
