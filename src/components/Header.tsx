import { gql } from "@apollo/client";
import { MenuLocationEnum, client } from "client";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        settingsOptions {
          AsimOptions {
            headerSettings {
              uploadLogo {
                sourceUrl
                altText
              }
            }
            generalSettings {
              schemaProductRating
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


function Header(props: MyProps) {
  const { settings, mainMenus } = props;

  const { menuItems } = client.useQuery();
  console.log(mainMenus);

  return (
    <>
      <Head>
      </Head>
      <Container style={{maxWidth:"100%",backgroundColor: "#12143a"}}> 
      <Container style={{maxWidth:"1450px"}}> 
      <div className="top-nav">
      <a href="mailto:admin@asimali.ca"><p className="brand-mail"><span><FontAwesomeIcon icon={faEnvelope} /></span> admin@asimali.ca | Licensed in BC & AB</p></a>
        <a href="tel:+1 (604) 591 3590"><p className="brand-cell"> <span><FontAwesomeIcon icon={faPhone} /> </span>+1 (604) 591 3590 </p></a>
      </div>
      </Container>
      
      </Container>
      <Navbar bg="light" expand="lg">
        <Container style={{maxWidth:"1450px"}}>
          <Navbar.Brand>
            {(settings as any)?.headerSettings?.uploadLogo == null ? (
              ""
            ) : (
              <Link href="/">
                <Image
                  src={(settings as any)?.headerSettings?.uploadLogo?.sourceUrl}
                  alt="Logo"
                  style={{ cursor: "pointer" }}
                  width={180}
                  height={43}
                  priority={true}
                />
              </Link>
            )}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              // style={{ maxHeight: '100px' }}
              navbarScroll
            >
              {mainMenus?.map((link) => {
                return (
                  <ul key={`${link.label}$-menu`}>
                    {link.menuItems.nodes.map((item) => {
                      return (
                        <li key={`${item.label}$-menu`}>
                          {item.parentId == null ? (
                            <span>
                              <Nav.Link as={Link} href={`${item.url}`}>
                                <span className="link" onClick={() => item.url}>
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
                                          className="sublink"
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
                                          className="sublink"
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
                                          className="sublink"
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
