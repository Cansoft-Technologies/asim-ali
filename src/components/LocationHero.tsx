import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "scss/components/LocationHero.module.scss";
import ScheduleApplyForm from "./ScheduleApplyForm";

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

function LocationHero({
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
  const first = title.split(" ")[0];
  const rest = title.split(" ").slice(1).join(" ");

  return (
    <section className={styles.hero}>
      {/* Background Image */}
      {bgImage && (
        <Image
          src={bgImage}
          alt={title}
          fill
          className={styles.backgroundImage}
          priority
        />
      )}

      {/* Overlay */}
      <div className={styles.overlay}></div>

      {/* Content */}
      <Container>
        <Row className="align-items-center vh-100">
          <Col lg={6} className="text-white">
            <div className="location-hero-title-col col-xl-6 offset-xl-6">
              <p className="location-hero-title">
                {first}
                {rest && <span> {rest}</span>}
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

          <Col lg={6} className="p-4 form-div d-none d-md-block">
            <p className="mb-4 text-dark service-title">Get in Touch</p>
            <ScheduleApplyForm />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LocationHero;
