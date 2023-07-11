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
              gallery {
                hideSection
                galleryImage1 {
                  altText
                  sourceUrl
                }
                galleryImage2 {
                  altText
                  sourceUrl
                }
                galleryImage3 {
                  altText
                  sourceUrl
                }
                galleryImage4 {
                  altText
                  sourceUrl
                }
                galleryImage5 {
                  altText
                  sourceUrl
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
      images: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  images: any;
};

const Gallery = (props: MyProps) => {
  const { images } = props;
  return (
    <>
      <div className="gallery_section">
        {images?.map((image) => {
          return (
            <Container key={image}>
              {image?.HomeLandingPage?.gallery?.hideSection === true ? (
                ""
              ) : (
                <Row className="gx-3">
                  <Col>
                    {image?.HomeLandingPage?.gallery?.galleryImage1 == null ? (
                      ""
                    ) : (
                      <div style={{ height: "252px",width:"100%",position:"relative" }}>
                      <Image
                        src={
                          image?.HomeLandingPage?.gallery?.galleryImage1
                            ?.sourceUrl
                        }
                        alt={
                          image?.HomeLandingPage?.gallery?.galleryImage1
                            ?.altText
                        }
                        className="gallery_img"
                        fill
                      />
                      </div>
                    )}
                    <div style={{ height: "20px" }}></div>
                    {image?.HomeLandingPage?.gallery?.galleryImage2 == null ? (
                      ""
                    ) : (
                      <div style={{ height: "252px",width:"100%",position:"relative" }}>
                      <Image
                        src={
                          image?.HomeLandingPage?.gallery?.galleryImage2
                            ?.sourceUrl
                        }
                        alt={
                          image?.HomeLandingPage?.gallery?.galleryImage2
                            ?.altText
                        }
                        className="gallery_img"
                       fill
                      />
                      </div>
                    )}
                  </Col>
                  <Col style={{ display: "flex", alignItems: "center" }}>
                    {image?.HomeLandingPage?.gallery?.galleryImage3 == null ? (
                      ""
                    ) : (
                      <div style={{ height: "100%",width:"100%",position:"relative" }}>
                      <Image
                        src={
                          image?.HomeLandingPage?.gallery?.galleryImage3
                            ?.sourceUrl
                        }
                        alt={
                          image?.HomeLandingPage?.gallery?.galleryImage3
                            ?.altText
                        }
                        className="gallery_img"
                        fill
                      />
                      </div>
                    )}
                  </Col>
                  <Col>
                    {image?.HomeLandingPage?.gallery?.galleryImage4 == null ? (
                      ""
                    ) : (
                      <div style={{ height: "252px",width:"100%",position:"relative" }}>
                      <Image
                        src={
                          image?.HomeLandingPage?.gallery?.galleryImage4
                            ?.sourceUrl
                        }
                        alt={
                          image?.HomeLandingPage?.gallery?.galleryImage4
                            ?.altText
                        }
                        className="gallery_img"
                        fill
                      />
                      </div>
                    )}
                    <div style={{ height: "20px" }}></div>
                    {image?.HomeLandingPage?.gallery?.galleryImage5 == null ? (
                      ""
                    ) : (
                      <div style={{ height: "252px",width:"100%",position:"relative" }}>
                      <Image
                        src={
                          image?.HomeLandingPage?.gallery?.galleryImage5
                            ?.sourceUrl
                        }
                        alt={
                          image?.HomeLandingPage?.gallery?.galleryImage5
                            ?.altText
                        }
                        className="gallery_img"
                        fill
                      />
                      </div>
                    )}
                  </Col>
                </Row>
              )}
            </Container>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;
