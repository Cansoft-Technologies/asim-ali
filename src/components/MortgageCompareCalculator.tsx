// components/MortgageCompareCalculator.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type MortgageInput = {
  loanAmount: number;
  interestRate: number;
  amortization: number;
  loanTerm: number;
  paymentType: number;
  fees: number;
};

type MortgageResult = {
  equivalentMonthlyPayment: number;
  apr: number;
  balloonPayment: number;
  totalPayments: number;
  totalInterest: number;
};

export default function MortgageCompareCalculator() {
  // Default values
  const [mortgages, setMortgages] = useState<MortgageInput[]>([
    { loanAmount: 100000, interestRate: 6, amortization: 15, loanTerm: 5, paymentType: 5, fees: 0 },
    { loanAmount: 100000, interestRate: 6.5, amortization: 20, loanTerm: 5, paymentType: 5, fees: 0 },
    { loanAmount: 100000, interestRate: 6.5, amortization: 25, loanTerm: 5, paymentType: 5, fees: 0 }
  ]);

  const [results, setResults] = useState<MortgageResult[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [activeMortgage, setActiveMortgage] = useState(0);

  // Payment type options
  const paymentTypes = [
    { value: 0, label: 'Weekly' },
    { value: 1, label: 'Accelerated weekly' },
    { value: 2, label: 'Accelerated bi-weekly' },
    { value: 3, label: 'Bi-weekly' },
    { value: 4, label: 'Semi-monthly' },
    { value: 5, label: 'Monthly' }
  ];

  // Amortization options
  const amortizationOptions = Array.from({ length: 40 }, (_, i) => i + 1);

  // Calculate mortgage results
  const calculateMortgages = () => {
    const newResults: MortgageResult[] = [];
    
    mortgages.forEach(mortgage => {
      const { loanAmount, interestRate, amortization, loanTerm, paymentType, fees } = mortgage;
      
      // Monthly interest rate
      const monthlyRate = interestRate / 100 / 12;
      
      // Number of payments
      const payments = amortization * 12;
      
      // Monthly payment calculation
      let monthlyPayment = 0;
      if (monthlyRate > 0) {
        monthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, payments) / 
                         (Math.pow(1 + monthlyRate, payments) - 1);
      } else {
        monthlyPayment = loanAmount / payments;
      }
      
      // Adjust for payment type
      let equivalentMonthlyPayment = monthlyPayment;
      if (paymentType === 0 || paymentType === 1) { // Weekly
        equivalentMonthlyPayment = monthlyPayment * 12 / 52;
      } else if (paymentType === 2 || paymentType === 3) { // Bi-weekly
        equivalentMonthlyPayment = monthlyPayment * 12 / 26;
      } else if (paymentType === 4) { // Semi-monthly
        equivalentMonthlyPayment = monthlyPayment;
      }
      
      // APR calculation (simplified)
      const apr = (Math.pow(1 + (interestRate / 100) / 2, 2) - 1) * 100;
      
      // Balloon payment calculation
      const remainingPayments = (amortization - loanTerm) * 12;
      let balloonPayment = 0;
      if (remainingPayments > 0) {
        balloonPayment = loanAmount * Math.pow(1 + monthlyRate, loanTerm * 12) - 
                         monthlyPayment * (Math.pow(1 + monthlyRate, loanTerm * 12) - 1) / monthlyRate;
      }
      
      // Total payments and interest
      const totalPayments = monthlyPayment * loanTerm * 12 + balloonPayment;
      const totalInterest = totalPayments - loanAmount;
      
      newResults.push({
        equivalentMonthlyPayment,
        apr,
        balloonPayment,
        totalPayments,
        totalInterest
      });
    });
    
    setResults(newResults);
    
    // Prepare chart data
    const newChartData = newResults.map((result, index) => ({
      name: `Mortgage ${index + 1}`,
      payment: Math.round(result.equivalentMonthlyPayment),
    }));
    
    setChartData(newChartData);
  };

  // Initialize calculations
  useEffect(() => {
    calculateMortgages();
  }, []);

  // Handle input changes
  const handleInputChange = (index: number, field: keyof MortgageInput, value: any) => {
    const newMortgages = [...mortgages];
    newMortgages[index] = { ...newMortgages[index], [field]: value };
    setMortgages(newMortgages);
  };

  // Toggle report view
  const toggleReport = () => {
    setShowReport(!showReport);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mortgage Compare Calculator</CardTitle>
          <p className="text-center text-gray-600 mt-2">
            Compare different mortgage options to find the best value. Analyze monthly payments, 
            APR, and total costs to make an informed decision.
          </p>
        </CardHeader>
      </Card>

      <div className="mb-6">
        <Accordion type="single" collapsible value={`item-${activeMortgage}`} 
                   onValueChange={(value) => setActiveMortgage(parseInt(value.split('-')[1]))}>
          {mortgages.map((mortgage, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="bg-gray-100 px-4 py-3 hover:no-underline">
                <div className="flex justify-between w-full pr-4">
                  <h3 className="font-semibold">Mortgage {index + 1}</h3>
                  <div>
                    {results[index] && (
                      <span className="font-bold">${results[index].equivalentMonthlyPayment.toFixed(2)} monthly</span>
                    )}
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Mortgage Amount ($)</Label>
                    <Input
                      type="number"
                      value={mortgage.loanAmount}
                      onChange={(e) => handleInputChange(index, 'loanAmount', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label>Interest Rate (%)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={mortgage.interestRate}
                      onChange={(e) => handleInputChange(index, 'interestRate', Number(e.target.value))}
                    />
                  </div>
                  
                  <div>
                    <Label>Mortgage Amortization (Years)</Label>
                    <Select
                      value={mortgage.amortization.toString()}
                      onValueChange={(value) => handleInputChange(index, 'amortization', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {amortizationOptions.map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year} {year === 1 ? 'year' : 'years'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Mortgage Term (Years)</Label>
                    <Select
                      value={mortgage.loanTerm.toString()}
                      onValueChange={(value) => handleInputChange(index, 'loanTerm', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select years" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {amortizationOptions.map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year} {year === 1 ? 'year' : 'years'}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Payment Type</Label>
                    <Select
                      value={mortgage.paymentType.toString()}
                      onValueChange={(value) => handleInputChange(index, 'paymentType', Number(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment type" />
                      </SelectTrigger>
                      <SelectContent>
                        {paymentTypes.map(type => (
                          <SelectItem key={type.value} value={type.value.toString()}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Fees ($)</Label>
                    <Input
                      type="number"
                      value={mortgage.fees}
                      onChange={(e) => handleInputChange(index, 'fees', Number(e.target.value))}
                    />
                  </div>
                </div>
                
                {results[index] && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <Label>Equivalent Monthly Payment</Label>
                      <p className="text-xl font-bold">${results[index].equivalentMonthlyPayment.toFixed(2)}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded">
                      <Label>APR</Label>
                      <p className="text-xl font-bold">{results[index].apr.toFixed(3)}%</p>
                    </div>
                  </div>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <Button onClick={calculateMortgages} className="bg-blue-600 hover:bg-blue-700">
          Calculate
        </Button>
        <Button onClick={toggleReport} variant="outline">
          {showReport ? 'Hide Report' : 'View Report'}
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Equivalent Monthly Payments</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}`, 'Monthly Payment']} />
              <Legend />
              <Bar dataKey="payment" fill="#3b82f6" name="Monthly Payment" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {showReport && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Mortgage Comparison Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                    {mortgages.map((_, index) => (
                      <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Mortgage {index + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Mortgage Amount</td>
                    {mortgages.map((mortgage, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${mortgage.loanAmount.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Interest Rate</td>
                    {mortgages.map((mortgage, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mortgage.interestRate}%
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amortization</td>
                    {mortgages.map((mortgage, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mortgage.amortization} years
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Term</td>
                    {mortgages.map((mortgage, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {mortgage.loanTerm} years
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Fees</td>
                    {mortgages.map((mortgage, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${mortgage.fees.toLocaleString()}
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Equivalent Monthly Payment</td>
                    {results.map((result, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${result.equivalentMonthlyPayment.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">APR</td>
                    {results.map((result, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {result.apr.toFixed(3)}%
                      </td>
                    ))}
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Total Interest</td>
                    {results.map((result, index) => (
                      <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="p-4 text-sm italic">
          <p className="font-semibold">Disclaimer:</p>
          <p className="mt-1">
            The tools and features on this website provide estimates and perform calculations for illustrative purposes only. 
            They rely on various assumptions that may not account for every individual situation. For accurate and personalized 
            guidance, we recommend consulting with a qualified mortgage expert.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}