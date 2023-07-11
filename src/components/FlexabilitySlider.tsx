import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              flexabilitySlider {
                sliderTitle
                sliderSubtitle
                sliderDescription
                sliderImage {
                  altText
                  sourceUrl
                }
                sliderButtonUrl {
                  url
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
      flexsliders: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  flexsliders: any;
};

const FlexabilitySlider = (props: MyProps) => {
  const { flexsliders } = props;

  return (
    <>
      <div className="flexability-slider">
        <Carousel fade>
          {flexsliders?.map(function (slider) {
            return slider?.HomeLandingPage?.flexabilitySlider == null
              ? ""
              : slider?.HomeLandingPage?.flexabilitySlider.map((slide) => {
                  return (
                    <Carousel.Item key={slide.sliderTitle}>
                      <div className="overlay"></div>
                      <div className="slider-images" style={{
                        position: "relative",
                        height: "80vh",
                        width: "100%",
                      }}>
                        <Image
                          src={slide?.sliderImage?.sourceUrl}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          alt={slide?.sliderImage?.altText}
                          fill
                        />
                      </div>
                      <div className={styles.overlay}>
                        <Carousel.Caption className="carouselcaption">
                          <Row className="align-items-center home-slide">
                            <Col className="text-start" xs={12} lg="6">
                              <div className="bannerCaption">
                                <p className="sliderTitle">
                                  {slide?.sliderTitle}
                                </p>
                                <p className="sliderSubtitle">
                                  {slide?.sliderSubtitle}
                                </p>
                                <p>{slide?.sliderDescription}</p>
                                <Link href={slide?.sliderButtonUrl?.url}>
                                  <Button className="bannerBtn">
                                    Get <span>Approved</span>
                                  </Button>
                                </Link>
                              </div>
                            </Col>
                          </Row>
                        </Carousel.Caption>
                      </div>
                    </Carousel.Item>
                  );
                });
          })}
        </Carousel>
      </div>
    </>
  );
};

export default FlexabilitySlider;
