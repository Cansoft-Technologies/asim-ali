import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const DownPaymentCalculator = () => {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(5);
  const [interestRate, setInterestRate] = useState<number>(4);
  const [amortizationPeriod, setAmortizationPeriod] = useState<number>(25);

  const calculateMortgage = () => {
    const downPaymentAmount = (homePrice * downPaymentPercent) / 100;
    const mortgageAmount = homePrice - downPaymentAmount;
    const insurancePremium = downPaymentPercent < 20 ? mortgageAmount * 0.04 : 0;
    const totalMortgage = mortgageAmount + insurancePremium;

    const monthlyInterestRate = interestRate / 100 / 12;
    const numberOfPayments = amortizationPeriod * 12;

    const monthlyPayment =
      totalMortgage *
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalCost = monthlyPayment * numberOfPayments;

    return {
      downPaymentAmount,
      mortgageAmount,
      insurancePremium,
      totalMortgage,
      monthlyPayment,
      totalCost,
    };
  };

  const results = calculateMortgage();

  return (
    <Card className="calculator-card">
      <Card.Body>
        <Form>
          <Form.Group controlId="homePrice">
            <Form.Label>Home Price ($)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={homePrice}
              onChange={(e) => setHomePrice(parseFloat(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="downPaymentPercent">
            <Form.Label>Down Payment (%)</Form.Label>
            <Form.Control
              type="number"
              min="0"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(parseFloat(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="interestRate">
            <Form.Label>Interest Rate (%)</Form.Label>
            <Form.Control
              min="1"
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
            />
          </Form.Group>

          <Form.Group controlId="amortizationPeriod">
            <Form.Label>Amortization Period (years)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={amortizationPeriod}
              onChange={(e) => setAmortizationPeriod(parseFloat(e.target.value))}
            />
          </Form.Group>
        </Form>

        <div className="results">
          <p className="service-title mb-3">Results</p>
          <p>Down Payment Amount: ${results.downPaymentAmount.toFixed(2) || 0}</p>
          <p>Mortgage Amount: ${results.mortgageAmount.toFixed(2) || 0}</p>
          <p>Mortgage Loan Insurance Premium: ${results.insurancePremium.toFixed(2) || 0}</p>
          <p>Total Mortgage: ${results.totalMortgage.toFixed(2) || 0}</p>
          <p>Monthly Payment: ${results.monthlyPayment.toFixed(2) || 0}</p>
          <p>Total Cost: ${results.totalCost.toFixed(2) || 0}</p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DownPaymentCalculator;