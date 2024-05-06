import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import styles from "scss/components/Banner.module.scss";
import "react-multi-carousel/lib/styles.css";

type MyProps = {
  teams: any;
};

const Team = (props: MyProps) => {
  const { teams } = props;
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Container>
        <div>
          {teams?.hideSection == true ? (
            ""
          ) : (
            <div
              className="team_section my-5"
              style={{
                backgroundImage: `url("${teams?.teamImage?.sourceUrl}")`,
                backgroundSize: "cover",
              }}
            >
              {
                teams?.teamTitle && teams?.teamDescription && (
                  <div className={styles.overlay}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: teams?.teamTitle,
                  }}
                ></div>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: teams?.teamDescription,
                  }}
                ></div>
              {
                teams?.teamImages && (
                  <Container className="my-5 slide-div">
                {teams?.teamImages === null ? (
                  ""
                ) : (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                  >
                    {teams?.teamImages?.map((slide, i) => {
                      return (
                        <div key={i} className="slide-card">
                  <a href={slide?.linkUrl}>
                  <Image
                    src={slide?.image?.sourceUrl}
                    width="150"
                    height="150"
                    alt={slide?.image?.altText}
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    quality={100}
                  />
                  </a>
                </div>
                      );
                    })}
                  </Carousel>
                )}
                </Container>
                )
              }
              </div>
                )
              }
            </div>
          )}
        </div>
      </Container>
    </>
  );
};

export default Team;
