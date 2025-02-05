import React, { useState, ChangeEvent, useEffect } from 'react';
import { Form, Row, Col, Card, Container } from 'react-bootstrap';

interface MortgageData {
  amount: number;
  amortization: number;
  rate1: number;
  rate2: number;
  payment1: number | undefined;
  payment2: number | undefined;
}

const MortgageRenewalCalculator = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>({
    amount: 700000,
    amortization: 25,
    rate1: 5.78,
    rate2: 6.89,
    payment1: undefined,
    payment2: undefined,
  });
  const [variableRate, setVariableRate] = useState<string>("0.00%");
  const [primeRate, setPrimeRate] = useState<string>("0.00");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setMortgageData({
      ...mortgageData,
      [name]: parseFloat(value) || parseInt(value) || 0, // Handle parsing
    });
  };
  
 useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch(
          "https://centralhost.dominionlending.ca/websites/current-rates/rates/en_large.php"
        );
        if (!response.ok) throw new Error("Failed to fetch rates");

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Extract Variable and Prime Rates
        const variableRateText = doc
          .querySelector(".mainLeft p strong:nth-child(1)")
          ?.textContent?.trim();
        const primeRateText = doc
          .querySelector(".mainLeft p strong:nth-child(3)")
          ?.textContent?.trim();
        if (variableRateText) setVariableRate(variableRateText);
        if (primeRateText) setPrimeRate(primeRateText);

        const newMortgageData: MortgageData = {
          amount: 700000,
          amortization: 25,
          rate1: parseFloat(variableRate) || 0,
          rate2: parseFloat(primeRate) || 0,
          payment1: undefined,
          payment2: undefined,
        };

        setMortgageData(newMortgageData);
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    };

    fetchRates();
  }, [1]);
  // Helper function to calculate the monthly rate from the semi-annual compounded rate
const getMonthlyRateFromAnnual = (annualRate: number) => {
  const semiAnnualRate = (1 + annualRate / 100 / 2); // Semi-annual compounding
  const effectiveAnnualRate = Math.pow(semiAnnualRate, 2) - 1; // EAR based on semi-annual compounding
  const monthlyRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1; // Convert EAR to monthly rate
  return monthlyRate;
};
  const calculateMortgage = (amount: number, amortization: number, rate: number): number => {
    const monthlyRate = getMonthlyRateFromAnnual(rate);
    const numPayments = amortization * 12;
    const mortgagePayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    return mortgagePayment;
  };

  useEffect(() => {
    const newPayment1 = calculateMortgage(mortgageData.amount, mortgageData.amortization, mortgageData.rate1);
    const newPayment2 = calculateMortgage(mortgageData.amount, mortgageData.amortization, mortgageData.rate2);
    setMortgageData({
      ...mortgageData,
      payment1: newPayment1,
      payment2: newPayment2,
    });
  }, [mortgageData.amount, mortgageData.amortization, mortgageData.rate1, mortgageData.rate2]);

  return (
    <Container className='mt-5'>
      <Card className="mt-4">
      <Card.Header>
        <Card.Title className='text-center'>Mortgage Renewal Calculator</Card.Title>
      </Card.Header>
      <Card.Body>
        <Form>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Mortgage Amount</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                name="amount"
                value={mortgageData.amount}
                onChange={(e)=>handleInputChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">Amortization (Years)</Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                name="amortization"
                value={mortgageData.amortization}
                onChange={(e)=>handleInputChange}
              />
            </Col>
          </Form.Group>

          <Row>
            <Col>
              <Card className="scenario-card">
                <Card.Body>
                  <Card.Title>Current Variable Rate</Card.Title>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Mortgage Rate</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        name="rate1"
                        value={mortgageData.rate1}
                        onChange={(e)=>handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <p><strong>Monthly Payment:</strong> {mortgageData.payment1 ? mortgageData.payment1.toFixed(2) : "-"}</p>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card className="scenario-card">
                <Card.Body>
                  <Card.Title>Current Prime Rate</Card.Title>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="4">Mortgage Rate</Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="number"
                        name="rate2"
                        value={mortgageData.rate2}
                        onChange={(e)=>handleInputChange}
                      />
                    </Col>
                  </Form.Group>
                  <p><strong>Monthly Payment:</strong> {mortgageData.payment2 ? mortgageData.payment2.toFixed(2) : "-"}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
    </Container>
  );
};

export default MortgageRenewalCalculator;