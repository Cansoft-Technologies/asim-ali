import React from 'react';
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
        <div className="hero-title-col col-md-6 offset-md-6">
        <h1 className="hero-title">{ title.split(" ")[0] } 
        <span>{ title.split(" ")[1] } { title.split(" ")[2] }</span>
       
        </h1>
        <div className={styles.intro}>
          <div className={styles.children}>{children}</div>
          {buttonText && buttonURL && (
            <p>
              <a href={buttonURL} className="button">
                {buttonText}
              </a>
            </p>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
        </div>
        <div className="col-md-11 offset-md-1 mt-5"> 
            <h2>{heading}</h2>
            <p>{description}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
