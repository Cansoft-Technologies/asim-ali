
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const CTA = () => {

    const [catSections, setCatSections] = useState([]);

    useEffect(() => {
      const client = new ApolloClient({
          uri: 'http://localhost:10004/graphql',
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
            pages(where: {title: "home"}) {
              nodes {
                HomeLandingPage {
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


    return (
        <>
        {catSections.map((cat, index) => {
            return(
                <Container key={index}> 
                {cat?.HomeLandingPage?.callToActionSection?.hideSection == true ? "" : (
                    <div style={{ 
                   backgroundImage: `url(${cat?.HomeLandingPage?.callToActionSection?.actionBackgroundImage?.sourceUrl})` 
                   }} className='cta_section'> 
                   <div className="cta_text"> 
                       <h3>{cat?.HomeLandingPage?.callToActionSection?.actionTitle}</h3>
                       
                       {cat?.HomeLandingPage?.callToActionSection?.actionLink == null ? "" : (
                        <Link href={cat?.HomeLandingPage?.callToActionSection?.actionLink?.url}>
                           <Button className="ctaBtn">{cat?.HomeLandingPage?.callToActionSection?.actionLink?.title}</Button>
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