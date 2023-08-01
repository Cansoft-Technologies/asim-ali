import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  advisorData: any;
};
export default function MortgageAdvisor(props: MyProps) {
  const { advisorData } = props;
  return (
    <section className="split_section">
      <Container>
        <Row>
          <Col lg={7}>
          <h2 className="text-start service-title">{advisorData?.advisorTitle}</h2>
            <div className="split_image"  style={{
                          height: "70vh",
                          width: "80%",
                        }}>
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                fill
                alt={advisorData?.advisorImage?.altText}
              />
            </div>
          </Col>
          <Col lg={5}>
            {advisorData?.advisorCards?.map((data, item) => {
              return(
                <div key={item} className="split_text mb-5">
              <h3 className="advisor-title">{data.title}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: data.description,
                }}
                className="renovation-content-list"
              ></div>
            </div>
              )
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
  );
}
