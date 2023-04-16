import React, { useState, useEffect } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import Image from 'next/image';   
import Link from 'next/link';
import { client, MenuLocationEnum } from 'client';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Head from 'next/head';


export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`query{
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
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
};

const schema = 
{
"@context": "https://schema.org/",
"@type": "Product",
"name": "Mortgage Brokers",
"image": [
"https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/mortgage-broker-surrey-9.webp",
"https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/home-banner.webp",
"https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/mortgage-broker-surrey-8.webp"
],
"description": "Asim Ali and his team of the best mortgage brokers in Surrey will help you with the best mortgage rates available.",
"sku": "CAN1971SEO",
"mpn": "925872",
"brand": {
"@type": "Brand",
"name": "Asim Ali"
},
"review": {
"@type": "Review",
"reviewRating": {
  "@type": "Rating",
  "ratingValue": "5",
  "bestRating": "5"
},
"author": {
  "@type": "Person",
  "name": "Chloe Chan"
}
},
"offers": {
"@type": "Offer",
"url": "https://asimali.ca/",
"priceCurrency": "CAD",
"price": "499",
"priceValidUntil": "2020-12-31",
"availability": "https://schema.org/InStock"
},
"aggregateRating": {
"@type": "AggregateRating",
"ratingValue": "4.8",
"bestRating": "5",
"ratingCount": "209"
}
};

function Header(props: MyProps) {
  const { settings, mainMenus } = props;


  
  const { menuItems } = client.useQuery()
  const links = menuItems({
    where: { location: MenuLocationEnum.PRIMARY },
  }).nodes;

  // const [settings, setSettings] = useState({});
  // const [mainMenus, setMainMenus] = useState([]);

  //   useEffect(() => {
  //     const client = new ApolloClient({
  //         uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
  //         cache: new InMemoryCache(),
  //       });
  //     client
  //     .query({
  //       query: gql`
  //       query{
  //         settingsOptions {
  //           AsimOptions {
  //             headerSettings {
  //               uploadLogo {
  //                 sourceUrl
  //                 altText
  //               }
  //             }
  //           }
  //         }
  //       }`,
  //     })
  //     .then((result) => 
  //       {
  //         setSettings(result?.data?.settingsOptions?.AsimOptions)
  //       }
  //       );

  //       client
  //     .query({
  //       query: gql`{
  //           menus(where: {location: PRIMARY}) {
  //             nodes {
  //               name
  //               slug
  //               menuItems(first: 50){
  //                 nodes {
  //                   url
  //                   target
  //                   parentId
  //                   label
  //                   cssClasses
  //                   description
  //                   id
  //                   childItems {
  //                     nodes {
  //                       uri
  //                       label
  //                     }
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }`,
  //     })
  //     .then((result) => 
  //       {
  //           setMainMenus(result?.data?.menus?.nodes)
  //       }
  //       );
        
  // }, []);
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

  return (
   <>
   

    {/* ?.generalSettings?.schemaProductRating */}
    {/* {isLoading && 
      <div className="preloader" >
        <div className="spinner-border text-warning" role="status">
          <span className="visually-hidden">Loading...</span>
          </div>
      </div>
      } */}
    <Head>
        <noscript>
        <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
        </noscript>
        {/* <noscript>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(settings?.generalSettings?.schemaProductRating.replace(/(\r\n|\n|\r)/gm, "")
              ) }}
            />
            
        </noscript> */}
    </Head>
    <Navbar bg="light" expand="lg">
       
      <Container>
        <Navbar.Brand>
        {console.log("Shabbir theNabab",settings?.generalSettings?.schemaProductRating)}

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
            {mainMenus?.map( link => {
                return(
                    <ul key={`${link.label}$-menu`} >
                        {link.menuItems.nodes.map(item => {
                            
                                return(
                                   <li key={`${item.label}$-menu`}>
                                    {item.parentId == null ? (
                                         <span >
                                         
                                         <Nav.Link as={Link} href={`${item.url}`} > 
                                         <span className="link" onClick={() => (item.url)}>{item.label}</span>
                                         </Nav.Link>
                                         <ul className="submenu"> 
                                            {item.childItems.nodes.map( submenu => {
                                                return(
                                                    <li
                                                    key={submenu.uri}>
                                                        <Nav.Link as={Link} href={`${submenu.uri}`} > 
                                                        <span className="sublink" onClick={() => (submenu.uri)}>{submenu.label}</span>
                                                        </Nav.Link>
                                                    </li>
                                                )
                                            })}
                                           
                                         </ul>
                                </span>
                           ) : ""}
                                    
                                   </li>
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