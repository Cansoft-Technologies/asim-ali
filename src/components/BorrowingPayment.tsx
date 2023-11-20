import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  borrowingPaymentData: any;
};
export default function BorrowingPayment(props: MyProps) {
  const { borrowingPaymentData } = props;
  return (
    <section className="split_section">
      <Container>
        <Row>
          <Col lg={7}>
            <div
              dangerouslySetInnerHTML={{
                __html: borrowingPaymentData?.borrowingTitle,
              }}
              className="text-start"
            ></div>
            <div
              dangerouslySetInnerHTML={{
                __html: borrowingPaymentData?.borrowingDescriptionTop,
              }}
              className=""
            ></div>
            <div className="split_image">
              <Image
                src={borrowingPaymentData?.borrowingImage?.sourceUrl}
                fill
                alt={borrowingPaymentData?.borrowingImage?.altText}
              />
            </div>
          </Col>
          <Col lg={5}>
            <div
              dangerouslySetInnerHTML={{
                __html: borrowingPaymentData?.borrowingRightDescription,
              }}
              className=""
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
