"use client"

import { useState } from "react"
import { Slider } from "components/ui/slider"
import { Plus, Minus } from "lucide-react"
import { Button } from "components/ui/button"

export default function MortgageRatesSection() {
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed")
  const [sliderValue, setSliderValue] = useState([50])
  const [expandedRow, setExpandedRow] = useState<number | null>(2)
  const [mortgageSize, setMortgageSize] = useState("$100,000")

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    // Calculate mortgage size based on slider value (0-100)
    const amount = 100000 + value[0] * 9000 // Range from $100k to $1M
    setMortgageSize(`$${amount.toLocaleString()}`)
  }

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null)
    } else {
      setExpandedRow(index)
    }
  }

  const tableData = [
    {
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
      saving: "$25.28",
    },
    {
      term: "1 Year",
      bankRate: "7.74 %",
      bankPayment: "$746.69",
      ourRate: "5.24 %",
      ourPayment: "$595.34",
      saving: "$25.28",
    },
    {
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
      saving: "$25.28",
    },
    {
      term: "2 Years",
      bankRate: "7.34 %",
      bankPayment: "$721.53",
      ourRate: "5.09 %",
      ourPayment: "$586.74",
      saving: "$25.28",
    },
    {
      term: "3 Years",
      bankRate: "6.94 %",
      bankPayment: "$696.72",
      ourRate: "4.24 %",
      ourPayment: "$539.11",
      saving: "$25.28",
    },
    {
      term: "4 Years",
      bankRate: "6.74 %",
      bankPayment: "$684.44",
      ourRate: "4.34 %",
      ourPayment: "$544.61",
      saving: "$25.28",
    },
    {
      term: "5 Years",
      bankRate: "6.79 %",
      bankPayment: "$756.21",
      ourRate: "3.99 %",
      ourPayment: "$525.48",
      saving: "$25.28",
    },
    {
      term: "6 Years",
      bankRate: "7.10 %",
      bankPayment: "$715.92",
      ourRate: "5.35 %",
      ourPayment: "$601.69",
      saving: "$25.28",
    },
  ]

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
            <label className="block font-medium text-gray-700 mb-2">Location:</label>
            <div className="relative">
              <select className="block w-full border border-gray-300 py-2 pl-3 pr-10 text-base focus:outline-none bg-white">
                <option>Select Your Province</option>
                <option>British Columbia</option>
                <option>Alberta</option>
                <option>Ontario</option>
                <option>Quebec</option>
                <option>Manitoba</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">Mortgage size:</label>
            <input
              type="text"
              value={mortgageSize}
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
          <div className="text-sm text-gray-600 mb-1">3 Years Fixed Form</div>
          <div className="flex items-center justify-center">
            <p className="text-6xl font-bold text-[#0a1e3b]">4.24%</p>
            <span className="ml-2 px-2 py-1 bg-white text-[#0a1e3b] text-xs font-medium">*Most Popular</span>
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
                        <div className="mb-4 text-center">
                          <p className="text-gray-700 mb-4">
                            This great rate is available for High Ratio purchases and Switches only. Offers 20% lump sum
                            payments per year, including the ability to increase your payments by up to 20%! It&apos;s a
                            full-frills mortgage with a rate that can be held for up to 120 days.
                          </p>
                          <Button className="bg-[#F0B254] hover:bg-[#F0B254]/90 text-black font-medium py-2 px-6">
                            Get The Best Rates
                          </Button>
                        </div>
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
