import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from 'scss/components/Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import Image from 'next/image';
import {  faFacebookF , faTiktok, faInstagram, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const Footer = () => {
  // const year = new Date().getFullYear();
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
      });
    client
    .query({
      query: gql`query MyQuery {
        settingsOptions {
          asimOptions {
            footerSettings {
              socialUrl {
                facebook
                tiktok
                linkedin
                instagram
              }
              copyrightText
              footerLeftWidget {
                title
                phoneNumber
                emailAddress
              }
              footerLogoSection {
                logoText
                logoUpload {
                  altText
                  sourceUrl
                }
              }
              footerRightWidget {
                title
                address
              }
            }
          }
        }
      }`,
    })
    .then((result) => setSettings(result?.data?.settingsOptions?.asimOptions));
}, []);
const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`
}


const prefixSettings = (settings as any).footerSettings;

const socialNull = prefixSettings?.socialUrl?.facebook == null && prefixSettings?.socialUrl?.tiktok == null && prefixSettings?.socialUrl?.linkedin == null && prefixSettings?.socialUrl?.instagram == null;

  return (
    <footer className={styles.main}>
      <div className="wrap">
          <Container> 
                <Row>
                  <Col lg={4}>
                  <div className="footer-widget">
                      <h3 dangerouslySetInnerHTML={{__html: prefixSettings?.footerLeftWidget.title}} ></h3>
                      <a 
                      href={`mailto:${prefixSettings?.footerLeftWidget?.emailAddress}`}
                      >{prefixSettings?.footerLeftWidget?.emailAddress}</a>

                      <a 
                      href={`tel:${prefixSettings?.footerLeftWidget?.phoneNumber}`}
                      >{prefixSettings?.footerLeftWidget?.phoneNumber}</a>
                      </div>
                  </Col>
                  <Col lg={4}>
                  <div className="footer-logo">
                    <Link href="/" >
                     <Image 
                      src={prefixSettings?.footerLogoSection?.logoUpload?.sourceUrl}
                      loader={myLoader}
                      alt={prefixSettings?.footerLogoSection?.logoUpload?.altText}
                      width="100%" 
                      height="57" 
                      layout="responsive" 
                      objectFit="contain"
                      
                       />
                     
                      </Link>
                      <p className="copyright-text" >{prefixSettings?.footerLogoSection?.logoText}</p>
                      </div>
                    
                  </Col>
                  <Col lg={4}>
                      <div className="footer-widget">
                      <h3 dangerouslySetInnerHTML={{__html: prefixSettings?.footerRightWidget?.title }}></h3>
                      <p>{prefixSettings?.footerRightWidget?.address}</p>
                      </div>
                  </Col>

                </Row>
                <Row>
                  <Col >
                  {socialNull ? "" : (
                    <div className="social-url"> 
                      <ul>
                        {prefixSettings?.socialUrl?.facebook == null ? "" : (
                        <li><a href={prefixSettings?.socialUrl?.facebook}><FontAwesomeIcon icon={faFacebookF} /></a></li>
                        )}
                       
                       {prefixSettings?.socialUrl?.instagram == null ? "" : (
                        <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
                        )}

                        {prefixSettings?.socialUrl?.linkedin == null ? "" : (
                        <li><a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a></li>
                        )}

                         {prefixSettings?.socialUrl?.tiktok == null ? "" : (
                        <li><a href="#"><FontAwesomeIcon icon={faTiktok} /></a></li>
                        )}
                      </ul>
                    </div>
                  )}
                    
                    <div className="copyright-text">
                      <p>{prefixSettings?.copyrightText}</p>
                    </div>
                  </Col>
                </Row>
           </Container>
      </div>
    </footer>
  );
}

export default Footer;
