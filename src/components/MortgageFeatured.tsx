import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  advisorData: any;
};
export default function MortgageFeatured(props: MyProps) {
  const { advisorData } = props;
  console.log(advisorData)
  return (
    <section className="split_section mt-5">
      <Container>
        <Row>
          <Col lg={5}>
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
              return(
                <div key={item} className="split_text mb-5">
              <h4 className="advisor-title">{data.title}</h4>
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
          <Col lg={7}>
            <div className="split_image" style={{marginTop:"100px"}}>
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                fill
                alt={advisorData?.advisorImage?.altText}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}