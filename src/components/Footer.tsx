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
import { Col, Container, Nav, Row } from "react-bootstrap";
import styles from "scss/components/Footer.module.scss";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
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
        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 50) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems {
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
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
};

const Footer = (props: MyProps) => {
  const { settings, mainMenus } = props;

  const prefixSettings = (settings as any).footerSettings;
  console.log(prefixSettings);

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
                <p> <a href="https://www.google.com/localservices/prolist?g2lbs=AP8S6EN3IKWVUuQe-s9QCEBalb_gaMiInnxlpg7Tqd8x7l2AoaIBk3fI4-BY8xsT0HHRquEGMU5-DyiMtR4i1OWHxJ9QM5YgIaI7xzi1uObNU210zyn2ykkq3Fp5rdkci-x4sPTM-dJl&hl=en-BD&gl=bd&ssta=1&q=mortgage%20broker%20in%20surrey&oq=mortgage%20broker%20in%20surrey&slp=MgA6HENoTUl4SWJUNW9hN2dBTVZwWVJMQlIzWlp3UXhSAggCYAB62AJDaGx0YjNKMFoyRm5aU0JpY205clpYSWdhVzRnYzNWeWNtVjVTT3k4cUlxTXE0Q0FDRm9sRUFBUUFSZ0FHQUVZQXlJWmJXOXlkR2RoWjJVZ1luSnZhMlZ5SUdsdUlITjFjbkpsZVpJQkQyMXZjblJuWVdkbFgySnliMnRsY3BvQkkwTm9Xa1JUVldoT1RVYzVibE13VmtwUk1FWnVVMVZPY0dGdFZteGFiR1JDUlVGRnFnRjdDZ292YlM4d01qY3pkRFYzQ2dzdmJTOHdNVEU0TURoemRBb0pMMjB2TURFM2FqZDVFQUVxRXlJUGJXOXlkR2RoWjJVZ1luSnZhMlZ5S0FBeUh4QUJJaHV6LW9xNjYwSUdYeHg5cHpzNXMyeW5MMUVHN1VzWnI3MWg1a1l5SFJBQ0lobHRiM0owWjJGblpTQmljbTlyWlhJZ2FXNGdjM1Z5Y21WNZIBswIKDS9nLzExYzMwbm43bWQKDS9nLzExYmNjbXJobGcKDS9nLzExZ3huc2NzdGQKDS9nLzExZmp0dms4ajkKDC9nLzEyNHN2NnF0XwoNL2cvMTFiNnhreTFoeAoNL2cvMTFmNmQ3cHprYwoML2cvMTFoMW5jbXByCg0vZy8xMWI2Z2djN2ZuCg0vZy8xMWdsdzQ3M3lmCg0vZy8xMWozMTg1Nm1kCg0vZy8xMWY0MHI5NWowCgsvZy8xdGRzNmQ0OAoNL2cvMTFnc2JmZnlrNwoNL2cvMTFtZzNqXzk1awoML2cvMTFnX3BfM21tCg0vZy8xMWM1NXY2OW1yCg0vZy8xMXEycHJoOGcwCg0vZy8xMWh6anFsOTczCg0vZy8xMW55M2JuamhoEgQSAggBEgQKAggB&src=2&spp=Cg0vZy8xMWMzMG5uN21kOqgCV2lVUUFCQUJHQUFZQVJnRElobHRiM0owWjJGblpTQmljbTlyWlhJZ2FXNGdjM1Z5Y21WNWtnRVBiVzl5ZEdkaFoyVmZZbkp2YTJWeW1nRWpRMmhhUkZOVmFFNU5Semx1VXpCV1NsRXdSbTVUVlU1d1lXMVdiRnBzWkVKRlFVV3FBWHNLQ2k5dEx6QXlOek4wTlhjS0N5OXRMekF4TVRnd09ITjBDZ2t2YlM4d01UZHFOM2tRQVNvVElnOXRiM0owWjJGblpTQmljbTlyWlhJb0FESWZFQUVpRzdQNmlycnJRZ1pmSEgybk96bXpiS2N2VVFidFN4bXZ2V0htUmpJZEVBSWlHVzF2Y25SbllXZGxJR0p5YjJ0bGNpQnBiaUJ6ZFhKeVpYaz0%3D&serdesk=1&lrlstt=1690878931379&ved=2ahUKEwiopsvmhruAAxVuSWwGHfOYAUwQvS56BAhQEAE&scp=ChRnY2lkOm1vcnRnYWdlX2Jyb2tlchJAEhIJW6c_TQPchVQR4JjVq5hIi9IiElN1cnJleSwgQkMsIENhbmFkYSoUDd0fNR0Vgmu7th3qalYdJT-t4LYwABoPbW9ydGdhZ2UgYnJva2VyIhltb3J0Z2FnZSBicm9rZXIgaW4gc3VycmV5Kg9Nb3J0Z2FnZSBicm9rZXI%3D">{prefixSettings?.footerRightWidget?.address}</a></p>
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
                                        {submenu?.label == "Commercial Mortgages" ? (
                                        <ul className="submenu-child">

                                    <li>
                                      <Nav.Link
                                        as={Link}
                                        href={'/commercial-mortgage-in-surrey'}
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
                                        href={'/commercial-mortgage-in-vancouver'}
                                      >
                                        <span
                                          className="link"
                                          onClick={() => submenu.uri}
                                        >
                                          Vancouver
                                        </span>
                                      </Nav.Link>
                                      
                                    </li>
                                        </ul>
                                      ): ""}
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
            <Container>
              <div className="ms-auto my-lg-0 footer-partner-logo">
              {prefixSettings?.footerPartnerLogoSection?.footerPartnerLogo?.map(
                    (singleLogo) => {
                      return (
                        <div key={singleLogo.sourceUrl}>
                          <Image
                            src={singleLogo.sourceUrl}
                            width="120"
                            height="100"
                            alt={singleLogo.altText}
                            style={{ objectFit: "contain", width: "100%" }}
                          />
                        </div>
                      );
                    }
                  )}
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
