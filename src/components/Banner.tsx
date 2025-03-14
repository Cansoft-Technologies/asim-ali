import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import styles from "scss/components/Banner.module.scss";

type MyProps = {
  sliders: any;
};

const Banner = (props: MyProps) => {
  const { sliders } = props;

  return (
    <div>
      <div className="home-slider">
        <Head>
          <link
            rel="preload"
            href={sliders.homeSlider[0].sliderImage.sourceUrl}
            as="image"
          />
        </Head>

        <div>
          {sliders?.homeSlider.map((slide) => {
            return (
              <div key={slide?.sliderTitle}>
                <div
                  style={{
                    position: "relative",
                    height: "100vh",
                    width: "100%",
                    clipPath: "inset(0 0 0 0)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: "0",
                      top: "0",
                    }}
                  >
                    <div className="slider-images">
                      <Image
                        alt="Asim Ali Slider"
                        fill
                        src={slide?.sliderImage?.sourceUrl}
                        style={{ objectFit: "cover"}}
                        
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.banner_overlay}>
                  <div className={styles.carouselcaption}>
                    <Row className="align-items-center home-slide">
                      <Col className="text-start" xs={12} lg={10}>
                        <div className={styles.bannerCaption}>
                          <p className={styles.sliderTitle}>
                            {slide?.sliderTitle || ""}
                          </p>
                          <p className={styles.sliderSubtitle}>
                            {slide?.sliderSubtitle || ""}
                          </p>
                          <p>{slide?.sliderDescription || ""}</p>
                        </div>
                        {slide?.sliderButtonUrl == null ? (
                          ""
                        ) : (
                          <Col
                            className="text-start mt-5 link_banner"
                            xs={12}
                            lg="12"
                          >
                            <Link
                              href={`${
                                slide?.sliderButtonUrl?.url?.endsWith("/")
                                  ? slide?.sliderButtonUrl?.url?.slice(0, -1)
                                  : slide?.sliderButtonUrl?.url
                              }`}
                            >
                              <Button className={styles.bannerBtn}>
                                <span>Contact Us</span>
                              </Button>
                            </Link>
                            <Link href="/apply-now">
                              <Button className={styles.bannerBtn}>
                                <span>Apply Now</span>
                              </Button>
                            </Link>
                          </Col>
                        )}
                      </Col>
                    </Row>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Banner;
