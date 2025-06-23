"use client"

import { useState } from "react"
import {
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "components/ui/select"

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  years: number
): number {
  const monthlyRate = annualRate / 100 / 12
  const numberOfPayments = years * 12
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
  )
}

export default function HistoricalMortgageRates() {
  const [expandedFixedYear, setExpandedFixedYear] = useState<string>("2022")
  const [expandedVariableYear, setExpandedVariableYear] = useState<string>("2022")
  const [selectedTerm, setSelectedTerm] = useState("5-year")

  const selectedTermYears = parseInt(selectedTerm.split("-")[0])

  const toggleFixedYear = (year: string) =>
    setExpandedFixedYear(expandedFixedYear === year ? "" : year)

  const toggleVariableYear = (year: string) =>
    setExpandedVariableYear(expandedVariableYear === year ? "" : year)

 const fixedRateData = [
    {
      year: "2025",
      average: "4.06 %",
      lowest: "5.64 %",
      highest: "5.64 %",
      months: [],
    },
    {
      year: "2024",
      average: "4.24%",
      lowest: "5.69%",
      highest: "5.69%",
      months: [],
    },
    {
      year: "2023",
      average: "4.04%",
      lowest: "5.69%",
      highest: "5.69%",
      months: [],
    },
    {
      year: "2022",
      average: "3.89%",
      lowest: "5.54%",
      highest: "5.54%",
      months: [
        { month: "January", lowest: "4.69%", highest: "5.82%" },
        { month: "February", lowest: "4.92%", highest: "5.74%" },
        { month: "March", lowest: "5.01%", highest: "5.70%" },
      ],
    },
    {
      year: "2021",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2020",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
  ]

  const variableRateData = [
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2022",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [
        { month: "January", lowest: "4.06 %", highest: "5.97%" },
        { month: "February", lowest: "4.06 %", highest: "5.97%" },
        { month: "March", lowest: "4.06 %", highest: "5.97%" },
      ],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
    {
      year: "2024",
      average: "7.89 %",
      lowest: "7.89 %",
      highest: "7.89 %",
      months: [],
    },
  ]
  return (
    <section className="w-full bg-[#fcf9f3] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="!text-xl md:!text-2xl lg:!text-4xl !font-semibold mb-2">
              Historical Mortgage Rates
            </h2>
            <p className="text-gray-600">
              For British Columbia - Last Updated Apr 01 2025
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <span className="font-medium">Terms:</span>
              <Select defaultValue="5-year" onValueChange={setSelectedTerm}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="5 Year Mortgage" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1-year">1 Year Mortgage</SelectItem>
                  <SelectItem value="2-year">2 Year Mortgage</SelectItem>
                  <SelectItem value="3-year">3 Year Mortgage</SelectItem>
                  <SelectItem value="5-year">5 Year Mortgage</SelectItem>
                  <SelectItem value="10-year">10 Year Mortgage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fixed Rate Panel */}
          <div className="border border-gray-200">
            <div className="p-6 text-center">
              <p className="text-4xl font-bold font-oswald text-[#0a1e3b] mb-2">
                {selectedTerm.split("-")[0]} Year Fixed Rate
              </p>
              <p className="text-xl">Historical Performance</p>
            </div>

            <div className="border-t border-gray-200 h-full">
              <div className="grid grid-cols-4 bg-gray-50 p-4">
                <div className="font-medium">Year (Avg)</div>
                <div className="font-medium">Lowest</div>
                <div className="font-medium">Highest</div>
                <div className="font-medium">Est. Payment</div>
              </div>

              {fixedRateData.map((yearData) => {
                const avgRate = parseFloat(yearData.average.replace("%", ""))
                const monthly = calculateMonthlyPayment(
                  100000,
                  avgRate,
                  selectedTermYears
                )

                return (
                  <div key={`fixed-${yearData.year}`}>
                    <div
                      className="grid grid-cols-4 border-t border-gray-200 p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleFixedYear(yearData.year)}
                    >
                      <div className="flex items-center">
                        {expandedFixedYear === yearData.year ? (
                          <ChevronUp className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        )}
                        {yearData.year} Avg ({yearData.average})
                      </div>
                      <div>{yearData.lowest}</div>
                      <div>{yearData.highest}</div>
                      <div>${monthly.toFixed(2)}</div>
                    </div>

                    {expandedFixedYear === yearData.year &&
                      yearData.months.length > 0 && (
                        <div className="bg-gray-50">
                          {yearData.months.map((monthData) => (
                            <div
                              key={`fixed-${yearData.year}-${monthData.month}`}
                              className="grid grid-cols-4 border-t border-gray-200 p-4"
                            >
                              <div className="pl-6">{monthData.month}</div>
                              <div>{monthData.lowest}</div>
                              <div>{monthData.highest}</div>
                              <div></div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Variable Rate Panel */}
          <div className="border border-gray-200 bg-[#f1f1f1]">
            <div className="p-6 text-center">
              <p className="text-4xl font-bold text-[#F0B254] mb-2 font-oswald">
                {selectedTerm.split("-")[0]} Year Variable Rate
              </p>
              <p className="text-xl">Historical Performance</p>
            </div>

            <div className="border-t border-gray-200">
              <div className="grid grid-cols-4 bg-[#f1f1f1] p-4">
                <div className="font-medium">Year (Avg)</div>
                <div className="font-medium">Lowest</div>
                <div className="font-medium">Highest</div>
                <div className="font-medium">Est. Payment</div>
              </div>

              {variableRateData.map((yearData) => {
                const avgRate = parseFloat(yearData.average.replace("%", ""))
                const monthly = calculateMonthlyPayment(
                  100000,
                  avgRate,
                  selectedTermYears
                )

                return (
                  <div key={`variable-${yearData.year}`}>
                    <div
                      className="grid grid-cols-4 border-t border-gray-200 p-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleVariableYear(yearData.year)}
                    >
                      <div className="flex items-center">
                        {expandedVariableYear === yearData.year ? (
                          <ChevronUp className="h-4 w-4 mr-2" />
                        ) : (
                          <ChevronDown className="h-4 w-4 mr-2" />
                        )}
                        {yearData.year} Avg ({yearData.average})
                      </div>
                      <div>{yearData.lowest}</div>
                      <div>{yearData.highest}</div>
                      <div>${monthly.toFixed(2)}</div>
                    </div>

                    {expandedVariableYear === yearData.year &&
                      yearData.months.length > 0 && (
                        <div className="bg-gray-100">
                          {yearData.months.map((monthData) => (
                            <div
                              key={`variable-${yearData.year}-${monthData.month}`}
                              className="grid grid-cols-4 border-t border-gray-200 p-4"
                            >
                              <div className="pl-6">{monthData.month}</div>
                              <div>{monthData.lowest}</div>
                              <div>{monthData.highest}</div>
                              <div></div>
                            </div>
                          ))}
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
