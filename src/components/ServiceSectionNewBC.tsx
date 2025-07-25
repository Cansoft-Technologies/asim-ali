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
  const { textLeft, textRight, imageLeft, imageRight, leftText, leftImage } =
    props;
  return (
    <section className="my-5">
      {/* First service row: textLeft & imageRight */}
      {(textLeft || imageRight) && (
        <div className="service-row">
          <Container>
            <Row>
              {imageRight && imageRight.sourceUrl && (
                <Col className="service-texts order-1 order-lg-2" lg={6}>
                  <div className="service-image">
                    <Image
                      src={imageRight.sourceUrl}
                      alt={imageRight.altText}
                      width="390"
                      height="400"
                      sizes="100vw"
                      style={{ width: "100%", objectFit: "cover" }}
                      quality={100}
                    />
                  </div>
                </Col>
              )}
              {textLeft && (
                <Col
                  className="service-texts order-2 order-lg-1 text-start"
                  lg={6}
                >
                  <div
                    className="service-content"
                    style={{ textAlign: "left" }}
                    dangerouslySetInnerHTML={{
                      __html: textLeft,
                    }}
                  ></div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      )}

      {/* Second service row: imageLeft & textRight */}
      {(imageLeft || textRight) && (
        <div className="service-row my-5">
          <Container>
            <Row>
              {imageLeft && imageLeft.sourceUrl && (
                <Col className="service-texts order-1 order-lg-1" lg={6}>
                  <div className="service-image">
                    <Image
                      src={imageLeft.sourceUrl}
                      alt={imageLeft.altText}
                      width="390"
                      height="400"
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
              )}
              {textRight && (
                <Col
                  className="service-texts my-5 order-2 order-lg-2 text-start"
                  lg={6}
                >
                  <div
                    className="service-content"
                    style={{ textAlign: "left" }}
                    dangerouslySetInnerHTML={{
                      __html: textRight,
                    }}
                  ></div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      )}

      {/* Third service row: leftText & leftImage */}
      {(leftText || leftImage) && (
        <div className="service-row my-5">
          <Container>
            <Row>
              {leftText && (
                <Col
                  className="service-texts my-5 order-1 order-lg-1 text-start"
                  lg={6}
                >
                  <div
                    className="service-content"
                    style={{ textAlign: "left" }}
                    dangerouslySetInnerHTML={{
                      __html: leftText,
                    }}
                  ></div>
                </Col>
              )}
              {leftImage && leftImage.sourceUrl && (
                <Col className="service-texts order-2 order-lg-2" lg={6}>
                  <div className="service-image">
                    <Image
                      src={leftImage.sourceUrl}
                      alt={leftImage.altText}
                      width="390"
                      height="400"
                      sizes="100vw"
                      style={{ width: "100%", objectFit: "cover" }}
                      quality={100}
                    />
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      )}
    </section>
  );
}
