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
  const words = title.split(" ");
  const first = words.shift();
  const others = words.join(" ");

  return (
    <section
      {...(id && { id })}
      className={styles.hero}
    >
      {bgImage && (
        <Image
          alt="Hero Background"
          src={bgImage}
          fill
          priority
          className={styles.backgroundImage}
        />
      )}
{/* Overlay */}
<div className={styles.overlay}></div>
      <div className={styles.wrap}>
        <div className="hero-title-col col-xl-6 offset-xl-6">
          <p className="hero-title">
            {usingFor === "blocked" ? (
              <>
                {first} <span>{others}</span>
              </>
            ) : (
              <>
                {title.split(" ")[0]}
                {title.split(" ")[1] && title.split(" ")[2] ? (
                  <span>
                    {" "}
                    {title.split(" ")[1]} {title.split(" ")[2]}
                  </span>
                ) : (
                  <span> {title.split(" ")[1]}</span>
                )}
              </>
            )}
          </p>
        </div>

        <div className="banner-bottom col-md-11 offset-md-1 mt-5">
          {heading && <p className="heading">{heading}</p>}
          {description && <p className="description">{description}</p>}

          {buttonLeft ? (
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
          ) : (
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
      </div>
    </section>
  );
}

export default Hero;
