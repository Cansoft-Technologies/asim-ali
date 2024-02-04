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
                  style={{ width: "100%", objectFit: "cover", height: "45vh" }}
                  quality={100}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="service-row my-5">
        <Container>
          <Row className="">
            <Col className="service-texts mb-5 hide-pc" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: textRight,
                }}
              ></div>
            </Col>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={imageLeft?.sourceUrl}
                  alt={imageLeft?.altText}
                  width="390"
                  height="400"
                  style={{ width: "100%", objectFit: "cover", height: "45vh" }}
                  quality={100}
                />
              </div>
            </Col>
            <Col className="service-texts my-5 hide-sm" lg={6}>
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
    </section>
  );
}
