import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  textLeft: any;
  textRight: any;
  imageLeft: any;
  imageRight: any;
};
export default function ServiceSection(props: MyProps) {
  const { textLeft, textRight, imageLeft, imageRight } = props;
  return (
    <>
      {(textLeft || imageRight) && (
        <section className="my-5">
          <div className="service-row">
            <Container>
              <Row>
                {textLeft && (
                  <>
                    <Col className="service-texts hide-pc" lg={6}>
                      <div
                        className="service-content text-left"
                        dangerouslySetInnerHTML={{
                          __html: textLeft,
                        }}
                      ></div>
                    </Col>
                    <Col className="service-texts hide-sm" lg={6}>
                      <div
                        className="service-content"
                        dangerouslySetInnerHTML={{
                          __html: textLeft,
                        }}
                      ></div>
                    </Col>
                  </>
                )}
                {imageRight && imageRight.sourceUrl && (
                  <Col className="service-texts" lg={6}>
                    <div className="service-image">
                      <Image
                        src={imageRight.sourceUrl}
                        alt={imageRight.altText}
                        width="390"
                        height="400"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "45vh",
                        }}
                        quality={100}
                      />
                    </div>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        </section>
      )}
      {(textRight || imageLeft) && (
        <section className="my-5">
          <div className="service-row my-5">
            <Container>
              <Row className="">
                {textRight && (
                  <Col className="service-texts mb-5 hide-pc" lg={6}>
                    <div
                      className="service-content text-left"
                      dangerouslySetInnerHTML={{
                        __html: textRight,
                      }}
                    ></div>
                  </Col>
                )}
                {imageLeft && imageLeft.sourceUrl && (
                  <Col className="service-texts" lg={6}>
                    <div className="service-image">
                      <Image
                        src={imageLeft.sourceUrl}
                        alt={imageLeft.altText}
                        width="390"
                        height="400"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "45vh",
                        }}
                        quality={100}
                      />
                    </div>
                  </Col>
                )}
                {textRight && (
                  <Col className="service-texts my-5 hide-sm" lg={6}>
                    <div
                      className="service-content"
                      dangerouslySetInnerHTML={{
                        __html: textRight,
                      }}
                    ></div>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        </section>
      )}
    </>
  );
}
