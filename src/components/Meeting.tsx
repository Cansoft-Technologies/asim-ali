import { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import MortgageRatesCalculator from "./mortgage-rates-calculator";

type MyProps = {
  meetings: any;
};
type RateData = {
  term: string;
  bankRate: string;
  ourRate: string;

};
const Meeting = (props: MyProps) => {
  const { meetings } = props;
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
                        __html: meetings?.meetingTitle || "",
                      }}
                    ></div>
                  </Col>
                </div>
              </Col>
            </Row>
            <MortgageRatesCalculator/>
          </Container>
        </div>
  );
};

export default Meeting;
