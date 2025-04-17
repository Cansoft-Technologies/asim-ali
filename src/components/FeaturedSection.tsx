"use client";
import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  featuredData: any;
};
export default function FeaturedSection(props: MyProps) {
  const { featuredData } = props;
  console.log(featuredData, "featuredData");
  return (
    <section className="my-5">
      <Container>
        <div
          className="text-center my-5"
          dangerouslySetInnerHTML={{
            __html: featuredData?.advisorTitle,
          }}
        ></div>
      </Container>
      {featuredData?.advisorCards?.map((item: any, i: number) =>
        i % 2 == 0 ? (
          <div className="service-row my-5" key={i}>
            <Container>
              <h3 className="text-center">{item?.title}</h3>
              <Row>
                <Col className="service-texts my-5" lg={6}>
                  <div
                    className="service-content"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  ></div>
                </Col>
                <Col className="service-texts" lg={6}>
                  <div className="service-image">
                    <Image
                      src={item?.image?.sourceUrl}
                      alt={item?.image?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        ) : (
          <div key={i} className="service-row my-5">
            <Container>
              <h3 className="text-center">{item?.title}</h3>
              <Row>
                <Col className="service-texts my-5" lg={6}>
                  <div className="service-image">
                    <Image
                      src={item?.image?.sourceUrl}
                      alt={item?.image?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
                <Col className="service-texts my-5" lg={6}>
                  <div
                    className="service-content"
                    dangerouslySetInnerHTML={{
                      __html: item?.description,
                    }}
                  ></div>
                </Col>
              </Row>
            </Container>
          </div>
        )
      )}
    </section>
  );
}
