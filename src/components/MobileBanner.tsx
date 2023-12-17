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
        <div>
          <div
            style={{
              position: "relative",
              height: "500px",
              width: "100%",
              clipPath: "inset(0 0 0 0)",
              zIndex: 0,
            }}
          >
            <Image
              alt="Asim Ali Slider"
              src={msliders?.homeSlider[0].mobileImage?.sourceUrl}
              fill
              style={{ objectFit: "cover" }}
              priority={true}
            />
          </div>

          <BannerInfo slide={msliders?.homeSlider[0]} />
        </div>
      </div>
    </div>
  );
};

const BannerInfo = ({ slide }) => {
  return (
    <div>
      <div className={styles.bannerDescStyle}>
        <Row className="align-items-center">
          <Col className="text-center" xs={12} lg="6">
            <div className={styles.bannerCaption}>
              <p className={styles.sliderSubtitle}>
                {slide?.sliderSubtitle || ""}
              </p>
              <p className={styles.sliderTitle}>{slide?.sliderTitle || ""}</p>
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
      </div>
    </div>
  );
};

export default MobileBanner;
