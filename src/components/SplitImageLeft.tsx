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
              splitImageLeftSection {
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
      splitImagesLeft: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  splitImagesLeft: any;
};

const SplitImageLeft = (props: MyProps) => {
  const { splitImagesLeft } = props;

  return (
    <>
      {splitImagesLeft?.map((splitImage) => {
        return (
          <section key={splitImage} className="split_section">
            {splitImage?.HomeLandingPage?.splitImageLeftSection?.hideSection ==
            true ? (
              ""
            ) : (
              <Container>
                <Row>
                  <Col lg={8}>
                    <div className="split_image">
                      <Image
                        src={
                          splitImage?.HomeLandingPage?.splitImageLeftSection
                            ?.splitImage?.sourceUrl
                        }
                        fill
                        alt={
                          splitImage?.HomeLandingPage?.splitImageLeftSection
                            ?.splitImage?.altText
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className="split_text">
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageLeftSection
                              ?.splitTitle,
                        }}
                      ></div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html:
                            splitImage?.HomeLandingPage?.splitImageLeftSection
                              ?.splitDescription,
                        }}
                      ></div>

                      {splitImage?.HomeLandingPage?.splitImageLeftSection
                        ?.splitButton == null ? (
                        ""
                      ) : (
                        <Link
                          href={
                            splitImage?.HomeLandingPage?.splitImageLeftSection
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

export default SplitImageLeft;
