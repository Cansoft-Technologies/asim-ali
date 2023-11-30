import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";

type MyProps = {
  msliders: any;
};

const MobileBanner = (props: MyProps) => {
  const { msliders } = props;

  return (
    <div>
      <div className="home-slider">
        <Head>
          <link
            rel="preload"
            href={msliders?.homeSlider[0].mobileImage?.sourceUrl}
            as="image"
          />
        </Head>

        <Carousel fade controls={false}>
          {msliders?.homeSlider.map(
            (slide, idx) => {
              return (
                <Carousel.Item key={idx}>
                  <div
                    className={styles.overlay}
                    style={{
                      position: "relative",
                      height: "500px",
                      width: "100%",
                      clipPath: "inset(0 0 0 0)",
                    }}
                  ></div>
                  <div>
                    <Image
                      alt="Asim Ali Slider"
                      src={slide?.mobileImage?.sourceUrl}
                      fill
                      priority={true}
                    />
                  </div>

                  <div className={styles.overlay}>
                    <Carousel.Caption className={styles.carouselcaption}>
                      <Row className="align-items-center">
                        <Col className="text-center" xs={12} lg="6">
                          <div className={styles.bannerCaption}>
                            <p className={styles.sliderSubtitle}>
                              {slide?.sliderSubtitle || ""}
                            </p>
                            <p className={styles.sliderTitle}>
                              {slide?.sliderTitle || ""}
                            </p>
                            <p>{slide?.sliderDescription || ""}</p>
                          </div>
                        </Col>
                        {slide.sliderButtonUrl == null ? (
                          ""
                        ) : (
                          <Col className="text-center mt-0" xs={12} lg="6">
                            <Link href={slide.sliderButtonUrl.url}>
                              <Button className={styles.bannerBtn}>
                                Get <span>Approved</span>
                              </Button>
                            </Link>
                            <Link href="/apply-now">
                              <Button className={styles.bannerBtn}>
                                <span>Apply Now</span>
                              </Button>
                            </Link>
                          </Col>
                        )}
                      </Row>
                    </Carousel.Caption>
                  </div>
                </Carousel.Item>
              );
            } 
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default MobileBanner;
