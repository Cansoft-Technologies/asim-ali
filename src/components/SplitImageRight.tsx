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
                splitImagesRight {
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
          <section className="split_section">
              <Container>
                <Row className="flex-row-reverse">
                  <Col lg={8}>
                    <div className="split_image">
                      <Image
                        src={
                          splitImagesRight
                            ?.splitImage?.sourceUrl
                        }
                        fill
                        alt={
                          splitImagesRight
                            ?.splitImage?.altText
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <h2
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImagesRight
                              ?.splitTitle,
                        }}
                      ></h2>
                      <p
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImagesRight
                              ?.splitDescription,
                        }}
                      ></p>
                      {splitImagesRight
                        ?.splitButton == null ? (
                        ""
                      ) : (
                        <Link
                          href={
                            splitImagesRight
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
          </section>
    </>
  );
};

export default SplitImageRight;
