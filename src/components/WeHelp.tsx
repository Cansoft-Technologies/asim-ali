import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              weHelpSection {
                helpTitle
                helpDescription
                hideSection
                helpImage {
                  mediaItemUrl
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
      helps: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  helps: any;
};

const WeHelp = (props: MyProps) => {
  const { helps } = props;
console.log(helps);
  return (
    <>
      {helps?.map((help) => {
        return (
          <div key={help?.HomeLandingPage?.weHelpSection}>
            {help?.HomeLandingPage?.weHelpSection?.hideSection == true ? (
              ""
            ) : (
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
                            src={
                              help?.HomeLandingPage?.weHelpSection?.helpImage
                                ?.mediaItemUrl
                            }
                          />
                        </video>
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div className="wehelp_desc">
                      <div className="wehelp_text">
                        <div
                          className="wehelp_title"
                          dangerouslySetInnerHTML={{
                            __html:
                              help?.HomeLandingPage?.weHelpSection?.helpTitle,
                          }}
                        ></div>
                        <div
                          className="wehelp_description"
                          dangerouslySetInnerHTML={{
                            __html:
                              help?.HomeLandingPage?.weHelpSection
                                ?.helpDescription,
                          }}
                        ></div>
                        {help?.HomeLandingPage?.weHelpSection
                        ?.helpButton == null ? (
                        ""
                      ) : (
                        <Link
                          href={
                            help?.HomeLandingPage?.weHelpSection
                        ?.helpButton?.url
                          }
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
            )}
          </div>
        );
      })}
    </>
  );
};

export default WeHelp;
