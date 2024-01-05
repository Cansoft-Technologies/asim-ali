import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Col, Container, Nav, Row } from "react-bootstrap";
import styles from "scss/components/Footer.module.scss";

type MyProps = {
  settings: any;
  mainMenus: any;
  usingFor?: string;
};

const Footer = (props: MyProps) => {
  const { settings, mainMenus, usingFor } = props;

  const prefixSettings = (settings as any)?.footerSettings;

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
                  href={`mailto:${usingFor === 'apply-now' ? 'clientcare@asimali.ca' : prefixSettings?.footerLeftWidget?.emailAddress}`}
                >
                  {usingFor === 'apply-now' ? 'clientcare@asimali.ca' : prefixSettings?.footerLeftWidget?.emailAddress}
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
                    style={{ objectFit: "cover" }}
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
                <p>
                  <a href="https://g.co/kgs/Bm6p54">
                    {prefixSettings?.footerRightWidget?.address}
                  </a>
                </p>
              </div>
            </Col>
          </Row>
          <Row>
            <Container>
              <div className="ms-auto py-5 my-5 my-lg-0 footer-menu">
                {mainMenus?.map((link) => {
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
                                        <span>
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
                                          {submenu?.label ==
                                          "Commercial Mortgages" ? (
                                            <ul className="submenu-child">
                                              <li>
                                                <Nav.Link
                                                  as={Link}
                                                  href={
                                                    "/commercial-mortgage-in-surrey"
                                                  }
                                                >
                                                  <span
                                                    className="link"
                                                    onClick={() => submenu.uri}
                                                  >
                                                    Surrey
                                                  </span>
                                                </Nav.Link>
                                              </li>
                                              <li>
                                                <Nav.Link
                                                  as={Link}
                                                  href={
                                                    "/commercial-mortgage-in-vancouver"
                                                  }
                                                >
                                                  <span
                                                    className="link"
                                                    onClick={() => submenu.uri}
                                                  >
                                                    Vancouver
                                                  </span>
                                                </Nav.Link>
                                              </li>
                                              <li>
                                                <Nav.Link
                                                  as={Link}
                                                  href={
                                                    "/commercial-mortgage-in-bc"
                                                  }
                                                >
                                                  <span
                                                    className="link"
                                                    onClick={() => submenu.uri}
                                                  >
                                                    British Columbia
                                                  </span>
                                                </Nav.Link>
                                              </li>
                                            </ul>
                                          ) : (
                                            ""
                                          )}
                                        </span>
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
                <div className="social-url mt-3">
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

export default Footer;
