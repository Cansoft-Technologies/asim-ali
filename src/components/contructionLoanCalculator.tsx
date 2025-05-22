
import { useState } from "react";
import { Button } from "components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select";
import { jsPDF } from "jspdf";

type FormState = {
  landCost: string;
  constructionCost: string;
  softCosts: string;
  downPayment: string;
  ltcLimit: number;
  constructionMonths: number;
  interestRateConst: number;
  interestRatePerm: number;
  amortYears: number;
  paymentFrequency: "monthly" | "biweekly";
  scenario2: {
    interestRateConst2: number;
    interestRatePerm2: number;
    amortYears2: number;
    paymentFrequency2: "monthly" | "biweekly";
  };
};

type Results = {
  totalProjectCost: number;
  maxLoanLTC: number;
  constructionInterest1: number;
  monthlyPermPayment1: number;
  permInterest1: number;
  constructionInterest2?: number;
  monthlyPermPayment2?: number;
  permInterest2?: number;
};

export default function ConstructionLoanCalculator() {
  const [form, setForm] = useState<FormState>({
    landCost: "",
    constructionCost: "",
    softCosts: "",
    downPayment: "",
    ltcLimit: 80,
    constructionMonths: 9,
    interestRateConst: 6.5,
    interestRatePerm: 5.0,
    amortYears: 25,
    paymentFrequency: "monthly",
    scenario2: {
      interestRateConst2: 7.0,
      interestRatePerm2: 5.25,
      amortYears2: 25,
      paymentFrequency2: "monthly",
    },
  });

  const [results, setResults] = useState<Results>({
    totalProjectCost: 0,
    maxLoanLTC: 0,
    constructionInterest1: 0,
    monthlyPermPayment1: 0,
    permInterest1: 0,
  });

  const [showScenario2, setShowScenario2] = useState(false);
  const [loanMessage, setLoanMessage] = useState("");

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-CA", { maximumFractionDigits: 0 }).format(num);

  const parseNumber = (str: string) => parseFloat(str.replace(/,/g, "")) || 0;

  const handleNumberBlur = (e: React.FocusEvent<HTMLInputElement>, field: keyof FormState) => {
    const value = parseNumber(e.target.value);
    setForm(prev => ({
      ...prev,
      [field]: isNaN(value) ? "" : formatNumber(value),
    }));
  };

  const calculateProjectLoan = () => {
    const landVal = parseNumber(form.landCost);
    const constVal = parseNumber(form.constructionCost);
    const softVal = parseNumber(form.softCosts);
    const downVal = parseNumber(form.downPayment);
    const ltcVal = form.ltcLimit;

    const totalProjectCost = landVal + constVal + softVal;
    const maxLoan = totalProjectCost * (ltcVal / 100);
    const neededLoan = totalProjectCost - downVal;
    const finalLoan = Math.min(neededLoan, maxLoan);

    setLoanMessage(
      finalLoan <= 0 ? "Based on your down payment or LTC limit, no loan is needed or possible at this ratio." : ""
    );

    setResults(prev => ({
      ...prev,
      totalProjectCost,
      maxLoanLTC: Math.max(finalLoan, 0),
    }));
  };

  const computeConstructionInterest = (loanAmount: number, constRate: number, months: number) => {
    const monthlyRate = constRate / 100 / 12;
    return loanAmount * 0.5 * monthlyRate * months;
  };

  const amortPayment = (principal: number, rate: number, years: number, freq: "monthly" | "biweekly") => {
    const monthlyRate = rate / 100 / 12;
    const periods = freq === "biweekly" ? years * 26 : years * 12;
    const ratePerPeriod = freq === "biweekly" ? Math.pow(1 + monthlyRate, 12 / 26) - 1 : monthlyRate;
    
    if (ratePerPeriod <= 0 || periods <= 0) return 0;
    const factor = Math.pow(1 + ratePerPeriod, periods);
    return (principal * ratePerPeriod * factor) / (factor - 1);
  };

  const calculateFullLoan = () => {
    const { maxLoanLTC } = results;
    const { constructionMonths, interestRateConst, interestRatePerm, amortYears, paymentFrequency } = form;

    const cInterest = computeConstructionInterest(maxLoanLTC, interestRateConst, constructionMonths);
    const permPayment = amortPayment(maxLoanLTC, interestRatePerm, amortYears, paymentFrequency);
    const periods = paymentFrequency === "biweekly" ? amortYears * 26 : amortYears * 12;
    const permInterest = permPayment * periods - maxLoanLTC;

    const newResults: Results = {
      ...results,
      constructionInterest1: cInterest,
      monthlyPermPayment1: permPayment,
      permInterest1: permInterest,
    };

    if (showScenario2) {
      const cInt2 = computeConstructionInterest(maxLoanLTC, form.scenario2.interestRateConst2, constructionMonths);
      const permPay2 = amortPayment(
        maxLoanLTC,
        form.scenario2.interestRatePerm2,
        form.scenario2.amortYears2,
        form.scenario2.paymentFrequency2
      );
      const permInt2 = permPay2 * (form.scenario2.paymentFrequency2 === "biweekly"
        ? form.scenario2.amortYears2 * 26
        : form.scenario2.amortYears2 * 12) - maxLoanLTC;

      newResults.constructionInterest2 = cInt2;
      newResults.monthlyPermPayment2 = permPay2;
      newResults.permInterest2 = permInt2;
    }

    setResults(newResults);
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Construction Loan Report", 10, 10);
    doc.setFontSize(12);
    
    let yPos = 20;
    const addLine = (text: string, value: string) => {
      doc.text(`${text}: $${value}`, 10, yPos);
      yPos += 10;
    };

    addLine("Total Project Cost", formatNumber(results.totalProjectCost));
    addLine("Maximum Loan Amount", formatNumber(results.maxLoanLTC));
    addLine("Construction Interest (Scenario 1)", formatNumber(results.constructionInterest1));
    addLine("Monthly Payment (Scenario 1)", formatNumber(results.monthlyPermPayment1));
    
    if (showScenario2 && results.constructionInterest2 && results.monthlyPermPayment2) {
      yPos += 5;
      doc.setFontSize(14);
      doc.text("Scenario 2 Results", 10, yPos);
      yPos += 10;
      doc.setFontSize(12);
      addLine("Construction Interest (Scenario 2)", formatNumber(results.constructionInterest2));
      addLine("Monthly Payment (Scenario 2)", formatNumber(results.monthlyPermPayment2));
    }

    doc.save("construction-loan-report.pdf");
  };

  return (
    <div className="container py-8 max-w-4xl">
      <h2 className="text-3xl font-bold text-center mb-6">Construction Loan Calculator – BC</h2>
      <p className="text-center text-muted-foreground mb-8">
        Get a quick estimate of your new-build financing needs. Compare scenarios and see if you qualify for special rates.
      </p>

      {/* Project & Financing Section */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Project & Financing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Land Cost (CAD)</Label>
              <Input
                value={form.landCost}
                onChange={(e) => setForm({ ...form, landCost: e.target.value })}
                onBlur={(e) => handleNumberBlur(e, "landCost")}
                placeholder="250,000"
              />
            </div>
            <div>
              <Label>Construction Cost (CAD)</Label>
              <Input
                value={form.constructionCost}
                onChange={(e) => setForm({ ...form, constructionCost: e.target.value })}
                onBlur={(e) => handleNumberBlur(e, "constructionCost")}
                placeholder="450,000"
              />
            </div>
            <div>
              <Label>Soft Costs (CAD)</Label>
              <Input
                value={form.softCosts}
                onChange={(e) => setForm({ ...form, softCosts: e.target.value })}
                onBlur={(e) => handleNumberBlur(e, "softCosts")}
                placeholder="50,000"
              />
            </div>
            <div>
              <Label>Down Payment (CAD)</Label>
              <Input
                value={form.downPayment}
                onChange={(e) => setForm({ ...form, downPayment: e.target.value })}
                onBlur={(e) => handleNumberBlur(e, "downPayment")}
                placeholder="100,000"
              />
            </div>
            <div>
              <Label>Max Loan-to-Cost (%)</Label>
              <Input
                type="number"
                step="0.1"
                value={form.ltcLimit}
                onChange={(e) => setForm({ ...form, ltcLimit: Number(e.target.value) })}
              />
            </div>
          </div>
          
          <Button className="w-full bg-[#12143A] text-white" onClick={calculateProjectLoan}>
            Calculate Project Loan
          </Button>
        </CardContent>
      </Card>

      {/* Project Results */}
      {results.totalProjectCost > 0 && (
        <Card className="mb-6">
          <CardContent className="space-y-2 pt-4">
            <div className="flex justify-between">
              <span>Total Project Cost:</span>
              <strong>${formatNumber(results.totalProjectCost)}</strong>
            </div>
            <div className="flex justify-between">
              <span>Maximum Loan Amount:</span>
              <strong>${formatNumber(results.maxLoanLTC)}</strong>
            </div>
            {loanMessage && (
              <div className="text-destructive text-sm mt-2">{loanMessage}</div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Construction & Loan Terms */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Construction & Loan Terms</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Construction Months</Label>
              <Input
                type="number"
                value={form.constructionMonths}
                onChange={(e) => setForm({ ...form, constructionMonths: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Construction Rate (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.interestRateConst}
                onChange={(e) => setForm({ ...form, interestRateConst: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Rate After Completion (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={form.interestRatePerm}
                onChange={(e) => setForm({ ...form, interestRatePerm: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Amortization Years</Label>
              <Input
                type="number"
                value={form.amortYears}
                onChange={(e) => setForm({ ...form, amortYears: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label>Payment Frequency</Label>
              <Select
                value={form.paymentFrequency}
                onValueChange={(value: "monthly" | "biweekly") => setForm({ ...form, paymentFrequency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="w-full bg-[#f0b245] text-white hover:bg-[#12143A]" variant="secondary" onClick={calculateFullLoan}>
            Calculate Full Loan Payment
          </Button>
        </CardContent>
      </Card>

      {/* Scenario 2 Toggle */}
      <div className="text-right mb-4">
        <Button variant="outline" onClick={() => setShowScenario2(!showScenario2)}>
          {showScenario2 ? "- Hide" : "+ Compare"} Second Scenario
        </Button>
      </div>

      {/* Scenario 2 Inputs */}
      {showScenario2 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Scenario 2 Comparison</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Construction Rate (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.scenario2.interestRateConst2}
                  onChange={(e) => setForm({
                    ...form,
                    scenario2: {
                      ...form.scenario2,
                      interestRateConst2: Number(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <Label>Permanent Rate (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={form.scenario2.interestRatePerm2}
                  onChange={(e) => setForm({
                    ...form,
                    scenario2: {
                      ...form.scenario2,
                      interestRatePerm2: Number(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <Label>Amortization Years</Label>
                <Input
                  type="number"
                  value={form.scenario2.amortYears2}
                  onChange={(e) => setForm({
                    ...form,
                    scenario2: {
                      ...form.scenario2,
                      amortYears2: Number(e.target.value)
                    }
                  })}
                />
              </div>
              <div>
                <Label>Payment Frequency</Label>
                <Select
                  value={form.scenario2.paymentFrequency2}
                  onValueChange={(value: "monthly" | "biweekly") => setForm({
                    ...form,
                    scenario2: {
                      ...form.scenario2,
                      paymentFrequency2: value
                    }
                  })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {results.constructionInterest1 > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Construction Interest:</span>
                <strong>${formatNumber(results.constructionInterest1)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Post-Completion Payment:</span>
                <strong>${formatNumber(results.monthlyPermPayment1)}</strong>
              </div>
              <div className="flex justify-between">
                <span>Total Interest (Term):</span>
                <strong>${formatNumber(results.permInterest1)}</strong>
              </div>
            </div>

            {showScenario2 && results.constructionInterest2 && results.monthlyPermPayment2 && (
              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between">
                  <span>Scenario 2 Construction Interest:</span>
                  <strong>${formatNumber(results.constructionInterest2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Scenario 2 Post-Completion Payment:</span>
                  <strong>${formatNumber(results.monthlyPermPayment2)}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Scenario 2 Total Interest:</span>
                  <strong>${formatNumber(results.permInterest2!)}</strong>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-6">
              <Button className="flex-1 bg-[#12143A] text-white" onClick={generatePDF}>
                Download PDF Report
              </Button>
              <Button className="flex-1 w-full bg-[#f0b245] text-white hover:bg-[#12143A]" variant="secondary">
                Get Custom Loan Estimate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-sm text-muted-foreground mt-8 text-center">
        <em>Disclaimer: This calculator provides estimates only. For personalized advice, consult a mortgage professional.</em>
      </p>
    </div>
  );
}