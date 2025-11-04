import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

type MyProps = {
  borrowingPaymentData: any;
};
export default function BorrowingPayment(props: MyProps) {
  const { borrowingPaymentData } = props;
  return (
    <section className="split_section just">
      <Container>
        {/* Titles at top */}
        <Row className="mb-4">
          <Col>
            {borrowingPaymentData?.borrowingTitle && (
              <div
                dangerouslySetInnerHTML={{
                  __html: borrowingPaymentData.borrowingTitle,
                }}
                className="text-center"
              ></div>
            )}
            {borrowingPaymentData?.borrowingTitle2 && (
              <h2 className="text-center borrowing-title">
                {borrowingPaymentData.borrowingTitle2}
              </h2>
            )}
            {borrowingPaymentData?.borrowingDescriptionTop && (
              <div
                dangerouslySetInnerHTML={{
                  __html: borrowingPaymentData.borrowingDescriptionTop,
                }}
                className="text-center"
              ></div>
            )}
          </Col>
        </Row>
        {/* Image and right description below titles */}
        <section className="">
          <div className="service-row">
            <Container>
              <Row className="">
                {borrowingPaymentData?.borrowingImage?.sourceUrl && (
                  <Col className="service-texts" lg={6}>
                    <div className="service-image">
                      <Image
                        src={borrowingPaymentData.borrowingImage.sourceUrl}
                        alt={borrowingPaymentData.borrowingImage.altText}
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
                {borrowingPaymentData?.borrowingRightDescription && (
                  <Col className="service-texts my-5" lg={6}>
                    <Row>
                    <div
                      className="service-content"
                      dangerouslySetInnerHTML={{
                        __html: borrowingPaymentData.borrowingRightDescription,
                      }}
                    ></div>
                    {borrowingPaymentData?.borrowingCtaUrl &&
                      borrowingPaymentData?.borrowingCtaText && (
                        <div className="tb-btn-left">
                          <Link
                            href={borrowingPaymentData?.borrowingCtaUrl || "/"}
                          >
                            <Button className="HeadBtn">
                              {borrowingPaymentData?.borrowingCtaText}
                            </Button>
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
        {/* <Row className="align-items-center">
          <Col lg={4} className="text-center">
            {borrowingPaymentData?.borrowingImage?.sourceUrl && (
              <div className="split_image">
                <Image
                  src={borrowingPaymentData.borrowingImage.sourceUrl}
                  alt={borrowingPaymentData.borrowingImage.altText}
                  width={300}
                  height={300}
                  style={{ objectFit: "contain", maxWidth: "100%" }}
                />
              </div>
            )}
          </Col>
          <Col lg={8}>
            {borrowingPaymentData?.borrowingRightDescription && (
              <div
                dangerouslySetInnerHTML={{
                  __html: borrowingPaymentData.borrowingRightDescription,
                }}
                className=""
              ></div>
            )}
          </Col>
        </Row> */}
      </Container>
    </section>
  );
}
