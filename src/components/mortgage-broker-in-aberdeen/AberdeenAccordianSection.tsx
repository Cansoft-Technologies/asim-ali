import Image from "next/image";
import React from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";

type MyProps = {
  advisorData: any;
  
};

const AberdeenAccordionSection = (props: MyProps) => {
  const { advisorData } = props;

  return (
    <>
      <Container>
        <div>
          {/* adding heading here */}
         
          <div className=" my-5">
            <div    
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-center service-title text-lg tab-head"
            ></div>
            <span
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="text-center"
            ></span>
          </div>
          <div className="service-row my-5">
            <Container>
              <Row>
                <Col className="service-texts" lg={5}>
                  <div className="service-image">
                    <Image
                      src={advisorData?.advisorImage?.sourceUrl}
                      alt={advisorData?.advisorImage?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
                <Col lg={7}>
                  <div className="faq-accordion">
                    <Accordion defaultActiveKey="0">
                      {advisorData?.advisorCards?.map((qa, index) => {
                        return (
                          <Accordion.Item
                            key={index}
                            eventKey={index.toString()}
                          >
                            <Accordion.Header as="p">
                              {qa?.title}
                            </Accordion.Header>
                            <Accordion.Body
                              dangerouslySetInnerHTML={{
                                __html: qa?.description,
                              }}
                            ></Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
                    </Accordion>
                  </div>
                </Col>
              </Row>
              {/* bttom section of this accordian */}
              <div
               dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionBottom,
              }}
              >

              </div>

            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AberdeenAccordionSection;
