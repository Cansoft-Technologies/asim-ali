"use client"

import { useState, useMemo } from "react"
import { Slider } from "components/ui/slider"
import { Plus, Minus } from "lucide-react"
import { Button } from "components/ui/button"
import Link from "next/link"

export default function MortgageRatesSection() {
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed")
  const [sliderValue, setSliderValue] = useState([50])
  const [expandedRow, setExpandedRow] = useState<number | null>(2)
  
  // Calculate mortgage amount based on slider value (0-100)
  const mortgageAmount = useMemo(() => {
    return 100000 + sliderValue[0] * 9000 // Range from $100k to $1M
  }, [sliderValue])
  
  const formattedMortgageSize = useMemo(() => {
    return `$${mortgageAmount.toLocaleString()}`
  }, [mortgageAmount])

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
  }

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null)
    } else {
      setExpandedRow(index)
    }
  }

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
    { term: "1 Year", bankRate: 7.39, ourRate: 5.24, years: 1 },
    { term: "2 Years", bankRate: 6.99, ourRate: 5.09, years: 2 },
    { term: "3 Years", bankRate: 5.99, ourRate: 4.24, years: 3 },
    { term: "4 Years", bankRate: 5.74, ourRate: 4.34, years: 4 },
    { term: "5 Years", bankRate: 5.49, ourRate: 3.99, years: 5 },
    { term: "6 Years", bankRate: 7.10, ourRate: 5.35, years: 6 },
  ];

  // Calculate table data dynamically
  const tableData = useMemo(() => {
    return termOptions.map((option) => {
      const bankPayment = calculateMortgagePayment(
        mortgageAmount,
        option.bankRate,
        option.years
      );
      const ourPayment = calculateMortgagePayment(
        mortgageAmount,
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
  }, [mortgageAmount]);

  // Find the most popular term (3 years)
  const popularTerm = tableData.find((row) => row.term === "3 Years");
  const popularRate = popularTerm ? popularTerm.ourRate : "4.24%";

  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div>
            <p className="!text-3xl md:!text-5xl font-bold leading-7 font-oswald">Our Mortgage Rates</p>
          </div>

          <div className="max-w-xl">
            <p className="text-gray-600">
              Before investing in a home, it&apos;s important to find out the specifics. Here is an overview of our current
              mortgage rates that you will receive:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-medium text-gray-700 mb-2">*Only Applicable for BC</label>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Mortgage size:</label>
            <input
              type="text"
              value={formattedMortgageSize}
              readOnly
              className="block w-full border border-gray-300 py-2 px-3 text-base focus:outline-none bg-white mb-2"
            />
            <div className="px-2">
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={sliderValue}
                onValueChange={handleSliderChange}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Fixed/Variable Toggle */}
        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`flex-1 text-center py-3 font-medium ${
              rateType === "fixed" ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setRateType("fixed")}
          >
            Fixed
          </button>
          <button
            className={`flex-1 text-center py-3 font-medium ${
              rateType === "variable" ? "border-b-2 border-black" : "text-gray-500"
            }`}
            onClick={() => setRateType("variable")}
          >
            Variable
          </button>
        </div>

        {/* Rate Display */}
        <div className="bg-gray-200 p-6 mb-0 text-center relative">
          <div className="text-sm text-gray-600 mb-1"><p className=" text-[#F0b254]">3 Years Fixed Form</p></div>
          <div className="flex items-center justify-center">
            <p className="text-6xl font-bold text-[#0a1e3b]">{popularRate}</p>
            <span className="ml-2 px-2 py-1 bg-transparent text-[#0a1e3b] text-xs font-medium">*Most Popular</span>
          </div>
        </div>

        {/* Rate Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Terms</th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Bank Rates</th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Monthly Payment</th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Our Rates</th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Monthly Payment</th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">Saving</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <>
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      index === expandedRow ? "bg-[#fff9f0]" : index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                    onClick={() => toggleRow(index)}
                  >
                    <td className="p-4 flex items-center">
                      {index === expandedRow ? <Minus className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                      {row.term}
                    </td>
                    <td className="p-4">{row.bankRate}</td>
                    <td className="p-4">{row.bankPayment}</td>
                    <td className="p-4">{row.ourRate}</td>
                    <td className="p-4">{row.ourPayment}</td>
                    <td className="p-4">{row.saving}</td>
                  </tr>
                  {index === expandedRow && (
                    <tr className="bg-[#fff9f0] container mx-auto">
                      <td colSpan={6} className="p-6">
                        <Link href="/current-rates" className="block">
                          <div className="mb-4 text-center">
                          <p className="text-gray-700 mb-4">
                            This great rate is available for High Ratio purchases and Switches only. Offers 20% lump sum
                            payments per year, including the ability to increase your payments by up to 20%! It&apos;s a
                            full-frills mortgage with a rate that can be held for up to 120 days.
                          </p>
                          <Button className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-white font-medium py-2 px-6">
                            Get The Best Rates
                          </Button>
                        </div>
                        </Link>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start text-xs text-gray-500">
          <p className="max-w-2xl mb-4 md:mb-0">
            <span className="font-medium">Please Note:</span> Some conditions may apply. Rates may vary from Province to
            Province. Rates subject to change without notice. Posted rates may be high ratio and/or quick close which
            can differ from conventional rates. *O.A.C. & E.O
          </p>
          <p>Last Update: 25 March 2025</p>
        </div>
      </div>
    </section>
  )
}