import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

type MyProps = {
  settings: any;
  mainMenus: any;
  usingFor?: string;
};

function Header(props: MyProps) {
  const { settings, mainMenus, usingFor } = props;
  const [alignmentClasses, setAlignmentClasses] = useState([]);

  useEffect(() => {
    const updateAlignmentClasses = () => {
      const newAlignmentClasses = [];
      mainMenus.forEach((link, index) => {
        link.menuItems.nodes.forEach((item, idx) => {
          const submenuRef = document.getElementById(`submenu-${index}-${idx}`);
          if (submenuRef) {
            const submenuLeft = submenuRef.getBoundingClientRect().left;
            const submenuWidth = submenuRef.offsetWidth;
            const windowWidth = window.innerWidth;

            if (submenuLeft + submenuWidth > windowWidth) {
              newAlignmentClasses.push('right-aligned');
            } else {
              newAlignmentClasses.push('left-aligned');
            }
          }
        });
      });
      setAlignmentClasses(newAlignmentClasses);
    };

    updateAlignmentClasses();
    window.addEventListener('resize', updateAlignmentClasses);

    return () => {
      window.removeEventListener('resize', updateAlignmentClasses);
    };
  }, [mainMenus]);
  return (
    <>
      <div style={{ maxWidth: "100%" }} className="bg-[#12143a] md:px-5 px-3">
        <div>
          <div className="!flex !justify-between !items-center !flex-row pt-3">
            <div className="">
              <p className="brand-mail">
              <a
                href={`mailto:${
                  usingFor === "apply-now"
                    ? "clientcare@asimali.ca"
                    : "clientcare@asimali.ca"
                }`}
                className="!no-underline"
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
            </div>
            <div className="">
              <a href="tel:+1 (604) 591 3590" className="!no-underline">
              <p className="brand-cell">
                {" "}
                <span>
                  <FontAwesomeIcon icon={faPhone} />{" "}
                </span>
                +1 (604) 591 3590{" "}
              </p>
            </a>
            </div>
          </div>
        </div>
      </div>
      <Navbar expand="lg" sticky="top" className="bg-white text-white">
        <Container style={{ maxWidth: "1450px" }}>
          <Navbar.Brand>
            {settings?.headerSettings?.uploadLogo == null ? (
              ""
            ) : (
              <div className="header-logo-image">
              <Link href="/">
                <Image
                  src={settings?.headerSettings?.uploadLogo?.sourceUrl}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={160}
                  height={43}
                  className="desc-logo"
                />
              </Link>
              <Link href="/">
                <Image
                  src='https://asimaliprod.wpengine.com/wp-content/uploads/2024/12/AIMI-logo.png'
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={70}
                  height={43}
                  className="desc-logo"
                />
              </Link>
              </div>
            )}
            {settings?.headerSettings?.uploadLogoMobile == null ? (
              ""
            ) : (
              <div className="header-logo-image">
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
              <Link href="/">
                <Image
                  src='https://asimaliprod.wpengine.com/wp-content/uploads/2024/12/AIMI-logo.png'
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={80}
                  height={43}
                  className="mobile-logo"
                />
              </Link>
              </div>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
      <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
        {mainMenus?.map((link, index) => (
          <ul key={index}>
            {link.menuItems.nodes.map((item, idx) => (
              <li key={idx}>
                {item.parentId == null ? (
                  <span>
                    {item.label !== 'Our Locations' && 
                    <Nav.Link
                      as={Link}
                      href={item.url.endsWith('/') ? item.url.slice(0, -1) : item.url}
                    >
                       <span className="link">{item.label}</span>
                      {/* <span className="link">{item.label}</span> */}
                    </Nav.Link>
                    }
                    {item.label === 'Our Services' ? (
                      <ul
                        className={`submenu ${alignmentClasses[index + '-' + idx]}`}
                        id={`submenu-${index}-${idx}`}
                      >
                        {item.childItems.nodes.map((submenu, id) => {
                          if (
                            submenu.label !== 'FTHBI Calculator' &&
                            submenu.label !== 'Mortgage Payment Calculator' &&
                            submenu.label !== 'Refinance Calculator'
                          ) {
                            return (
                              <li
                                key={id}
                                className={
                                   submenu.label === 'Commercial Mortgages' ? 'commercial-mortgages' : submenu.label === 'Vancouver' ? 'vancouver' : submenu.label === 'Surrey' ? 'surrey' : ''
                                }
                              >
                                <span>
                                  <Nav.Link
                                    as={Link}
                                    href={
                                      submenu.uri.endsWith('/')
                                        ? submenu.uri.slice(0, -1)
                                        : submenu.label === 'Surrey'
                                        ? '/'
                                        : submenu.uri
                                    }
                                  >
                                    <span className="sublink">{submenu.label}</span>
                                  </Nav.Link>
                                  <ul className="submenu-child">
                                    {submenu.label === 'Commercial Mortgages' && (
                                      <>
                                        <li>
                                          <Nav.Link as={Link} href="/commercial-mortgage-in-bc">
                                            <span className="sublink">British Columbia</span>
                                          </Nav.Link>
                                        </li>
                                        <li>
                                          <Nav.Link as={Link} href="/commercial-mortgage-in-surrey">
                                            <span className="sublink">Surrey</span>
                                          </Nav.Link>
                                        </li>
                                        <li>
                                          <Nav.Link as={Link} href="/commercial-mortgage-in-vancouver">
                                            <span className="sublink">Vancouver</span>
                                          </Nav.Link>
                                        </li>
                                      </>
                                    )}
                                  </ul>
                                </span>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    ) 
                    : item.label === 'Our Locations' ? null
                    : item.label === 'How It Works' ? (
                      <ul
                        className={`submenu_level`}
                        id={`submenu-${index}-${idx}`}
                      >
                        {item.childItems.nodes.map((submenu, id) => {
                          if (
                            submenu.label !== 'FTHBI Calculator' &&
                            submenu.label !== 'Readvanceable Mortgage'
                          ) {
                            return (
                              <li
                                key={id}
                                className={
                                   submenu.label === 'Commercial Mortgages' ? 'commercial-mortgages' : submenu.label === 'Vancouver' ? 'vancouver' : submenu.label === 'Surrey' ? 'surrey' : ''
                                }
                              >
                                <span>
                                  <Nav.Link
                                    as={Link}
                                    href={
                                      submenu.uri.endsWith('/')
                                        ? submenu.uri.slice(0, -1)
                                        : submenu.label === 'Surrey'
                                        ? '/'
                                        : submenu.uri
                                    }
                                  >
                                    <span className="sublink">{submenu.label}</span>
                                  </Nav.Link>
                                </span>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    ): (
                      <ul
                        className={`submenu_level`}
                        id={`submenu-${index}-${idx}`}
                      >
                        {item.childItems.nodes.map((submenu, id) => {
                          if (
                            submenu.label !== 'FTHBI Calculator' &&
                            submenu.label !== 'Readvanceable Mortgage'
                          ) {
                            return (
                              <li
                                key={id}
                                className={
                                   submenu.label === 'Commercial Mortgages' ? 'commercial-mortgages' : submenu.label === 'Vancouver' ? 'vancouver' : submenu.label === 'Surrey' ? 'surrey' : ''
                                }
                              >
                                <span>
                                  <Nav.Link
                                    as={Link}
                                    href={
                                      submenu.uri.endsWith('/')
                                        ? submenu.uri.slice(0, -1)
                                        : submenu.label === 'Surrey'
                                        ? '/'
                                        : submenu.uri
                                    }
                                  >
                                    <span className="sublink">{submenu.label}</span>
                                  </Nav.Link>
                                </span>
                              </li>
                            );
                          }
                          return null;
                        })}
                      </ul>
                    )}
                    
                  </span>
                ) : (
                  ''
                )}
              </li>
            ))}
            <li>
              <Nav.Link href="/apply-now">
                <Button className="HeadBtn">
                  <span>Apply Now</span>
                </Button>
              </Nav.Link>
            </li>
          </ul>
        ))}
      </Nav>
    </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
