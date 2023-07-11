import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              splitImageRightSection {
                splitTitle
                splitDescription
                splitImage {
                  altText
                  sourceUrl
                }
                hideSection
                splitButton {
                  url
                  title
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
      splitImagesRight: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  splitImagesRight: any;
};

const SplitImageRight = (props: MyProps) => {
  const { splitImagesRight } = props;

  return (
    <>
      {splitImagesRight?.map((splitImage) => {
        return (
          <section key={splitImage} className="split_section">
            {splitImage?.HomeLandingPage?.splitImageRightSection?.hideSection ==
            true ? (
              ""
            ) : (
              <Container>
                <Row className="flex-row-reverse">
                  <Col lg={8}>
                    <div className="split_image" style={{
                      position: "relative", width:"80%", height:"100vh"
                    }}>
                      <Image
                        src={
                          splitImage?.HomeLandingPage?.splitImageRightSection
                            ?.splitImage?.sourceUrl
                        }
                        fill
                        alt={
                          splitImage?.HomeLandingPage?.splitImageRightSection
                            ?.splitImage?.altText
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <h3
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageRightSection
                              ?.splitTitle,
                        }}
                      ></h3>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageRightSection
                              ?.splitDescription,
                        }}
                      ></p>
                      {splitImage?.HomeLandingPage?.splitImageRightSection
                        ?.splitButton == null ? (
                        ""
                      ) : (
                        <Link
                          href={
                            splitImage?.HomeLandingPage?.splitImageRightSection
                              ?.splitButton.url
                          }
                        >
                          <Button className="SplitBtn">
                            Get <span>Approved</span>
                          </Button>
                        </Link>
                      )}
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
          </section>
        );
      })}
    </>
  );
};

export default SplitImageRight;
