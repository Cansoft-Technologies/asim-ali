import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "scss/components/Hero.module.scss";

interface Props {
  title: string;
  heading?: string;
  description?: string;
  id?: string;
  bgImage?: string;
  usingFor?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
  buttonLeft?: boolean;
}

function Hero({
  title = "Hero Title",
  heading,
  description,
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
  buttonLeft,
  usingFor,
}: Props): JSX.Element {
  var words = title.split(' ');
  var first = words.shift();
  var others = words.join(' ');
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      style={{ position: "relative"}}
      className={styles.hero}
    >
      <div>
                      <Image
                        alt="Asim Ali Slider"
                        fill
                        src={bgImage}
                        style={{ objectFit: "cover"}}
                        priority={true}
                      />
                    </div>
      <div className={styles.wrap}>
        <div className="hero-title-col col-xl-6 offset-xl-6">
          {
            usingFor === 'blocked' ? (
              <p className="hero-title">
            {first}
              <span>
                {others}
              </span>
          </p>
            ) : (
              <p className="hero-title">
            {title?.split(" ")[0]}
            {title?.split(" ")[1] && title?.split(" ")[2] ? (
              <span>
                {title?.split(" ")[1]} {title?.split(" ")[2]}
              </span>
            ) : (
              <span>{title?.split(" ")[1]}</span>
            )}
            {/* <span>{title?.split(" ")[1]}</span> */}
          </p>
            )
          }
        </div>
        <div className="banner-bottom col-md-11 offset-md-1 mt-5">
          <p className="heading">{heading}</p>
          <p className="description">{description}</p>
          {buttonLeft && (
            <Row className="align-items-center home-slide">
              <Col className={styles.textPosition}>
                {buttonText && buttonURL && (
                  <Link href={buttonURL}>
                    <Button className={styles.bannerBtn}>
                      <span>{buttonText}</span>
                    </Button>
                  </Link>
                )}
                {button2Text && button2URL && (
                  <Link href={button2URL}>
                    <Button className={styles.bannerBtn}>
                      <span>{button2Text}</span>
                    </Button>
                  </Link>
                )}
              </Col>
            </Row>
          )}
        </div>
        {!buttonLeft && (
          <Row className="align-items-center home-slide">
            <Col className="text-center mt-5 link_banner">
              {buttonText && buttonURL && (
                <Link href={buttonURL}>
                  <Button className={styles.bannerBtn}>
                    <span>{buttonText}</span>
                  </Button>
                </Link>
              )}
              {button2Text && button2URL && (
                <Link href={button2URL}>
                  <Button className={styles.bannerBtn}>
                    <span>{button2Text}</span>
                  </Button>
                </Link>
              )}
            </Col>
          </Row>
        )}
      </div>
    </section>
  );
}

export default Hero;
