import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  advisorData: any;
};
export default function MortgageAdvisorLoc(props: MyProps) {
  const { advisorData } = props;
  return (
    <>
    <section className="split_section mt-5 d-none d-md-block">
      <Container>
      <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-center service-title"
            ></div>
            <p className="advisor-title text-center">
              {advisorData?.advisorDescriptionTitle}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="text-center"
            ></div>
        <Row>
          <Col lg={6}>
            <div className="split_image mt-5">
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                width="390"
                      height="400"
                alt={advisorData?.advisorImage?.altText}
                priority={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        backgroundColor: "#ffffff",
                      }}
                      quality={100}
              />
            </div>
          </Col>
          <Col lg={6}>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-0">
                  <p className="advisor-title">{data.title}</p>
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
          </Col>
        </Row>
      </Container>
    </section>
    <section className="split_section mt-5 d-block d-md-none ">
      <Container>
      <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-center service-title"
            ></div>
            <p className="advisor-title text-center">
              {advisorData?.advisorDescriptionTitle}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="text-center"
            ></div>
        <Row>
        <Col lg={6}>
            <div className="split_image justify-content-sm-center">
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                width="390"
                      height="400"
                alt={advisorData?.advisorImage?.altText}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
              />
            </div>
          </Col>
        <Col lg={6}>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-0 text-center">
                  <p className="advisor-title">{data.title}</p>
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
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
}
