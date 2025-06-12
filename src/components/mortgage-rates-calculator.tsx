"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export default function MortgageRatesCalculator() {
  const [activeTab, setActiveTab] = useState<"fixed" | "variable">("fixed");
  const [mortgageSize, setMortgageSize] = useState(100000);
  const [expandedRow, setExpandedRow] = useState(2);
  const router = useRouter();
  
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMortgageSize(Number.parseInt(e.target.value));
  };

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(-1);
    } else {
      setExpandedRow(index);
    }
  };

  // Mortgage calculation function
  const calculateMortgagePayment = (
    principal: number,
    annualRate: number,
    years: number
  ): number => {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    return monthlyPayment;
  };

  // Term options with bank rates and our rates
  const termOptions = [
    { term: "6 Months", bankRate: 7.89, ourRate: 7.49, years: 0.5 },
    { term: "1 Year", bankRate: 7.39, ourRate: 6.99, years: 1 },
    { term: "2 Years", bankRate: 6.99, ourRate: 6.59, years: 2 },
    { term: "3 Years", bankRate: 5.99, ourRate: 5.59, years: 3 },
    { term: "4 Years", bankRate: 5.74, ourRate: 5.34, years: 4 },
    { term: "5 Years", bankRate: 5.49, ourRate: 5.09, years: 5 },
    { term: "10 Years", bankRate: 6.99, ourRate: 6.59, years: 10 },
  ];

  // Calculate rows dynamically
  const rows = termOptions.map((option) => {
    const bankPayment = calculateMortgagePayment(
      mortgageSize,
      option.bankRate,
      option.years
    );
    const ourPayment = calculateMortgagePayment(
      mortgageSize,
      option.ourRate,
      option.years
    );
    const saving = bankPayment - ourPayment;

    return {
      term: option.term,
      bankRate: `${option.bankRate.toFixed(2)} %`,
      bankPayment: `$${bankPayment.toFixed(2)}`,
      ourRate: `${option.ourRate.toFixed(2)} %`,
      ourPayment: `$${ourPayment.toFixed(2)}`,
      saving: `$${saving.toFixed(2)}`,
      years: option.years,
    };
  });

  // Find the most popular term (3 years)
  const popularTerm = rows.find((row) => row.years === 3);
  const popularRate = popularTerm ? popularTerm.ourRate : "5.59%";

  return (
    <div className="container mx-auto p-6 mt-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
        <p className="font-rb text-4xl md:text-5xl xl:text-[48px] font-bold leading-7 text-[#000000] mb-6 md:mb-0">
          Our Mortgage Rates
        </p>
        <p className="max-w-md text-[#000000]">
          Before investing in a home, it&apos;s important to find out the
          specifics. Here is an overview of our current mortgage rates that you
          will receive:
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="grid md:grid-cols-6 gap-8 items-center">
          <label
            htmlFor="location"
            className="block text-[#000000] font-medium mb-2 text-[18px] col-span-2 md:col-span-1"
          >
            Location:
          </label>
          <div>
            <label className="block font-medium text-gray-700 mb-2">*Only Applicable for BC</label>
          </div>
        </div>
        <div className="grid md:grid-cols-8 items-center gap-8">
          <label
            htmlFor="mortgage-size"
            className="block text-[#000000] font-medium mb-2 text-[18px] col-span-3 md:col-span-2"
          >
            Mortgage size:
          </label>
          <div className="col-span-5 md:col-span-6">
            <input
              type="text"
              id="mortgage-size"
              className="w-full p-3 border border-[#808080] rounded bg-white text-[#000000] mb-2 focus:outline-none focus:ring-0 focus:border-transparent"
              value={`${mortgageSize.toLocaleString()}`}
              readOnly
            />
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={mortgageSize}
              onChange={handleSliderChange}
              className="w-full h-1 bg-[#f3f3f3] rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-0 focus:border-transparent border-black range-slider"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex border-b border-[#808080]">
          <button
            className={cn(
              "flex-1 py-3 text-center font-medium",
              activeTab === "fixed"
                ? "text-[#11143a] border-b-2 border-[#11143a]"
                : "text-[#808080]"
            )}
            onClick={() => setActiveTab("fixed")}
          >
            Fixed
          </button>
          <button
            className={cn(
              "flex-1 py-3 text-center font-medium",
              activeTab === "variable"
                ? "text-[#11143a] border-b-2 border-[#11143a]"
                : "text-[#808080]"
            )}
            onClick={() => setActiveTab("variable")}
          >
            Variable
          </button>
        </div>
      </div>

      <div className="bg-[#ebedff] rounded-t-lg p-6 mb-0">
        <div className="text-center mb-2">
          <div className="text-sm font-medium text-[#11143a]">
            3 Years Fixed Form
          </div>
          <div className="flex items-center justify-center">
            <p className="text-6xl font-bold text-[#11143a] font-hlv">
              {popularRate}
            </p>
            <span className="ml-2 px-2 py-1 bg-white text-[#11143a] text-xs font-medium rounded">
              *Most Popular
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white">
              <th className="p-4 text-left font-medium text-[#11143a] w-12"></th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Terms
              </th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Bank Rates
              </th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Monthly Payment
              </th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Our Rates
              </th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Monthly Payment
              </th>
              <th className="p-4 text-left font-medium text-[#11143a]">
                Saving
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <>
                <tr
                  key={index}
                  className={cn(
                    "cursor-pointer hover:bg-[#f3f3f3]",
                    index === expandedRow
                      ? "bg-[#ebedff]"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-[#f3f3f3]"
                  )}
                  onClick={() => toggleRow(index)}
                >
                  <td className="p-4 text-center">
                    {index === expandedRow ? (
                      <Minus className="mx-auto" size={16} />
                    ) : (
                      <Plus className="mx-auto" size={16} />
                    )}
                  </td>
                  <td className="p-4">{row.term}</td>
                  <td className="p-4">{row.bankRate}</td>
                  <td className="p-4">{row.bankPayment}</td>
                  <td className="p-4">{row.ourRate}</td>
                  <td className="p-4">{row.ourPayment}</td>
                  <td className="p-4">{row.saving}</td>
                </tr>
                {index === expandedRow && (
                  <tr className="bg-[#ebedff]">
                    <td colSpan={7} className="p-6">
                      <div className="mb-4">
                        <p className="text-[#11143a] mb-4">
                          This great rate is available for High Ratio purchases
                          and Switches only. Offers 20% lump sum payments per
                          year, including the ability to increase your payments
                          by up to 20%! It&apos;s a full-frills mortgage with a
                          rate that can be held for up to 120 days.
                        </p>
                        <button
                          onClick={() => router.push("/apply-now")}
                          className="bg-[#eced79] text-[#11143a] font-medium py-3 px-6 rounded w-full md:w-auto"
                        >
                          Get Your Best Rate
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-sm text-[#808080]">
        <p className="mb-2">
          <span className="font-medium">Please Note:</span> Some conditions may
          apply. Rates may vary from Province to Province. Rates subject to
          change without notice. Posted rates may be high ratio and/or quick
          close which can differ from conventional rates. *O.A.C. & E.O
        </p>
        <p className="text-right">Last Update: 25 March 2025</p>
      </div>
    </div>
  );
}