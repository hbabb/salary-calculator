"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { z } from "zod";

// Schema to validate the input
const yearlySchema = z
  .number()
  .positive()
  .max(1_000_000_000, { message: "Value must be less than 1 million" });
const monthlySchema = z
  .number()
  .positive()
  .max(200_000, { message: "Value must be less than 20,000" });
const hourlySchema = z.number().positive().max(2000, { message: "Value must be less than 2000" });

export const SalaryCalculator = () => {
  //Salary state
  const [monthly, setMonthly] = useState<number>(0);
  const [yearly, setYearly] = useState<number>(0);
  const [hourly, setHourly] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  // Currency state
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>("");
  const [toCurrency, setToCurrency] = useState<string>("");
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);

  // Fetch all available currencies
  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest")
      .then((response) => response.json())
      .then((data) => {
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
        setFromCurrency(currencyList[0] || "USD");
        setToCurrency(currencyList[0] || "USD");
      });
  }, []);

  // Fetch the exchange rate based on the selected "from" currency
  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  // validate inputs and perform calculations
  const validateAndCalculate = (value: number, type: "monthly" | "yearly" | "hourly") => {
    try {
      if (type === "monthly") monthlySchema.parse(value);
      if (type === "yearly") yearlySchema.parse(value);
      if (type === "hourly") hourlySchema.parse(value);

      setError(null);

      if (type === "monthly") {
        setMonthly(Number(value));
        setYearly(value * 12);
        setHourly((value * 12) / 2080);
      } else if (type === "yearly") {
        setYearly(Number(value));
        setMonthly(value / 12);
        setHourly(value / 2080);
      } else if (type === "hourly") {
        setHourly(Number(value));
        setMonthly((value * 2080) / 12);
        setYearly(value * 2080);
      }
    } catch (e) {
      setError((e as z.ZodError).issues[0].message);
    }
  };

  // calculate the exchange rate values
  const calculateConverted = (value: number) => {
    const rate = exchangeRate ?? 1; // Fallback to 1 if exchangeRate is null
    return (value * rate).toFixed(2);
  };

  // calculate the weekly rate based on the hourly rate. Assumed 40 hours per week (standard base salary in the US)
  const weekly = hourly ? (parseFloat(hourly.toString()) * 40).toFixed(2) : "";

  // Format the currency based on currency selection
  const formatCurrency = (value: number, currency: string = "USD") => {
    const validCurrency = currency && currency.length === 3 ? currency : "USD";
    return new Intl.NumberFormat("en-US", { style: "currency", currency: validCurrency }).format(
      value,
    );
  };

  return (
    <Card className="mx-auto max-w-md p-4 shadow-md md:max-w-lg lg:max-w-xl">
      <CardHeader className="flex flex-col gap-4">
        <CardTitle className="text-center text-sm font-bold md:text-lg lg:text-2xl">
          Salary Calculator
        </CardTitle>
        <CardDescription className="flex flex-row justify-between gap-4">
          <div>
            <ModeToggle />
          </div>
          <div>
            <p>
              Enter your salary details to calculate the equivalent monthly, yearly, and hourly
              rates.
            </p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* Select fromCurrency and toCurrency to calculate exchangeRate */}
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2">
              <Label>From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-full">
                  {fromCurrency || "Select currency"}
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-full">{toCurrency || "Select currency"}</SelectTrigger>
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
        </div>

        {/* Salary Inputs */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="monthly">Monthly Salary</Label>
          <Input
            type="number"
            value={monthly}
            onChange={(e) => validateAndCalculate(Number(e.target.value), "monthly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="yearly">Yearly Salary</Label>
          <Input
            type="number"
            value={yearly}
            onChange={(e) => validateAndCalculate(Number(e.target.value), "yearly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="hourly">Hourly Salary</Label>
          <Input
            type="number"
            value={hourly}
            onChange={(e) => validateAndCalculate(Number(e.target.value), "hourly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <Button
          onClick={() => {
            setMonthly(0);
            setYearly(0);
            setHourly(0);
            setError(null);
          }}
          variant="destructive"
          className="mt-4 w-full"
        >
          Reset
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        {/* Results Table */}
        <Table>
          <TableCaption>
            Exchange Rate: 1 {fromCurrency} = {exchangeRate?.toFixed(2)} {toCurrency}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>{fromCurrency} Amount</TableHead>
              <TableHead>{toCurrency} Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{formatCurrency(Number(monthly), fromCurrency)}</TableCell>
              <TableCell>
                {formatCurrency(Number(calculateConverted(monthly)), toCurrency)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{formatCurrency(Number(yearly), fromCurrency)}</TableCell>
              <TableCell>
                {formatCurrency(Number(calculateConverted(yearly)), toCurrency)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{formatCurrency(Number(hourly), fromCurrency)}</TableCell>
              <TableCell>
                {formatCurrency(Number(calculateConverted(hourly)), toCurrency)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>{weekly ? formatCurrency(Number(weekly), fromCurrency) : "-"}</TableCell>
              <TableCell>
                {weekly
                  ? formatCurrency(Number(calculateConverted(Number(weekly))), toCurrency)
                  : "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardFooter>
    </Card>
  );
};
