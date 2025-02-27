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
                  href={`mailto:${
                    usingFor === "apply-now"
                      ? "clientcare@asimali.ca"
                      : prefixSettings?.footerLeftWidget?.emailAddress
                  }`}
                >
                  {usingFor === "apply-now"
                    ? "clientcare@asimali.ca"
                    : prefixSettings?.footerLeftWidget?.emailAddress}
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
                <div className="footer-logo-image">
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
                <Link href="/">
                  <Image
                    src='https://asimaliprod.wpengine.com/wp-content/uploads/2024/12/AIMI-Without-Backgroun_White-Text.png'
                    alt={prefixSettings?.footerLogoSection?.logoUpload?.altText}
                    width="130"
                    height="108"
                    style={{ objectFit: "cover" }}
                  />
                </Link>
                </div>
                <Link href="https://dominionlending.ca/mortgage-broker/asimali">
                <p className="copyright mt-3">
                  {prefixSettings?.footerLogoSection?.logoText}
                </p></Link>
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
                {mainMenus?.map((link, index: number) => {
                  return (
                    <ul key={index}>
                      {link.menuItems.nodes.map((item, idx: number) => {
                        return (
                          <li key={idx}>
                            {item.parentId == null ? (
                              <span>
                                <Nav.Link
                                  href={`${
                                    item.url.endsWith("/")
                                      ? item.url.slice(0, -1)
                                      : item.url
                                  }`}
                                >
                                  <span className="link">{item.label}</span>
                                </Nav.Link>
                                <ul className="submenu">
                                  {item.childItems.nodes.map(
                                    (submenu, id: number) => {
                                      return (
                                        <li key={id}>
                                          <span>
                                            <Nav.Link
                                              as={Link}
                                              href={`${
                                                submenu.uri.endsWith("/")
                                                  ? submenu.uri.slice(0, -1)
                                                  : submenu.uri
                                              }`}
                                            >
                                              <span className="link">
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
                                                      "/commercial-mortgage-in-bc"
                                                    }
                                                  >
                                                    <span className="link">
                                                      British Columbia
                                                    </span>
                                                  </Nav.Link>
                                                </li>
                                                <li>
                                                  <Nav.Link
                                                    as={Link}
                                                    href={
                                                      "/commercial-mortgage-in-surrey"
                                                    }
                                                  >
                                                    <span className="link">
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
                                                    <span className="link">
                                                      Vancouver
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
                                    }
                                  )}
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
