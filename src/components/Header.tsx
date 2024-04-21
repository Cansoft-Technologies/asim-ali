import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

type MyProps = {
  settings: any;
  mainMenus: any;
  usingFor?: string;
};

function Header(props: MyProps) {
  const { settings, mainMenus, usingFor } = props;
  console.log(mainMenus);

  return (
    <>
      <Container style={{ maxWidth: "100%", backgroundColor: "#12143a" }}>
        <Container style={{ maxWidth: "1450px" }}>
          <div className="top-nav">
            <p className="brand-mail">
              <a
                href={`mailto:${
                  usingFor === "apply-now"
                    ? "clientcare@asimali.ca"
                    : "clientcare@asimali.ca"
                }`}
                className=""
              >
                <span style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  {usingFor === "apply-now"
                    ? "clientcare@asimali.ca"
                    : "clientcare@asimali.ca"}
                </span>
              </a>{" "}
              <span>| Licensed in BC & AB</span>
            </p>
            <a href="tel:+1 (604) 591 3590">
              <p className="brand-cell">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faPhone} />{" "}
                </span>
                +1 (604) 591 3590{" "}
              </p>
            </a>
          </div>
        </Container>
      </Container>
      <Navbar expand="lg">
        <Container style={{ maxWidth: "1450px" }}>
          <Navbar.Brand>
            {settings?.headerSettings?.uploadLogo == null ? (
              ""
            ) : (
              <Link href="/">
                <Image
                  src={settings?.headerSettings?.uploadLogo?.sourceUrl}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={180}
                  height={43}
                  className="desc-logo"
                />
              </Link>
            )}
            {settings?.headerSettings?.uploadLogoMobile == null ? (
              ""
            ) : (
              <Link href="/">
                <Image
                  src={settings?.headerSettings?.uploadLogoMobile?.sourceUrl}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={180}
                  height={43}
                  className="mobile-logo"
                />
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
              {mainMenus?.map((link, index: number) => {
                return (
                  <ul key={index}>
                    {link.menuItems.nodes.map((item, idx: number) => {
                      return (
                        <li key={idx}>
                          {item.parentId == null ? (
                            <span>
                              <Nav.Link
                                as={Link}
                                href={`${
                                  item.url.endsWith("/")
                                    ? item.url.slice(0, -1)
                                    : item.url
                                }`}
                              >
                                <span className="link">{item.label}</span>
                              </Nav.Link>
                              {item.label !== "Current Rates" && (
                                <ul className="submenu">
                                  {item.childItems.nodes.map(
                                    (submenu, id: number) => {
                                      if (
                                        submenu.label !== "FTHBI Calculator" &&
                                        submenu.label !==
                                          "Readvanceable Mortgage"
                                      ) {
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
                                                <span className="sublink">
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
                                                      <span className="sublink">
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
                                                      <span className="sublink">
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
                                                      <span className="sublink">
                                                        Vancouver
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                </ul>
                                              ) : (
                                                ""
                                              )}
                                              {submenu?.label ==
                                              "Vancouver" ? (
                                                <ul className="submenu-child">
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-fairview"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                        Fairview
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-gastown"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                      Gastown
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-kerrisdale"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                      Kerrisdale
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-kitsilano"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                        Kitsilano
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-mount-pleasant"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                      Mount Pleasant
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-oakridge"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                      Oakridge
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-shaughnessy"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                      Shaughnessy
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-yaletown"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                        Yaletown
                                                      </span>
                                                    </Nav.Link>
                                                  </li>

                                                </ul>
                                              ) : (
                                                ""
                                              )}
                                              {submenu?.label ==
                                              "Surrey" ? (
                                                <ul className="submenu-child">
                                                  <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/mortgage-broker-in-cloverdale"
                                                      }
                                                    >
                                                      <span className="sublink">
                                                        Cloverdale
                                                      </span>
                                                    </Nav.Link>
                                                  </li>
                                                  {/* <li>
                                                    <Nav.Link
                                                      as={Link}
                                                      href={
                                                        "/commercial-mortgage-in-surrey"
                                                      }
                                                    >
                                                      <span className="sublink">
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
                                                      <span className="sublink">
                                                        Vancouver
                                                      </span>
                                                    </Nav.Link>
                                                  </li> */}
                                                </ul>
                                              ) : (
                                                ""
                                              )}
                                            </span>
                                          </li>
                                        );
                                      }
                                    }
                                  )}
                                </ul>
                              )}
                            </span>
                          ) : (
                            ""
                          )}
                        </li>
                      );
                    })}
                    <li>
                      <Nav.Link href="/apply-now">
                        <Button className="HeadBtn">
                          <span>Apply Now</span>
                        </Button>
                      </Nav.Link>
                    </li>
                  </ul>
                );
              })}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
