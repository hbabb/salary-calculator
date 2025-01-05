"use client";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";

const yearlySchema = z
  .number()
  .positive()
  .max(1_000_000_000, { message: "Value must be less than 1 million" });
const monthlySchema = z
  .number()
  .positive()
  .max(20_000, { message: "Value must be less than 20,000" });
const hourlySchema = z.number().positive().max(200, { message: "Value must be less than 200" });

const formatCurrency = (value: string | number) => {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    Number(value),
  );
};

export const SalaryCalculator = () => {
  const [monthly, setMonthly] = useState<string | number>("");
  const [yearly, setYearly] = useState<string | number>("");
  const [hourly, setHourly] = useState<string | number>("");
  const [error, setError] = useState<string | null>(null);

  const validateAndCalculate = (value: string, type: "monthly" | "yearly" | "hourly") => {
    const parsedValue = parseFloat(value);

    try {
      if (type === "monthly") monthlySchema.parse(parsedValue);
      if (type === "yearly") yearlySchema.parse(parsedValue);
      if (type === "hourly") hourlySchema.parse(parsedValue);

      setError(null);

      if (type === "monthly") {
        setMonthly(value);
        setYearly((parsedValue * 12).toFixed(2));
        setHourly(((parsedValue * 12) / 2080).toFixed(2));
      } else if (type === "yearly") {
        setYearly(value);
        setMonthly((parsedValue / 12).toFixed(2));
        setHourly((parsedValue / 2080).toFixed(2));
      } else if (type === "hourly") {
        setHourly(value);
        setMonthly(((parsedValue * 2080) / 12).toFixed(2));
        setYearly((parsedValue * 2080).toFixed(2));
      }
    } catch (e) {
      setError((e as z.ZodError).issues[0].message);
    }
  };

  const weekly = hourly ? (parseFloat(hourly.toString()) * 40).toFixed(2) : "";

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
        <div className="flex flex-col gap-2">
          <Label htmlFor="monthly">Monthly Salary</Label>
          <Input
            type="number"
            value={monthly}
            onChange={(e) => validateAndCalculate(e.target.value, "monthly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="yearly">Yearly Salary</Label>
          <Input
            type="number"
            value={yearly}
            onChange={(e) => validateAndCalculate(e.target.value, "yearly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="hourly">Hourly Salary</Label>
          <Input
            type="number"
            value={hourly}
            onChange={(e) => validateAndCalculate(e.target.value, "hourly")}
            placeholder="Enter monthly salary"
            className="w-full"
          />
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        <Button
          onClick={() => {
            setMonthly("");
            setYearly("");
            setHourly("");
            setError(null);
          }}
          variant="destructive"
          className="mt-4 w-full"
        >
          Reset
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <p className="text-sm text-slate-800 dark:text-slate-100">
          Monthly: {formatCurrency(monthly || 0)}
        </p>
        <p className="text-sm text-slate-800 dark:text-slate-100">
          Yearly: {formatCurrency(yearly || 0)}
        </p>
        <p className="text-sm text-slate-800 dark:text-slate-100">
          Hourly: {formatCurrency(hourly || 0)}
        </p>
        <p className="text-sm text-slate-800 dark:text-slate-100">
          weekly: {weekly ? formatCurrency(weekly) : "-"}
        </p>
      </CardFooter>
    </Card>
  );
};
