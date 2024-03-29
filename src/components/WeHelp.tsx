import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

type MyProps = {
  helps: any;
};

const WeHelp = (props: MyProps) => {
  const { helps } = props;

  return (
    <>
      <section className="wehelp_section mb-5">
        <Container>
          <Row>
            <Col lg={6}>
              <div className="wehelp_image">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "500px", height: "500px" }}
                >
                  <source
                    type="video/mp4"
                    src={helps?.helpImage?.mediaItemUrl}
                  />
                </video>
              </div>
            </Col>
            <Col lg={6}>
              <div>
                <div className="wehelp_text">
                  <div
                    className="wehelp_title"
                    dangerouslySetInnerHTML={{
                      __html: helps?.helpTitle,
                    }}
                  ></div>
                  <div
                    className="wehelp_description"
                    dangerouslySetInnerHTML={{
                      __html: helps?.helpDescription,
                    }}
                  ></div>
                  {helps?.helpButton == null ? (
                    ""
                  ) : (
                    <Link
                      href={`${
                        helps?.helpButton?.url?.endsWith("/")
                          ? helps?.helpButton?.url?.slice(0, -1)
                          : helps?.helpButton?.url
                      }`}
                    >
                      <Button className="SplitBtn">
                        Get <span>Approved</span>
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default WeHelp;
