import Link from 'next/link';
import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import styles from 'scss/components/Hero.module.scss';

interface Props {
  title: string;
  heading?: string;
  description?: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
}

function Hero({
  title = 'Hero Title',
  heading,
  description,
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
}: Props): JSX.Element {
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
      className={styles.hero}>
      <div className={styles.wrap}>
        <div className="hero-title-col col-xl-6 offset-xl-6">
          <p className="hero-title">{title?.split(" ")[0]}
            <span>{title?.split(" ")[1]}</span>
          </p>
        </div>
        <div className="banner-bottom col-md-11 offset-md-1 mt-5">
          <p className='heading'>{heading}</p>
          <p className='description'>{description}</p>
        </div>
        <Row className="align-items-center home-slide">
        <Col className="text-center mt-5 link_banner">
            {/* <div className={styles.children}>{children}</div> */}
            {buttonText && buttonURL && (
              <Link href={buttonURL}>
              <Button className={styles.bannerBtn}>
              {buttonText}
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
      </div>
    </section>
  );
}

export default Hero;
