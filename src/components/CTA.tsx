
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';

const CTA = () => {

    const [catSections, setCatSections] = useState([]);

    useEffect(() => {
      const client = new ApolloClient({
          uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
            pages(where: {title: "home"}) {
              nodes {
                homeLandingPage {
                  callToActionSection {
                    hideSection
                    actionTitle
                    actionLink {
                      url
                      title
                    }
                    actionBackgroundImage {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setCatSections(result?.data?.pages?.nodes));
  }, []);
  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

    return (
        <>
        {catSections.map((cat, index) => {
            return(
                <Container key={index}> 
                {cat?.homeLandingPage?.callToActionSection?.hideSection == true ? "" : (
                    <div 
                  //   style={{ 
                  //  backgroundImage: `url(${cat?.homeLandingPage?.callToActionSection?.actionBackgroundImage?.sourceUrl})` 
                  //  }} 
                   className='cta_section'> 
                      <div
                            style={{
                              position: 'relative',
                              height: '90vh',
                              width: '100%',
                              clipPath: 'inset(0 0 0 0)',
                            }}
                          >

                          <div
                          style={{
                            position: 'absolute',
                            height: '100%',
                            width: '100%',
                            left: '0',
                            top: '0',
                          }}
                        >
                <Image 
                  src={cat?.homeLandingPage?.callToActionSection?.actionBackgroundImage?.sourceUrl}
                  loader={myLoader}  
                  style={{zIndex: 0}} 
                  alt='Logo' 
                  layout="fill"
                  objectFit="cover"
                  width={500}
                  height="900"

                  />
               </div>
               </div>
                   <div className="cta_text"> 
                       <h3>{cat?.homeLandingPage?.callToActionSection?.actionTitle}</h3>
                       
                       {cat?.homeLandingPage?.callToActionSection?.actionLink == null ? "" : (
                        <Link href={cat?.homeLandingPage?.callToActionSection?.actionLink?.url}>
                           <Button className="ctaBtn">{cat?.homeLandingPage?.callToActionSection?.actionLink?.title}</Button>
                       </Link>
                       )}
                       
                   </div>
                </div>
                )}
                
           </Container>
            )
        }) }
       
         
     </>
    );
};

export default CTA;