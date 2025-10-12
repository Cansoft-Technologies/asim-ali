import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  textLeft: any;
  textRight: any;
  imageLeft: any;
  imageRight: any;
  header:any
};
export default function AberdeenServiceSection(props: MyProps) {
  const { textLeft, textRight, imageLeft, imageRight,header } = props;
  return (
    <>
      {(textLeft || imageRight) && (
        <section className="">
          {header && (
            <div className="text-center px-2 mb-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: header
                }}
              >
              </div>
            </div>
          )}
          <div className="service-row">
            <Container>
              <Row className="align-items-start">
                {textLeft && (
                  <Col className="service-texts d-flex align-items-start" lg={6} style={{ paddingTop: 0 }}>
                    <div
                      className="service-content text-left"
                      dangerouslySetInnerHTML={{
                        __html: textLeft,
                      }}
                    ></div>
                  </Col>
                )}
                {imageRight && imageRight.sourceUrl && (
                  <Col className="service-texts d-flex align-items-start" lg={6} style={{ paddingTop: 0 }}>
                    <div className="service-image">
                      <Image
                        src={imageRight.sourceUrl}
                        alt={imageRight.altText}
                        width="400"
                        height="400"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "auto",
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
        <section className="my-3">
          <div className="service-row my-2">
            <Container>
              <Row className="align-items-start">
                {imageLeft && imageLeft.sourceUrl && (
                  <Col className="service-texts d-flex align-items-start" lg={6} style={{ paddingTop: 0 }}>
                    <div className="service-image">
                      <Image
                        src={imageLeft.sourceUrl}
                        alt={imageLeft.altText}
                        width="390"
                        height="400"
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "auto",
                        }}
                        quality={100}
                      />
                    </div>
                  </Col>
                )}
                {textRight && (
                  <Col className="service-texts d-flex align-items-start" lg={6} style={{ paddingTop: 0 }}>
                    <div
                      className="service-content text-left"
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
