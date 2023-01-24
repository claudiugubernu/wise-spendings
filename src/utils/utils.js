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

export const updatedAlertDate = (timeframe, alertDate) => {
  alertDate = alertDate ? alertDate : new Date();
  let newDate = new Date();
  switch(timeframe) {
    case 'week': 
      newDate.setDate(new Date(alertDate).getDate() + 7)
      break;
    case 'month': 
      newDate.setDate(new Date(alertDate).getDate() + 30)
      break;
    case 'quarterly': 
      newDate.setDate(new Date(alertDate).getDate() + 91)
      break;
    case 'halfYear': 
      newDate.setDate(new Date(alertDate).getDate() + 182)
      break;
    case 'year': 
      newDate.setDate(new Date(alertDate).getDate() + 365)
      break;
    default:
      console.log('no timeframe offered')
      break;
  }
  return newDate;
}
