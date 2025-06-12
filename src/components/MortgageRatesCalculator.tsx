import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card';
import { Input } from 'components/ui/input';
import { Label } from 'components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from 'components/ui/select';
import { Slider } from 'components/ui/slider';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from 'components/ui/accordion';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'components/ui/tooltip';
import { Button } from 'components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

// Types
type PaymentFrequency = 
  | 1   // Annually
  | 2   // Semi-Annually
  | 4   // Quarterly
  | 6   // Bi-Monthly
  | 12  // Monthly
  | 24  // Semi-Monthly
  | 26  // Bi-Weekly
  | 52  // Weekly
  | 126 // Accelerated Bi-weekly
  | 152; // Accelerated Weekly

interface MortgageData {
  mortgageAmount: number;
  paymentFrequency: PaymentFrequency;
  mortgageTerm: number;
  interestRate: number;
  amortizationPeriod: number;
}

interface PaymentDetails {
  paymentAmount: string;
  termPrincipal: string;
  termInterest: string;
  termTotal: string;
  endBalance: string;
}

interface ScheduleItem {
  period: number;
  payment: string;
  principal: string;
  interest: string;
  balance: string;
}

const MortgageCalculator = () => {
  // State
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    mortgageAmount: 100000,
    paymentFrequency: 12,
    mortgageTerm: 5,
    interestRate: 4.64,
    amortizationPeriod: 25
  });

  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({
    paymentAmount: "$0.00",
    termPrincipal: "$0.00",
    termInterest: "$0.00",
    termTotal: "$0.00",
    endBalance: "$0.00"
  });

  const [amortizationSchedule, setAmortizationSchedule] = useState<ScheduleItem[]>([]);
  const [chartData, setChartData] = useState<{ year: number; balance: number }[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<string>('amortization-chart');

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Calculate mortgage
  const calculateMortgage = () => {
    const { mortgageAmount, paymentFrequency, mortgageTerm, interestRate, amortizationPeriod } = mortgageData;
    
    // Calculate payment amount
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortizationPeriod * 12;
    const monthlyPayment = mortgageAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Adjust for payment frequency
    let paymentAmount = monthlyPayment;
    switch (paymentFrequency) {
      case 1: // Annually
        paymentAmount = monthlyPayment * 12;
        break;
      case 2: // Semi-Annually
        paymentAmount = monthlyPayment * 6;
        break;
      case 4: // Quarterly
        paymentAmount = monthlyPayment * 3;
        break;
      case 6: // Bi-Monthly
        paymentAmount = monthlyPayment * 2;
        break;
      case 24: // Semi-Monthly
        paymentAmount = monthlyPayment / 2;
        break;
      case 26: // Bi-Weekly
        paymentAmount = monthlyPayment * 12 / 26;
        break;
      case 52: // Weekly
        paymentAmount = monthlyPayment * 12 / 52;
        break;
      case 126: // Accelerated Bi-weekly
        paymentAmount = monthlyPayment / 2;
        break;
      case 152: // Accelerated Weekly
        paymentAmount = monthlyPayment / 4;
        break;
      default: // Monthly
        break;
    }
    
    // Calculate term details
    const termPayments = mortgageTerm * (paymentFrequency > 100 ? paymentFrequency - 100 : paymentFrequency);
    const monthlyRateForTerm = interestRate / 100 / 12;
    
    let balance = mortgageAmount;
    let termPrincipal = 0;
    let termInterest = 0;
    
    for (let i = 0; i < termPayments; i++) {
      const interest = balance * monthlyRateForTerm;
      const principal = paymentAmount - interest;
      
      termInterest += interest;
      termPrincipal += principal;
      balance -= principal;
    }
    
    // Update payment details
    setPaymentDetails({
      paymentAmount: formatCurrency(paymentAmount),
      termPrincipal: formatCurrency(termPrincipal),
      termInterest: formatCurrency(termInterest),
      termTotal: formatCurrency(termPrincipal + termInterest),
      endBalance: formatCurrency(Math.max(balance, 0))
    });
    
    // Generate amortization schedule
    generateAmortizationSchedule();
    
    // Generate chart data
    generateChartData();
  };

  // Generate amortization schedule
  const generateAmortizationSchedule = () => {
    const { mortgageAmount, paymentFrequency, mortgageTerm, interestRate } = mortgageData;
    
    const termPayments = mortgageTerm * (paymentFrequency > 100 ? paymentFrequency - 100 : paymentFrequency);
    const monthlyRate = interestRate / 100 / 12;
    const paymentAmount = parseFloat(paymentDetails.paymentAmount.replace(/[^0-9.-]+/g, ''));
    
    let balance = mortgageAmount;
    const schedule: ScheduleItem[] = [];
    
    for (let i = 1; i <= termPayments; i++) {
      const interest = balance * monthlyRate;
      const principal = paymentAmount - interest;
      balance -= principal;
      
      schedule.push({
        period: i,
        payment: formatCurrency(paymentAmount),
        principal: formatCurrency(principal),
        interest: formatCurrency(interest),
        balance: formatCurrency(Math.max(balance, 0))
      });
      
      if (balance <= 0) break;
    }
    
    setAmortizationSchedule(schedule);
  };

  // Generate chart data
  const generateChartData = () => {
    const { mortgageAmount, amortizationPeriod, interestRate } = mortgageData;
    
    const monthlyRate = interestRate / 100 / 12;
    const numPayments = amortizationPeriod * 12;
    const monthlyPayment = mortgageAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    let balance = mortgageAmount;
    const data: { year: number; balance: number }[] = [];
    
    // Add initial balance
    data.push({ year: 0, balance });
    
    for (let year = 1; year <= amortizationPeriod; year++) {
      for (let month = 1; month <= 12; month++) {
        const interest = balance * monthlyRate;
        const principal = monthlyPayment - interest;
        balance -= principal;
        
        if (balance <= 0) {
          balance = 0;
          break;
        }
      }
      data.push({ year, balance: Math.max(balance, 0) });
      
      if (balance <= 0) break;
    }
    
    setChartData(data);
  };

  // Handle input changes
  const handleInputChange = (field: keyof MortgageData, value: string | number) => {
    setMortgageData(prev => ({
      ...prev,
      [field]: typeof value === 'string' ? parseFloat(value) || 0 : value
    }));
  };

  // Calculate on data change
  useEffect(() => {
    calculateMortgage();
  }, [mortgageData]);

  return (
    <section className="w-full max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-2xl font-bold">
                Payment Amount Calculator<span className="text-primary">.</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm font-medium">
                  <span className="font-bold">Please Note:</span> All calculations are for informational purposes and are subject to change.
                </p>
              </div>
              
              <h4 className="text-lg font-semibold mb-4">Enter Mortgage Information</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mortgage Amount */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    Mortgage Amount
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>This is the total amount of your mortgage. Remember to subtract your downpayment from the price of the property you intend to purchase. This does not include closing costs like legal fees.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input
                      value={mortgageData.mortgageAmount}
                      onChange={(e) => handleInputChange('mortgageAmount', e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                {/* Payment Frequency */}
                <div className="space-y-2">
                  <Label className="flex items-center">
                    Payment Frequency
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>The choice of making regular mortgage payments every week, every other week, twice a month or monthly.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Select
                    value={mortgageData.paymentFrequency.toString()}
                    onValueChange={(value) => handleInputChange('paymentFrequency', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Annually</SelectItem>
                      <SelectItem value="2">Semi-Annually</SelectItem>
                      <SelectItem value="4">Quarterly</SelectItem>
                      <SelectItem value="6">Bi-Monthly</SelectItem>
                      <SelectItem value="12">Monthly</SelectItem>
                      <SelectItem value="24">Semi-Monthly</SelectItem>
                      <SelectItem value="26">Bi-Weekly</SelectItem>
                      <SelectItem value="52">Weekly</SelectItem>
                      <SelectItem value="126">Accelerated Bi-weekly</SelectItem>
                      <SelectItem value="152">Accelerated Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Mortgage Term */}
                <div className="space-y-2">
                  <Label>Mortgage Term</Label>
                  <Select
                    value={mortgageData.mortgageTerm.toString()}
                    onValueChange={(value) => handleInputChange('mortgageTerm', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">6 Months</SelectItem>
                      <SelectItem value="1">1 Year</SelectItem>
                      <SelectItem value="2">2 Years</SelectItem>
                      <SelectItem value="3">3 Years</SelectItem>
                      <SelectItem value="4">4 Years</SelectItem>
                      <SelectItem value="5">5 Years</SelectItem>
                      <SelectItem value="6">6 Years</SelectItem>
                      <SelectItem value="7">7 Years</SelectItem>
                      <SelectItem value="8">8 Years</SelectItem>
                      <SelectItem value="9">9 Years</SelectItem>
                      <SelectItem value="10">10 Years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Interest Rate */}
                <div className="space-y-2">
                  <Label>Interest Rate</Label>
                  <div className="relative">
                    <Input
                      value={mortgageData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', e.target.value)}
                      type="number"
                      min="0.10"
                      max="10"
                      step="0.01"
                    />
                    <span className="absolute right-3 top-2 text-gray-500">%</span>
                  </div>
                </div>
                
                {/* Amortization Period */}
                <div className="space-y-2 md:col-span-2">
                  <Label className="flex items-center">
                    Amortization Period
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-help">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                          </span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>How long will it take to pay off your mortgage with standard payment? Most people have 25 year mortgages.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </Label>
                  <Slider
                    value={[mortgageData.amortizationPeriod]}
                    onValueChange={(value) => handleInputChange('amortizationPeriod', value[0])}
                    min={1}
                    max={35}
                    step={1}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 year</span>
                    <span>{mortgageData.amortizationPeriod} years</span>
                    <span>35 years</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Additional Options */}
          <Accordion type="single" collapsible value={activeAccordion} onValueChange={setActiveAccordion}>
            <AccordionItem value="amortization-chart">
              <AccordionTrigger className="text-lg font-semibold">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
                  </svg>
                  Amortization Chart
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                      <YAxis 
                        label={{ value: 'Balance ($)', angle: -90, position: 'insideLeft' }}
                        tickFormatter={(value) => `$${value / 1000}k`}
                      />
                      <RechartsTooltip 
                        formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Balance']}
                        labelFormatter={(value) => `Year ${value}`}
                      />
                      <Bar dataKey="balance" fill="#058DC7" name="Mortgage Balance" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="amortization-schedule">
              <AccordionTrigger className="text-lg font-semibold">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm0-2a3 3 0 00-3 3v10a3 3 0 003 3h10a3 3 0 003-3V5a3 3 0 00-3-3H5z" clipRule="evenodd" />
                  </svg>
                  Amortization Schedule
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead>Payment</TableHead>
                        <TableHead>Principal</TableHead>
                        <TableHead>Interest</TableHead>
                        <TableHead>Balance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {amortizationSchedule.map((item, index) => (
                        <TableRow key={index} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                          <TableCell>{item.period}</TableCell>
                          <TableCell>{item.payment}</TableCell>
                          <TableCell>{item.principal}</TableCell>
                          <TableCell>{item.interest}</TableCell>
                          <TableCell>{item.balance}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="apply-prepayments">
              <AccordionTrigger className="text-lg font-semibold">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  Apply Prepayments
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select prepayment type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lump-sum">Lump Sum Payment (Annually)</SelectItem>
                        <SelectItem value="payment-increase">Mortgage Payment Increase (Each Payment)</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <div className="relative">
                      <span className="absolute left-3 top-2 text-gray-500">$</span>
                      <Input className="pl-8" placeholder="Prepayment Amount" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="mb-2">
                      By making prepayments, the amount of time it will take to pay off your mortgage has been reduced by 
                      <span className="font-bold text-blue-700"> 2 </span> 
                      Year(s) and <span className="font-bold text-blue-700">3 </span> Month(s).
                    </p>
                    <p>
                      This also represents a savings of 
                      <span className="font-bold text-blue-700"> $23,000 </span> 
                      in interest.
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Period</TableHead>
                          <TableHead>Payment</TableHead>
                          <TableHead>Principal</TableHead>
                          <TableHead>Interest</TableHead>
                          <TableHead>Balance</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            Prepayment schedule will appear here
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        
        {/* Right Column - Results */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-primary">{paymentDetails.paymentAmount}</div>
                  <div className="text-sm text-gray-500">Your Payment is</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Term Principal</span>
                    <span className="font-medium">{paymentDetails.termPrincipal}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Term Interest</span>
                    <span className="font-medium">{paymentDetails.termInterest}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span>Term Interest + Principal</span>
                    <span className="font-medium">{paymentDetails.termTotal}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span>End of Term Balance</span>
                    <span className="font-medium">{paymentDetails.endBalance}</span>
                  </div>
                </div>
                
                <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                  Find an Expert
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default MortgageCalculator;