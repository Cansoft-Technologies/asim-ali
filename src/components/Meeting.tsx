import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  meetings: any;
};

const Meeting = (props: MyProps) => {
  const { meetings } = props;

  return (
    <>
      <section className="meeting_section">
        <div>
          {meetings?.hideSection == true ? (
            ""
          ) : (
            <Container>
              <Row>
                <Col lg={4}>
                  <div>
                    <Col>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: meetings?.meetingTitle,
                        }}
                      ></div>
                    </Col>
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: meetings?.meetingDescription,
                    }}
                    className="meeting_text"
                  ></div>
                </Col>
                <Col lg={8}>
                  <div
                    className="meeting_image"
                    style={{
                      position: "relative",
                      height: "60vh",
                      width: "100%",
                      clipPath: "inset(0 0 0 0)",
                    }}
                  >
                    <Image
                      src={meetings?.meetingImage?.sourceUrl}
                      fill
                      style={{ height: "100%", width: "100%" }}
                      alt={meetings?.meetingImage?.altText}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </section>
    </>
  );
};

export default Meeting;
