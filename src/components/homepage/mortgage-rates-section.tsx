"use client"

import { useState } from "react"
import { Slider } from "components/ui/slider"
import { Plus } from "lucide-react"

export default function MortgageRatesSection() {
  const [rateType, setRateType] = useState("fixed")
  const [sliderValue, setSliderValue] = useState([50])
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [mortgageSize, setMortgageSize] = useState("$100,000")

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value)
    // Calculate mortgage size based on slider value (0-100)
    const amount = 100000 + value[0] * 9000 // Range from $100k to $1M
    setMortgageSize(`$${amount.toLocaleString()}`)
  }

  const toggleRow = (index: number) => {
    if (expandedRows.includes(index)) {
      setExpandedRows(expandedRows.filter((i) => i !== index))
    } else {
      setExpandedRows([...expandedRows, index])
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
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
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
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
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
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
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
      term: "6 Months",
      bankRate: "7.89 %",
      bankPayment: "$756.21",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
      saving: "$25.28",
    },
  ]

  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif">Our Mortgage Rates</h2>
          </div>

          <div>
            <p className="text-gray-600">
              Before investing in a home, it&apos;s important to find out the specifics. Here is an overview of our current
              mortgage rates that you will receive:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location:</label>
            <div className="relative">
              <select className="block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-primary focus:outline-none focus:ring-primary bg-white">
                <option>Select Your Province</option>
                <option>British Columbia</option>
                <option>Alberta</option>
                <option>Ontario</option>
                <option>Quebec</option>
                <option>Manitoba</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Mortgage size:</label>
            <div className="mb-2 text-right font-medium">{mortgageSize}</div>
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

        {/* Fixed/Variable Toggle */}
        <div className="grid grid-cols-2 mb-6 border-b border-gray-300">
          <button
            className={`text-center py-3 font-medium ${rateType === "fixed" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setRateType("fixed")}
          >
            Fixed
          </button>
          <button
            className={`text-center py-3 font-medium ${rateType === "variable" ? "border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setRateType("variable")}
          >
            Variable
          </button>
        </div>

        {/* Rate Display */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8 text-center relative">
          <div className="absolute top-3 right-3 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
            *Most Popular
          </div>
          <h3 className="text-sm text-gray-600 mb-2">3 Years Fixed Term</h3>
          <p className="text-5xl font-bold text-[#0a1e3b] mb-2">4.24%</p>
        </div>

        {/* Rate Table */}
        <div className="overflow-x-auto mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="text-left">
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Terms</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Bank Rates</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Payment
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Our Rates</th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monthly Payment
                </th>
                <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Saving</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tableData.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => toggleRow(index)} className="flex items-center text-gray-900">
                      <Plus className="h-4 w-4 mr-2" />
                      {row.term}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bankRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.bankPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.ourRate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.ourPayment}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.saving}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start text-xs text-gray-500">
          <p className="max-w-2xl mb-4 md:mb-0">
            <span className="font-medium">Please Note:</span> Some conditions may apply. Rates may vary from Province to
            Province. Rates subject to change without notice. Posted rates may be high-ratio and/or quick close which
            can differ from conventional rates. *O.A.C. & E.O
          </p>
          <p>Last Update: 25 March 2023</p>
        </div>
      </div>
    </section>
  )
}

