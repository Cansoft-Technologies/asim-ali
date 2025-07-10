"use client";
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  featuredData: any;
};
export default function FeaturedSection2(props: MyProps) {
  const { featuredData } = props;
  return (
    <section className="my-5">
      <Container>
        <div
          className="text-center my-5 border-bottom pb-3"
          dangerouslySetInnerHTML={{
            __html: featuredData?.advisorTitle,
          }}
        ></div>
      </Container>
      {featuredData?.advisorCards?.map((item: any, i: number) => (
        <div className="service-row my-5" key={i}>
          <Container>
            <h2 className="text-center">{item?.title}</h2>
            <div className="service-image" style={{ textAlign: "center" }}>
              <Image
                src={item?.image?.sourceUrl}
                alt={item?.image?.altText}
                width="1500"
                height="700"
                style={{
                  width: "100%",
                  maxWidth: 1500,
                  height: "auto",
                  objectFit: "cover",
                  margin: "0 auto",
                }}
              />
            </div>
            <Row>
              <Col className="service-texts my-5" lg={12}>
                <div
                  className="service-content"
                  style={{
                    maxWidth: 1000,
                    margin: "0 auto",
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={{
                    __html: item?.description,
                  }}
                ></div>
              </Col>
            </Row>
            <Row>
              <Col className="service-texts" lg={12}></Col>
            </Row>
          </Container>
        </div>
      ))}
    </section>
  );
}
