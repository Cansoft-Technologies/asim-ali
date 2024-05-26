import Image from "next/image";
import React from "react";
import { Col, Container, Row, Accordion } from "react-bootstrap";

type MyProps = {
  homebuyerData: any;
};

const AccordionNewBC = (props: MyProps) => {
  const { homebuyerData } = props;

  return (
    <>
      <Container>
        <div>
          <div className=" my-5">
            <div
              dangerouslySetInnerHTML={{
                __html: homebuyerData?.advisorTitle,
              }}
              className="text-center service-title text-lg tab-head"
            ></div>
            <div
              dangerouslySetInnerHTML={{
                __html: homebuyerData?.advisorDescription,
              }}
              className="text-center text-sm"
            ></div>
            {/* <p>{homebuyerData?.advisorDescription}</p> */}
          </div>
          <div className="service-row my-5">
            <Container>
              <Row>
                <Col className="service-texts" lg={5}>
                  <div className="service-image">
                    <Image
                      src={homebuyerData?.advisorImage?.sourceUrl}
                      alt={homebuyerData?.advisorImage?.altText}
                      width="390"
                  height="400"
                  priority={true}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
                    />
                  </div>
                </Col>
                <Col lg={7}>
                  <div className="faq-accordion">
                    <Accordion defaultActiveKey="0">
                      {homebuyerData?.advisorCards?.map((qa, index) => {
                        return (
                          <Accordion.Item
                            key={index}
                            eventKey={index.toString()}
                          >
                            <Accordion.Header as="h3">
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
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AccordionNewBC;
