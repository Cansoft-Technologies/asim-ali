import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  advisorData: any;
};
export default function MortgageFeaturedHome(props: MyProps) {
  const { advisorData } = props;
  return (
    <section className="split_section mt-5">
      <Container>
        <Row>
          <Col lg={6}>
            <div className="d-none d-lg-block">
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-start service-title"
            ></div>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="mt-5"
            ></div>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-5">
                  <h3 className="advisor-title">{data.title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                    className="renovation-content-list"
                  ></div>
                </div>
              );
            })}
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionBottom,
              }}
              className="service-description"
            ></div>
            </div>
            <div className="d-block d-lg-none">
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-start service-title text-center"
            ></div>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="mt-5"
            ></div>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-5">
                  <h2 className="advisor-title text-center">{data.title}</h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                    className="renovation-content-list text-center"
                  ></div>
                </div>
              );
            })}
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionBottom,
              }}
              className="service-description"
            ></div>
            </div>
          </Col>
          <Col lg={1}></Col>
          <Col lg={5}>
            <div className="split_image" style={{ marginTop: "100px" }}>
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                fill
                alt={advisorData?.advisorImage?.altText}
                quality={100}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
