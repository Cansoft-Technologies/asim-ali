import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import Image from "next/image";
import styles from "scss/components/LocationHero.module.scss";
import ContactSection from "./ContactSection";
import Link from "next/link";

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

function LocationHero({ title = "Hero Title",
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
  usingFor }: Props): JSX.Element {
  var words = title.split(' ');
  var first = words.shift();
  var others = words.join(' ');
  return (
    <section
      className={styles.hero}
      style={{
        position: "relative",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.overlay}>
      <Container>
        <Row className="align-items-center vh-100">
          {/* Left Side - Text */}
          <Col lg={6} className="text-white">
          <div className="location-hero-title-col col-xl-6 offset-xl-6">
              <p className="location-hero-title">
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
        </div>
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
          </Col>

          {/* Right Side - Form */}
          <Col lg={6} className="p-4 form-div d-none d-md-block">
            <p className="mb-4 text-dark service-title">Get in Touch</p>
            <ContactSection />
          </Col>
        </Row>
      </Container>
      </div>
    </section>
  );
}

export default LocationHero;
