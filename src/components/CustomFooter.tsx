import { gql } from "@apollo/client";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apolloClient } from "lib/apollo";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Nav, Row } from "react-bootstrap";
import styles from "scss/components/Footer.module.scss";

const CustomFooter = () => {
  // const year = new Date().getFullYear();
  const [settings, setSettings] = useState([]);
  const [mainMenus, setMainMenus] = useState([]);
  useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query MyQuery {
            settingsOptions {
              AsimOptions {
                footerSettings {
                  socialUrl {
                    facebook
                    tiktok
                    linkedin
                    instagram
                  }
                  footerPartnerLogoSection {
                    footerPartnerLogo {
                      altText
                      sourceUrl
                    }
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
          }
        `,
      })
      .then((result) =>
        setSettings(result?.data?.settingsOptions?.AsimOptions)
      );

    apolloClient
      .query({
        query: gql`
          {
            menus(where: { location: PRIMARY }) {
              nodes {
                name
                slug
                menuItems(first: 150) {
                  nodes {
                    url
                    target
                    parentId
                    label
                    cssClasses
                    description
                    id
                    childItems(first: 50) {
                      nodes {
                        uri
                        label
                      }
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        setMainMenus(result?.data?.menus?.nodes);
      });
  }, []);

  const prefixSettings = (settings as any).footerSettings;

  const socialNull =
    prefixSettings?.socialUrl?.facebook == null &&
    prefixSettings?.socialUrl?.tiktok == null &&
    prefixSettings?.socialUrl?.linkedin == null &&
    prefixSettings?.socialUrl?.instagram == null;

  return (
    <footer className={styles.main}>
      <div className="wrap">
        <Container>
          <Row>
            <Col lg={4}>
              <div className="footer-widget">
                <p
                  className="widget_title"
                  dangerouslySetInnerHTML={{
                    __html: prefixSettings?.footerLeftWidget.title,
                  }}
                ></p>
                <a
                  href={`mailto:${prefixSettings?.footerLeftWidget?.emailAddress}`}
                >
                  {prefixSettings?.footerLeftWidget?.emailAddress}
                </a>

                <a
                  href={`tel:${prefixSettings?.footerLeftWidget?.phoneNumber}`}
                >
                  {prefixSettings?.footerLeftWidget?.phoneNumber}
                </a>
              </div>
            </Col>
            <Col lg={4}>
              <div className="footer-logo">
                <Link href="/">
                  <Image
                    src={
                      prefixSettings?.footerLogoSection?.logoUpload?.sourceUrl
                    }
                    alt={prefixSettings?.footerLogoSection?.logoUpload?.altText}
                    width="190"
                    height="108"
                    
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Link>
                <p className="copyright">
                  {prefixSettings?.footerLogoSection?.logoText}
                </p>
              </div>
            </Col>
            <Col lg={4}>
              <div className="footer-widget">
                <p
                  className="widget_title"
                  dangerouslySetInnerHTML={{
                    __html: prefixSettings?.footerRightWidget?.title,
                  }}
                ></p>
                <p>{prefixSettings?.footerRightWidget?.address}</p>
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <div className="ms-auto py-5 my-5 my-lg-0 footer-menu">
                {mainMenus.map((link) => {
                  return (
                    <ul key={`${link.label}$-menu`}>
                      {link.menuItems.nodes.map((item) => {
                        return (
                          <li key={`${item.label}$-menu`}>
                            {item.parentId == null ? (
                              <span>
                                <Nav.Link href={`${item.url}`}>
                                  <span
                                    className="link"
                                    onClick={() => item.url}
                                  >
                                    {item.label}
                                  </span>
                                </Nav.Link>
                                <ul className="submenu">
                                  {item.childItems.nodes.map((submenu) => {
                                    return (
                                      <li key={submenu.uri}>
                                        <Nav.Link
                                          as={Link}
                                          href={`${submenu.uri}`}
                                        >
                                          <span
                                            className="link"
                                            onClick={() => submenu.uri}
                                          >
                                            {submenu.label}
                                          </span>
                                        </Nav.Link>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </span>
                            ) : (
                              ""
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  );
                })}
              </div>
            </Container>
          </Row>
          <Row>
            <Col>
              {socialNull ? (
                ""
              ) : (
                <div className="social-url">
                  <ul>
                    {prefixSettings?.socialUrl?.facebook == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Facebook"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.facebook}
                        >
                          <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                      </li>
                    )}

                    {prefixSettings?.socialUrl?.instagram == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Instagram"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.instagram}
                        >
                          <FontAwesomeIcon icon={faInstagram} />
                        </a>
                      </li>
                    )}

                    {prefixSettings?.socialUrl?.linkedin == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="Linkedin"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.linkedin}
                        >
                          <FontAwesomeIcon icon={faLinkedinIn} />
                        </a>
                      </li>
                    )}

                    {prefixSettings?.socialUrl?.tiktok == null ? (
                      ""
                    ) : (
                      <li>
                        <a
                          title="TikTok"
                          target="__blank"
                          href={prefixSettings?.socialUrl?.tiktok}
                        >
                          <FontAwesomeIcon icon={faTiktok} />
                        </a>
                      </li>
                    )}
                  </ul>
                </div>
              )}

              <div
                className="copyright-text"
                dangerouslySetInnerHTML={{
                  __html: prefixSettings?.copyrightText,
                }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default CustomFooter;
