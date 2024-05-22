import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  textLeft: any;
  textRight: any;
  imageLeft: any;
  imageRight: any;
  leftText: any;
  leftImage: any;
};
export default function ServiceSectionNewBC(props: MyProps) {
  const { textLeft, textRight, imageLeft, imageRight, leftText, leftImage } = props;
  return (
    <section className="my-5">
      <div className="service-row">
        <Container>
          <Row>
            <Col className="service-texts" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: textLeft,
                }}
              ></div>
            </Col>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={imageRight?.sourceUrl}
                  alt={imageRight?.altText}
                  width="390"
                  height="400"
                  sizes="100vw"
                  priority={true}
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="service-row my-5">
        <Container>
          <Row>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={imageLeft?.sourceUrl}
                  alt={imageLeft?.altText}
                  width="390"
                  height="400"
                  priority={true}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                      quality={100}
                />
              </div>
            </Col>
            <Col className="service-texts my-5" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: textRight,
                }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="service-row my-5">
        <Container>
          <Row>
            <Col className="service-texts my-5" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: leftText,
                }}
              ></div>
            </Col>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={leftImage?.sourceUrl}
                  alt={leftImage?.altText}
                  width="390"
                  height="400"
                  priority={true}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}
