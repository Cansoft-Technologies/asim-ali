import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              meetingSection {
                meetingTitle
                meetingDescription
                hideSection
                meetingImage {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      meetings: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  meetings: any;
};

const Meeting = (props: MyProps) => {
  const { meetings } = props;

  return (
    <>
      <section className="meeting_section">
        {meetings?.map((meeting) => {
          return (
            <div key={meeting}>
              {meeting?.HomeLandingPage?.meetingSection?.hideSection == true ? (
                ""
              ) : (
                <Container>
                  <Row>
                    <Col>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html:
                            meeting?.HomeLandingPage?.meetingSection
                              ?.meetingTitle,
                        }}
                      ></h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={4}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            meeting?.HomeLandingPage?.meetingSection
                              ?.meetingDescription,
                        }}
                        className="meeting_text"
                      ></div>
                    </Col>
                    <Col lg={8}>
                      <div
                        className="meeting_image"
                        style={{
                          position: "relative",
                          height: "70vh",
                          width: "100%",
                          clipPath: "inset(0 0 0 0)",
                        }}
                      >
                        <Image
                          src={
                            meeting?.HomeLandingPage?.meetingSection
                              ?.meetingImage?.sourceUrl
                          }
                          fill
                          style={{ height: "100%", width: "100%" }}
                          alt={
                            meeting?.HomeLandingPage?.meetingSection
                              ?.meetingImage?.altText
                          }
                        />
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          );
        })}
      </section>
    </>
  );
};

export default Meeting;
