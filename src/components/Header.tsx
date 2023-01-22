import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Image from 'next/image';   
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';



function Header(): JSX.Element {
  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  const [settings, setSettings] = useState({});
  const [mainMenus, setMainMenus] = useState([]);
  const [isLoading, seIsLoading] = useState(true);

    useEffect(() => {
      const client = new ApolloClient({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
          settingsOptions {
            AsimOptions {
              headerSettings {
                uploadLogo {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }`,
      })
      .then((result) => 
        {
          setSettings(result?.data?.settingsOptions?.AsimOptions)
        seIsLoading(false);
        }
        );

        client
      .query({
        query: gql`{
            menus(where: {location: PRIMARY}) {
              nodes {
                name
                slug
                menuItems(first: 50){
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
          }`,
      })
      .then((result) => 
        {
            setMainMenus(result?.data?.menus?.nodes)
        }
        );
        
  }, []);
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
   <>
   
    {/* {isLoading && 
      <div className="preloader" >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      } */}
    <Navbar bg="light" expand="lg">
       
      <Container>
        <Navbar.Brand>
            { (settings as any)?.headerSettings?.uploadLogo == null ? "" : (
            <Link href="/">
            <Image 
            src={(settings as any)?.headerSettings?.uploadLogo?.sourceUrl}
            loader={myLoader}  
            style={{cursor: 'pointer'}} 
            alt='Logo' 
            width={200}
            height={55}
            objectFit="contain"
            
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
            
            {mainMenus.map( link => {
                return(
                    <ul key={`${link.label}$-menu`} >
                        {link.menuItems.nodes.map(item => {
                            
                                return(
                                   <span key={`${item.label}$-menu`}>
                                    {item.parentId == null ? (
                                         <li >
                                         
                                         <Nav.Link as={Link} href={`${item.url}`} > 
                                         <a onClick={() => (item.url)}>{item.label}</a>
                                         </Nav.Link>
                                         <ul className="submenu"> 
                                            {item.childItems.nodes.map( submenu => {
                                                return(
                                                    <li
                                                    key={submenu.uri}>
                                                        <Nav.Link as={Link} href={`${submenu.uri}`} > 
                                                        <a onClick={() => (submenu.uri)}>{submenu.label}</a>
                                                        </Nav.Link>
                                                    </li>
                                                )
                                            })}
                                           
                                         </ul>
                                </li>
                           ) : ""}
                                    
                                   </span>
                                )
                           
                            
                        })}
                    </ul>
                )
            })}
            {/* {mainMenus?.map((link) => (
              
            <Nav.Link key={`${link.label}$-menu`} as={Link} href={`${link.url}`} >
             
             {link.menuItems.nodes.map( ( mainMenu, a) => {
                return(
                    <li key={a}><a 
                    onClick={() => (mainMenu.url)}
                     >{mainMenu.label}</a>
                     <ul>
                    
                         <li><a >Submen</a></li>
                     </ul>
                     </li>
     
                )
             }
             )}
              

            </Nav.Link>
            ))}  */}
           
          </Nav>
        

        </Navbar.Collapse>
      </Container>
    </Navbar>
   </>
  );
}

export default Header;







