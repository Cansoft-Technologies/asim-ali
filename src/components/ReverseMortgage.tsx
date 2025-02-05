import React, { useState, ChangeEvent } from 'react';
import { Form, Row, Col, Card, Container, Button } from 'react-bootstrap';

interface MortgageData {
    homeValue: number;
    mortgageBalance: number;
    age: number;
    rate: number;
    loanEstimate: number | undefined;
}

const ReverseMortgageCalculator = () => {
    const [mortgageData, setMortgageData] = useState<MortgageData>({
        homeValue: 100000,  // Initial value set to first option
        mortgageBalance: 0,   // Initial value set to first option
        age: 59,              // Initial value set to first option
        rate: 59,              // Initial value set to first option
        loanEstimate: undefined,
    });
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleInputChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = event.target;
        setMortgageData({
          ...mortgageData,
            [name]: parseFloat(value), // Parse the value here
        });
    };

    const calculateReverseMortgage = async () => {
        setIsLoading(true); // Set loading to true
        const { homeValue, mortgageBalance, age } = mortgageData;
        const apiEndpoint = "https://mc.mutualreverse.com/api/v1/calculator";

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    property_value: homeValue,
                    mortgage_balance: mortgageBalance,
                    age: age >= 91? 91: age, // Adjust age if over 90
                    state: '', // Add state if needed
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setMortgageData({...mortgageData, loanEstimate: data?.result?.remaining_equity, rate: data?.result?.rate
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            // Handle error (e.g., display an error message)
        } finally {
            setIsLoading(false); // Set loading to false
        }
    };

    return (
        <Container className="mt-5">
            <Card className="shadow">
                <Card.Body>
                    <Form>
                        <Row className="mb-3">
                            <Form.Label column sm={4}>Select Estimated Home Value</Form.Label>
                            <Col sm={8}>
                            <Form.Control as="select" name="homeValue" value={mortgageData.homeValue} onChange={(e)=>handleInputChange}>
      <option disabled value="">Select Home Value</option>
      <option value="150000">$100,001 - $150,000</option>
      <option value="200000">$150,001 - $200,000</option>
      <option value="250000">$200,001 - $250,000</option>
      <option value="300000">$250,001 - $300,000</option>
      <option value="350000">$300,001 - $350,000</option>
      <option value="400000">$350,001 - $400,000</option>
      <option value="450000">$400,001 - $450,000</option>
      <option value="500000">$450,001 - $500,000</option>
      <option value="550000">$500,001 - $550,000</option>
      <option value="600000">$550,001 - $600,000</option>
      <option value="650000">$600,001 - $650,000</option>
      <option value="700000">$650,001 - $700,000</option>
      <option value="750000">$700,001 - $750,000</option>
      <option value="800000">$750,001 - $800,000</option>
      <option value="850000">$800,001 - $850,000</option>
      <option value="900000">$850,001 - $900,000</option>
      <option value="950000">$900,001 - $950,000</option>
      <option value="1000000">$950,001 - $1,000,000</option>
      <option value="1050000">$1,000,001 - $1,050,000</option>
      <option value="1100000">$1,050,001 - $1,100,000</option>
      <option value="1150000">$1,100,001 - $1,150,000</option>
      <option value="1200000">$1,150,001 - $1,200,000</option>
      <option value="1250000">$1,200,001 - $1,250,000</option>
      <option value="1300000">$1250001 - $1,300,000</option>
      <option value="1350000">$1,300,001 - $1,350,000</option>
      <option value="1400000">$1,350,001 - $1,400,000</option>
      <option value="1450000">$1,400,001 - $1,450,000</option>
      <option value="1500000">$1,450,001 - $1,500,000</option>
      <option value="1550000">$1,500,001 - $1,550,000</option>
      <option value="1600000">$1,550,001 - $1,600,000</option>
      <option value="1650000">$1,600,001 - $1,650,000</option>
      <option value="1700000">$1,650,001 - $1,700,000</option>
      <option value="1750000">$1,700,001 - $1,750,000</option>
      <option value="1800000">$1,750,001 - $1,800,000</option>
      <option value="1850000">$1,800,001 - $1,850,000</option>
      <option value="1900000">$1,850,001 - $1,900,000</option>
      <option value="1950000">$1,900,001 - $1,950,000</option>
      <option value="2000000">$1,950,001 - $2,000,000</option>
      <option value="2050000">$2,000,001 - $2,050,000</option>
      <option value="2100000">$2,050,001 - $2,100,000</option>
      <option value="2150000">$2,100,001 - $2,150,000</option>
      <option value="2200000">$2,150,001 - $2,200,000</option>
      <option value="2250000">$2,200,001 - $2,250,000</option>
      <option value="2300000">$2,250,001 - $2,300,000</option>
      <option value="2350000">$2,300,001 - $2,350,000</option>
      <option value="2400000">$2,350,001 - $2,400,000</option>
      <option value="2450000">$2,400,001 - $2,450,000</option>
      <option value="2500000">$2,450,001 - $2,500,000</option>
      <option value="2550000">$2,500,001 - $2,550,000</option>
      <option value="2600000">$2,550,001 - $2,600,000</option>
      <option value="2650000">$2,600,001 - $2,650,000</option>
      <option value="2700000">$2,650,001 - $2,700,000</option>
      <option value="2750000">$2,700,001 - $2,750,000</option>
      <option value="2800000">$2,750,001 - $2,800,000</option>
      <option value="2850000">$2,800,001 - $2,850,000</option>
      <option value="2900000">$2,850,001 - $2,900,000</option>
      <option value="2950000">$2,900,001 - $2,950,000</option>
      <option value="3000000">$2,950,001 - $3,000,000</option>
      <option value="3050000">$3,000,001 - $3,050,000</option>
                </Form.Control>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label column sm={4}>Select Mortgage Balance</Form.Label>
                            <Col sm={8}>
                            <Form.Control as="select" name="mortgageBalance" value={mortgageData.mortgageBalance} onChange={(e)=>handleInputChange}>
      <option disabled value="">Select Mortgage Balance</option>
      <option value="1">$1 - $25,000</option>
      <option value="25001">$25,001 - $50,000</option>
      <option value="50001">$50,001 - $75,000</option>
      <option value="75001">$75,001 - $100,000</option>
      <option value="100001">$100,001 - $125,000</option>
      <option value="125001">$125,001 - $150,000</option>
      <option value="150001">$150,001 - $175,000</option>
      <option value="175001">$175,001 - $200,000</option>
      <option value="200001">$200,001 - $225,000</option>
      <option value="225001">$225,001 - $250,000</option>
      <option value="250001">$250,001 - $275,000</option>
      <option value="275001">$275,001 - $300,000</option>
      <option value="300001">$300,001 - $325,000</option>
      <option value="325001">$325,001 - $350,000</option>
      <option value="350001">$350,001 - $375,000</option>
      <option value="375001">$375,001 - $400,000</option>
      <option value="400001">$400,001 - $425,000</option>
      <option value="425001">$425,001 - $450,000</option>
      <option value="450001">$450,001 - $475,000</option>
      <option value="475001">$475,001 - $500,000</option>
      <option value="500001">$500,001 - $525,000</option>
      <option value="525001">$525,001 - $550,000</option>
      <option value="550001">$550,001 - $575,000</option>
      <option value="575001">$575,001 - $600,000</option>
      <option value="600001">$600,001 - $625,000</option>
      <option value="625001">$625,001 - $650,000</option>
      <option value="650001">$650,001 - $675,000</option>
      <option value="675001">$675,001 - $700,000</option>
      <option value="700001">$700,001 - $725,000</option>
      <option value="725001">$725,001 - $750,000</option>
      <option value="750001">$750,001 - $775,000</option>
      <option value="775001">$775,001 - $800,000</option>
      <option value="800001">$800,001 - $825,000</option>
      <option value="825001">$825,001 - $850,000</option>
      <option value="850001">$850,001 - $875,000</option>
      <option value="875001">$875,001 - $900,000</option>
      <option value="900001">$900,001 - $925,000</option>
      <option value="925001">$925001 - $950,000</option>
      <option value="950001">$950,001 - $975,000</option>
      <option value="975001">$975,001 - $1,000,000</option>
      <option value="1000001">Over $1,000,000</option>
    </Form.Control>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Form.Label column sm={4}>Select Youngest Borrower Age</Form.Label>
                            <Col sm={8}>
                                <Form.Control
                                    as="select"
                                    name="age"
                                    value={mortgageData.age}
                                    onChange={(e)=>handleInputChange}
                                >
                                    <option disabled value="">Select Age</option>
                                    <option value="59">Under 60</option>
                                    {/* Generate options from 60 to 90 */}
                                    {Array.from({ length: 30 }, (_, i) => (
                                        <option key={i + 60} value={i + 60}>
                                            {i + 60}
                                        </option>
                                    ))}
                                    <option value="91">Over 90</option>
                                </Form.Control>
                            </Col>
                        </Row>
                        <div className="d-grid tb-btn">
                            <button className="btn-primary HeadBtn btn" onClick={calculateReverseMortgage} disabled={isLoading}>
                                {isLoading? 'Calculating...': 'Calculate Reverse Mortgage'}
                            </button>
                        </div>
                    </Form>
                    <div className="mt-4 result-box">
                        <p className="result-label">YOUR LOAN ESTIMATE</p>
                        <p className="estimate-value">
                            {isLoading? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ): (
                                `$${mortgageData.loanEstimate !== undefined && mortgageData.loanEstimate > 0 ? mortgageData.loanEstimate.toLocaleString() : "0"}`
                            )}
                        </p>
                        <p className="result-label">OUR RATE</p>
                        <p className="estimate-value">
                            {isLoading? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ): (
                                `${mortgageData.loanEstimate !== undefined ? mortgageData.rate.toLocaleString() + '%' : "0 %"}`
                            )}
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ReverseMortgageCalculator;