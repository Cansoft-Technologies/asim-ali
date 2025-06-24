"use client";

import { useState, useMemo } from "react";
import { Slider } from "components/ui/slider";
import { Plus, Minus } from "lucide-react";
import { Button } from "components/ui/button";
import Link from "next/link";

export default function MortgageRatesSection({ ratesSection }: { ratesSection?: any }) {
  const [rateType, setRateType] = useState<"fixed" | "variable">("fixed");
  const [sliderValue, setSliderValue] = useState([0]);
  const [expandedRow, setExpandedRow] = useState<number | null>(2);

  // Calculate mortgage amount based on slider value (0-100)
  const mortgageAmount = useMemo(() => {
    return 100000 + sliderValue[0] * 9000; // Range from $100k to $1M
  }, [sliderValue]);

  const formattedMortgageSize = useMemo(() => {
    return `$${mortgageAmount.toLocaleString()}`;
  }, [mortgageAmount]);

  const handleSliderChange = (value: number[]) => {
    setSliderValue(value);
  };

  const toggleRow = (index: number) => {
    if (expandedRow === index) {
      setExpandedRow(null);
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
  const termOptions = useMemo(() => [
    {
      term: "6 Months",
      bankRate: 7.89,
      ourRate: 7.49,
      years: 0.5,
      description:
        "Our 6-month mortgage plan will give you a short-term rate of 5.99%. If you only need a loan for a little while or expect better rates soon, then go for this one. You’ll pay $639.21 and can save $116.99 more. Here, you’ll get a 1.90% lower interest rate than the bank.",
    },
    {
      term: "1 Year",
      bankRate: 7.39,
      ourRate: 5.24,
      years: 1,
      description:
        "Choose our 1-year plan if you want a low rate without committing long-term. Our rate is 5.29%, and your monthly payment will be $598.22 for every $100,000. Basically, that’s $50.53 less than what banks charge.",
    },
    {
      term: "2 Years",
      bankRate: 6.99,
      ourRate: 5.09,
      years: 2,
      description:
        "You get a steady rate of 4.69% with our 2-year mortgage. You’ll pay 0.75% less interest than banks and save $42.82 over what they offer. With this, you will have some stability and can move or refinance within two years.",
    },
    {
      term: "3 Years",
      bankRate: 5.99,
      ourRate: 4.24,
      years: 3,
      description:
        "Get a 4.24% rate with our 3-year plan. Compared to average bank rates, you will save $539.11 and pay $539.11 for every $100,000 borrowed. This one is a great choice if you're looking for low payments and solid savings over three years.",
    },
    {
      term: "4 Years",
      bankRate: 5.74,
      ourRate: 4.34,
      years: 4,
      description:
        "Go with our 4-year plan and lock in a great rate of 4.34%. Your payment will be $544.61, and you will be saving $95.79 compared to bank rates. You will have four years of peace of mind and reliable payments.",
    },
    {
      term: "5 Years",
      bankRate: 5.49,
      ourRate: 3.99,
      years: 5,
      description:
        "Our 5-year plan is one of the most popular ones. You’ll get a 4.29% rate, pay 0.27% less in interest than the bank rate, and save $14.95 every month.",
    },
    {
      term: "6 Years",
      bankRate: 7.1,
      ourRate: 5.35,
      years: 6,
      description:
        "You will get a 5.35 % rate with our 6-year plan. With this, you will pay $601.69 monthly and save $25.28 each month. So, if you want 1.75% less than any average bank rates, then this plan is right for you.",
    },
  ], []);

  // Calculate table data dynamically
const tableData = useMemo(() => {
  const baseAmount = 100000;
  return termOptions.map((option) => {
    // Extract monthly payment per $100k from description (e.g. "$598.22")
    const matchOur = option.description.match(/\$\d{2,3}\.\d{2}/g);
    const matchBank = option.description.match(/save \$([\d\.]+)/i);

    const ourMonthlyPer100k = matchOur?.[0]
      ? parseFloat(matchOur[0].replace("$", ""))
      : calculateMortgagePayment(baseAmount, option.ourRate, option.years);

    const bankMonthlyPer100k = matchBank?.[1]
      ? ourMonthlyPer100k + parseFloat(matchBank[1])
      : calculateMortgagePayment(baseAmount, option.bankRate, option.years);

    const scale = mortgageAmount / baseAmount;

    const ourPayment = ourMonthlyPer100k * scale;
    const bankPayment = bankMonthlyPer100k * scale;
    const saving = bankPayment - ourPayment;

    return {
      term: option.term,
      bankRate: `${option.bankRate.toFixed(2)} %`,
      bankPayment: `$${bankPayment.toFixed(2)}`,
      ourRate: `${option.ourRate.toFixed(2)} %`,
      ourPayment: `$${ourPayment.toFixed(2)}`,
      saving: `$${saving.toFixed(2)}`,
      years: option.years,
      description: option.description,
    };
  });
}, [mortgageAmount, termOptions]);


  // Find the most popular term (3 years)
  const popularTerm = tableData.find((row) => row.term === "3 Years");
  const popularRate = popularTerm ? popularTerm.ourRate : "4.24%";

  return (
    <section className="w-full bg-[#f8f5f0] py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <div>
            <p className="text-3xl md:text-5xl font-bold leading-7 font-oswald">
              {              ratesSection?.title || "Our Mortgage Rates"}
            </p>
          </div>

          <div className="max-w-xl">
            <p className="text-gray-600" dangerouslySetInnerHTML={{__html: ratesSection?.description || `Before investing in a home, it&apos;s important to find out the
              specifics. Here is an overview of our current mortgage rates that you will receive:`}}></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              *Only Applicable for BC
            </label>
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Mortgage size:
            </label>
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
              rateType === "variable"
                ? "border-b-2 border-black"
                : "text-gray-500"
            }`}
            onClick={() => setRateType("variable")}
          >
            Variable
          </button>
        </div>

        {/* Rate Display */}
        {/* Summary Section */}
        {rateType === "fixed" ? (
          <div className="bg-gray-200 p-6 mb-0 text-center relative">
            <p className="text-sm text-[#F0b254] mb-1">3 Years Fixed</p>
            <div className="flex items-center justify-center">
              <p className="text-6xl font-bold text-[#0a1e3b]">{popularRate || "4.24%"}</p>
              <span className="ml-2 px-2 py-1 bg-transparent text-[#0a1e3b] text-xs font-medium">*Most Popular</span>
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 p-6 text-center">
            <p className="text-3xl font-bold text-[#0a1e3b]">Current Variable Rate: <span className="text-[#F0b254]">4.30%</span></p>
            <p className="text-3xl font-bold text-[#0a1e3b]">Current Prime Rate: <span className="text-[#F0b254]">4.95 %</span></p>
          </div>
        )}

        {/* Rate Table */}
        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white">
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Terms
                </th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Bank Rates
                </th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Monthly Payment
                </th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Our Rates
                </th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Monthly Payment
                </th>
                <th className="p-4 text-left font-medium text-[#0a1e3b]">
                  Saving
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <>
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-100 ${
                      index === expandedRow
                        ? "bg-[#fff9f0]"
                        : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50"
                    }`}
                    onClick={() => toggleRow(index)}
                  >
                    <td className="p-4 flex items-center">
                      {index === expandedRow ? (
                        <Minus className="mr-2 h-4 w-4" />
                      ) : (
                        <Plus className="mr-2 h-4 w-4" />
                      )}
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
                              {tableData[index].description}
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
            <span className="font-medium">Please Note:</span> Some conditions
            may apply. Rates may vary from Province to Province. Rates subject
            to change without notice. Posted rates may be high ratio and/or
            quick close which can differ from conventional rates. *O.A.C. & E.O
          </p>
          <p>Last Update: 25 March 2025</p>
        </div>
      </div>
    </section>
  );
}
