export function FormatCurrency(amount: number, currency: string) {
 
  const validCurrency = ["USD", "EUR", "GBP", "JPY", "CAD"];
  const formattedCurrency = validCurrency.includes(currency) ? currency : "USD"; 

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: formattedCurrency,
  }).format(amount);
}
