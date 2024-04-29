import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';

type MyProps = {
  title?: any;
};
export default function OurRates(props: MyProps) {
  const {  title } = props;
  const dataRates = [
    {
      term: "6 Months",
      bankRate: "6.59 %",
      bankPayment: "$675.29",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
      savings: "$-55.64",
    },
    {
      term: "1 Year",
      bankRate: "7.84 %",
      bankPayment: "$753.03",
      ourRate: "6.93 %",
      ourPayment: "$696.10",
      savings: "$56.93",
    },
    {
      term: "2 Years",
      bankRate: "7.34 %",
      bankPayment: "$721.53",
      ourRate: "6.37 %",
      ourPayment: "$661.96",
      savings: "$59.57",
    },
    {
      term: "3 Years",
      bankRate: "6.99 %",
      bankPayment: "$699.80",
      ourRate: "5.44 %",
      ourPayment: "$606.90",
      savings: "$92.90",
    },
    {
      term: "4 Years",
      bankRate: "6.79 %",
      bankPayment: "$687.50",
      ourRate: "5.52 %",
      ourPayment: "$611.56",
      savings: "$75.94",
    },
    {
      term: "5 Years",
      bankRate: "6.84 %",
      bankPayment: "$690.57",
      ourRate: "4.99 %",
      ourPayment: "$581.04",
      savings: "$109.53",
    },
    {
      term: "7 Years",
      bankRate: "7.10 %",
      bankPayment: "$706.60",
      ourRate: "6.09 %",
      ourPayment: "$645.17",
      savings: "$61.43",
    },
    {
      term: "10 Years",
      bankRate: "7.25 %",
      bankPayment: "$715.92",
      ourRate: "6.14 %",
      ourPayment: "$648.15",
      savings: "$67.77",
    },
  ];
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
                        __html: title,
                      }}
                    ></div>
                  </Col>
                </div>
              </Col>
            </Row>
            <Row lg={12} className="text-center mt-5">
              <Col className="rates-table" lg={10} md={{ span: 10, offset: 1 }}>
                <Row>
                  <Col lg={3}>
                    <Row>
                      <Col lg={12} md={6}>
                        <div className="variable-prime-rates">
                          <p>
                            6.30 <span>%</span>
                          </p>
                          <span className="small-print">
                            Current Variable Rate
                          </span>
                        </div>
                      </Col>
                      <Col lg={12} md={6}>
                        <div className="variable-prime-rates">
                          <p>
                            7.20 <span>%</span>
                          </p>
                          <span className="small-print">
                            Current Prime Rate
                          </span>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <Alert variant="info" className="small">
                          <p>
                            <b>Please Note:</b> Some conditions may apply. Rates
                            may vary from Province to Province. Rates subject to
                            change without notice. Posted rates may be high
                            ratio and/or quick close which can differ from
                            conventional rates. *O.A.C. & E.O
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
                    {dataRates.map((rate, index) => (
                      <Row key={index}>
                        <Col xs={2}>{rate.term}</Col>
                        <Col xs={2}>{rate.bankRate}</Col>
                        <Col xs={2}>{rate.bankPayment}</Col>
                        <Col xs={2}>{rate.ourRate}</Col>
                        <Col xs={2}>{rate.ourPayment}</Col>
                        <Col xs={2}>{rate.savings}</Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Col>
              <div className="mt-4 row">
                <Col lg={10} className="offset-lg-1 px-0">
                  <Alert variant="info">
                    <div className="meeting_text">
                      <p className="">
                        Please Note: Rates you see may change, and the rate you
                        get from any bank or lender, or whether you’re approved
                        or not, depends on your situation. The rates you see are
                        just estimates and might not be exact. It’s best to talk
                        to us for the most accurate info and to find out if you
                        qualify.
                      </p>
                    </div>
                  </Alert>
                </Col>
              </div>
            </Row>
          </Container>
        </div>
  )
}
