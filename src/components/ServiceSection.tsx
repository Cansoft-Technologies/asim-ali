import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

type MyProps = {
  textLeft: any;
  textRight: any;
  imageLeft: any;
  imageRight: any;
  ctaText?: string;
  ctaUrl?: string;
  lctaText?: string;
  lctaUrl?: string;
};
export default function ServiceSection(props: MyProps) {
  const {
    textLeft,
    textRight,
    imageLeft,
    imageRight,
    ctaText,
    ctaUrl,
    lctaUrl,
    lctaText,
  } = props;
  return (
    <>
      {(textLeft || imageRight) && (
        <section className="">
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
                      <Row>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: textLeft,
                          }}
                        ></div>
                        {lctaText && lctaUrl && (
                          <div className="tb-btn-left">
                            <Link href={lctaUrl || "/"}>
                              <Button className="HeadBtn">{lctaText}</Button>
                            </Link>
                          </div>
                        )}
                      </Row>
                    </Col>
                  </>
                )}
                {imageRight && imageRight.sourceUrl && (
                  <Col className="service-texts" lg={6}>
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
              <Row className="">
                {textRight && (
                  <Col className="service-texts hide-pc" lg={6}>
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
                          height: "auto",
                        }}
                        quality={100}
                      />
                    </div>
                  </Col>
                )}
                {textRight && (
                  <Col className="service-texts my-2 hide-sm" lg={6}>
                    <Row>
                      <div
                        className="service-content"
                        dangerouslySetInnerHTML={{
                          __html: textRight,
                        }}
                      ></div>

                      {ctaText && ctaUrl && (
                        <div className="tb-btn-left">
                          <Link href={ctaUrl || "/"}>
                            <Button className="HeadBtn">{ctaText}</Button>
                          </Link>
                        </div>
                      )}
                    </Row>
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
