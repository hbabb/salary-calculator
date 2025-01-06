"use client";

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface CurrencyConverterProps {
  onCurrencyChange: (fromCurrency: string, toCurrency: string) => void;
}

export const CurrencyConverter = ({ onCurrencyChange }: CurrencyConverterProps) => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");

  // Fetch current exchange rate currency list from open exchange
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest")
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
      });
  }, []);

  // Notify parent when currencies change (parent is SalaryCalculator)
  useEffect(() => {
    onCurrencyChange(fromCurrency, toCurrency);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromCurrency, toCurrency]);

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex gap-4">
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
          <SelectTrigger>{fromCurrency || "Select currency"}</SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger>{toCurrency || "Select currency"}</SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency} value={currency}>
                {currency}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
