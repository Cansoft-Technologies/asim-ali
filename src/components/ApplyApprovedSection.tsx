import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

type Props = {
  approvalRenovationData: any;
  sliders: any;
};

const ApplyApprovedSection = (props: Props) => {
  const { approvalRenovationData, sliders } = props;
  return (
    <div>
      <Container className="apply-now-home">
        <div className="text-center mt-5 mb-5">
          <div
            dangerouslySetInnerHTML={{
              __html: approvalRenovationData?.tabHeading,
            }}
          ></div>
        </div>
        <div className="mt-5">
          <Row className="apply-step">
            <Col md={4}>
              {approvalRenovationData?.tabDetails[0] == null ? (
                ""
              ) : (
                <div className="apply">
                  <span>01</span>
                  <p className="title">
                    {approvalRenovationData?.tabDetails[0]?.title}
                  </p>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html:
                        approvalRenovationData?.tabDetails[0]?.description,
                    }}
                  ></div>
                  <div className="apply-border"></div>
                </div>
              )}
            </Col>
            <Col md={4}>
              {(approvalRenovationData?.tabDetails[1] == null) == null ? (
                ""
              ) : (
                <div className="approved">
                  <span>02</span>
                  <p className="title">
                    {approvalRenovationData?.tabDetails[1]?.title}
                  </p>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html:
                        approvalRenovationData?.tabDetails[1]?.description,
                    }}
                  ></div>
                </div>
              )}
            </Col>
            <Col md={4}>
              {(approvalRenovationData?.tabDetails[2] == null) == null ? (
                ""
              ) : (
                <div className="apply">
                  <span>03</span>
                  <p className="title">
                    {approvalRenovationData?.tabDetails[2]?.title}
                  </p>
                  <div
                    className="desc"
                    dangerouslySetInnerHTML={{
                      __html:
                        approvalRenovationData?.tabDetails[2]?.description,
                    }}
                  ></div>
                  <div className="apply-border"></div>
                </div>
              )}
            </Col>
            {sliders?.homeSlider[0].sliderButtonUrl == null ? (
              ""
            ) : (
              <Col className="text-start mt-5 link-banner" xs={12} lg="12">
                <Link href={sliders?.homeSlider[0].sliderButtonUrl.url}>
                  <Button className="apply-button">
                    Get <span>Approved</span>
                  </Button>
                </Link>
                <Link href="/apply-now">
                  <Button className="apply-button">
                    <span>Apply Now</span>
                  </Button>
                </Link>
              </Col>
            )}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default ApplyApprovedSection;
