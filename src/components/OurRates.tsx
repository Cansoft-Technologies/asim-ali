import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';

type MyProps = {
  title?: any;
};
export default function OurRates(props: MyProps) {
  const {  title } = props;
  const dataRates = [
    { term: '6 Months', bankRate: '7.89 %', bankPayment: '$756.21', ourRate: '7.49 %', ourPayment: '$730.93', savings: '$25.28' },
    { term: '1 Year', bankRate: '7.74 %', bankPayment: '$746.69', ourRate: '5.59 %', ourPayment: '$615.64', savings: '$131.05' },
    { term: '2 Years', bankRate: '7.34 %', bankPayment: '$721.53', ourRate: '5.44 %', ourPayment: '$606.90', savings: '$114.63' },
    { term: '3 Years', bankRate: '6.94 %', bankPayment: '$696.72', ourRate: '4.64 %', ourPayment: '$561.28', savings: '$135.43' },
    { term: '4 Years', bankRate: '6.74 %', bankPayment: '$684.44', ourRate: '4.64 %', ourPayment: '$561.28', savings: '$123.16' },
    { term: '5 Years', bankRate: '6.79 %', bankPayment: '$687.50', ourRate: '4.54 %', ourPayment: '$555.70', savings: '$131.80' },
    { term: '7 Years', bankRate: '7.10 %', bankPayment: '$706.60', ourRate: '5.40 %', ourPayment: '$604.58', savings: '$102.02' },
    { term: '10 Years', bankRate: '7.25 %', bankPayment: '$715.92', ourRate: '5.80 %', ourPayment: '$627.97', savings: '$87.95' }
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
            <Col className="rates-table d-none d-md-block" lg={10} md={{ span: 10, offset: 1 }}>
        <Row>
          <Col lg={3}>
            <Row>
              <Col lg={12} md={6}>
                <div className="variable-prime-rates">
                  <p>5.05 <span>%</span></p>
                  <span className="small-print">Current Variable Rate</span>
                </div>
              </Col>
              <Col lg={12} md={6}>
                <div className="variable-prime-rates">
                  <p>5.95 <span>%</span></p>
                  <span className="small-print">Current Prime Rate</span>
                </div>
              </Col>
              <Col lg={12}>
                <Alert variant="info" className="small">
                  <p><b>Please Note:</b> Some conditions may apply. Rates may vary from Province to Province. Rates subject to change without notice. Posted rates may be high ratio and/or quick close which can differ from conventional rates. *O.A.C. & E.O</p>
                </Alert>
              </Col>
            </Row>
          </Col>
          <Col lg={9} className="rates">
            <Row>
              <Col xs={2}><b>Terms</b></Col>
              <Col xs={2}><b>Bank Rates</b></Col>
              <Col xs={2}><b>Payment Per $100K</b></Col>
              <Col xs={2}><b>Our Rates</b></Col>
              <Col xs={2}><b>Payment Per $100K</b></Col>
              <Col xs={2}><b>Savings</b></Col>
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
      <Col className="rates-table d-block d-md-none" sm={12}>
        <Row>
          <Col sm={12}>
            <Row>
              <Col sm={12} xs={6}>
                <div className="variable-prime-rates">
                  <p>5.05 <span>%</span></p>
                  <span className="small-print">Current Variable Rate</span>
                </div>
              </Col>
              <Col sm={12} xs={6}>
                <div className="variable-prime-rates">
                  <p>5.95 <span>%</span></p>
                  <span className="small-print">Current Prime Rate</span>
                </div>
              </Col>
              <Col sm={12}>
                <Alert variant="info" className="small">
                  <p><b>Please Note:</b> Some conditions may apply. Rates may vary from Province to Province. Rates subject to change without notice. Posted rates may be high ratio and/or quick close which can differ from conventional rates. *O.A.C. & E.O</p>
                </Alert>
              </Col>
            </Row>
          </Col>
          </Row>
          <Row>
          <Col sm={12} className="rates" >
            <Row>
              <Col xs={4}><b>Terms</b></Col>
              <Col xs={4}><b>Bank Rates</b></Col>
              <Col xs={4}><b>Payment Per $100K</b></Col>
            </Row>
            {dataRates.map((rate, index) => (
              <Row key={index}>
                <Col xs={4}>{rate.term}</Col>
                <Col xs={4}>{rate.bankRate}</Col>
                <Col xs={4}>{rate.bankPayment}</Col>
              </Row>
            ))}
          </Col>
          <Col sm={12} className="rates mt-4" >
            <Row>
              <Col xs={3}><b>Terms</b></Col>
              <Col xs={3}><b>Our Rates</b></Col>
              <Col xs={3}><b>Payment Per $100K</b></Col>
              <Col xs={3}><b>Savings</b></Col>
            </Row>
            {dataRates.map((rate, index) => (
              <Row key={index}>
                <Col xs={3}>{rate.term}</Col>
                <Col xs={3}>{rate.ourRate}</Col>
                <Col xs={3}>{rate.ourPayment}</Col>
                <Col xs={3}>{rate.savings}</Col>
              </Row>
            ))}
          </Col>
        </Row>
        
      </Col>
      <div className="mt-4">
      <Col lg={12} className="">
        <Alert variant="info" className="small">
        <div className="text-center">
                      <p className="">
                      Please Note: Advertised rates are not guaranteed and the rate provided by any financial institution listed, or any approval or decline you receive, will be based solely on your personal situation. The advertised rates are provided as guidance only and the accuracy of these rates is not guaranteed. You are encouraged to speak with a Dominion Lending Centres Mortgage Professional for the most accurate information and to determine your eligibility.
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
