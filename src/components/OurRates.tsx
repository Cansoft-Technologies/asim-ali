import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";

type MyProps = {
  title?: any;
};

type RateData = {
  term: string;
  bankRate: string;
  ourRate: string;

};

export default function OurRates(props: MyProps) {
  const { title } = props;
  const [dataRates, setDataRates] = useState<RateData[]>([]);
  const [variableRate, setVariableRate] = useState<string>("0.00%");
  const [primeRate, setPrimeRate] = useState<string>("0.00");

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

        // Extract Rate Data
        const rateRows = doc.querySelectorAll(".tableList ul");
        const rates: RateData[] = [];

        rateRows.forEach((row) => {
          const cells = row.querySelectorAll("li");
          if (cells.length === 3) {
            const term = cells[0]?.textContent?.trim() || "";
            const bankRate = cells[1]?.textContent?.trim().replace("%", "") || "";
            const ourRate = cells[2]?.textContent?.trim().replace("%", "") || "";

            rates.push({
              term,
              bankRate,
              ourRate,
            });
          }
        });

        setDataRates(rates);
      } catch (err) {
        console.error("Error fetching rates:", err);
      }
    };

    fetchRates();
  }, []);

// Helper function to calculate the monthly rate from the semi-annual compounded rate
const getMonthlyRateFromAnnual = (annualRate: number) => {
  const semiAnnualRate = (1 + annualRate / 100 / 2); // Semi-annual compounding
  const effectiveAnnualRate = Math.pow(semiAnnualRate, 2) - 1; // EAR based on semi-annual compounding
  const monthlyRate = Math.pow(1 + effectiveAnnualRate, 1 / 12) - 1; // Convert EAR to monthly rate
  return monthlyRate;
};

// Helper function to calculate monthly payments
const calculatePayment = (annualRate: number, loanAmount: number = 100000, years: number = 25) => {
  const monthlyRate = getMonthlyRateFromAnnual(annualRate);
  const totalPayments = years * 12;
  return (
    (loanAmount * monthlyRate) /
    (1 - Math.pow(1 + monthlyRate, -totalPayments))
  ).toFixed(2);
};

// Calculate dynamic data with payment and savings
const updatedRates = dataRates.map((rate: any) => {
  const bankPayment = calculatePayment(parseFloat(rate.bankRate));
  const ourPayment = calculatePayment(parseFloat(rate.ourRate));
  const savings = (parseFloat(bankPayment) - parseFloat(ourPayment)).toFixed(2);
  return {
    ...rate,
    bankPayment: `$${bankPayment}`,
    ourPayment: `$${ourPayment}`,
    savings: `$${savings}`,
  };
});

  return (
    <div>
      <Container>
        <Row>
          <Col lg={12}>
            <div>
              <Col>
                <div
                  className="text-center mt-5"
                  dangerouslySetInnerHTML={{
                    __html: title || "",
                  }}
                ></div>
              </Col>
            </div>
          </Col>
        </Row>
        <Row lg={12} className="text-center mt-5">
          <Col
            className="rates-table"
            lg={10}
            md={{ span: 10, offset: 1 }}
          >
            <Row>
              <Col lg={3}>
                <Row>
                  <Col lg={12} md={6}>
                    <div className="variable-prime-rates">
                      <p>
                        {variableRate} <span>%</span>
                      </p>
                      <span className="small-print">Current Variable Rate</span>
                    </div>
                  </Col>
                  <Col lg={12} md={6}>
                    <div className="variable-prime-rates">
                      <p>
                        {primeRate} <span>%</span>
                      </p>
                      <span className="small-print">Current Prime Rate</span>
                    </div>
                  </Col>
                  <Col lg={12}>
                    <Alert variant="info" className="small">
                      <p>
                        <b>Please Note:</b> Some conditions may apply. Rates may
                        vary from Province to Province. Rates subject to change
                        without notice. Posted rates may be high ratio and/or
                        quick close which can differ from conventional rates.{" "}
                        *O.A.C. & E.O
                      </p>
                    </Alert>
                  </Col>
                </Row>
              </Col>
              <Col lg={9} className="rates">
                <Row>
                  <Col xs={2}>
                    <b>Terms</b>
                  </Col>
                  <Col xs={2}>
                    <b>Bank Rates</b>
                  </Col>
                  <Col xs={2}>
                    <b>Payment Per $100K</b>
                  </Col>
                  <Col xs={2}>
                    <b>Our Rates</b>
                  </Col>
                  <Col xs={2}>
                    <b>Payment Per $100K</b>
                  </Col>
                  <Col xs={2}>
                    <b>Savings</b>
                  </Col>
                </Row>
                {updatedRates.map((rate, index) => (
                  <Row key={index}>
                    <Col xs={2}>{rate.term}</Col>
                    <Col xs={2}>{parseFloat(rate.bankRate).toFixed(2)} %</Col>
                    <Col xs={2}>{rate.bankPayment}</Col>
                    <Col xs={2}>{parseFloat(rate.ourRate).toFixed(2)} %</Col>
                    <Col xs={2}>{rate.ourPayment}</Col>
                    <Col xs={2}>{rate.savings}</Col>
                  </Row>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
