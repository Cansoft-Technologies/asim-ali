import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Container } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
const PartnerLogo = () => {

  const [logos, setLogos] = useState([]);

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
                  partnerLogoSection {
                    hideSection
                    partnerLogo {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setLogos(result?.data?.pages?.nodes));
    }, []);

    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
 
    return (
        <>
       <Container className="my-5 partnerLogo" >
       {logos.map(logo => {
        return(
          <div key={logo.HomeLandingPage} >
          {logo?.HomeLandingPage?.partnerLogoSection.hideSection == true ? "" : (
            <Carousel 
           autoPlay={true}
            infinite={true}
            responsive={responsive}
                >{
                  logo?.HomeLandingPage?.partnerLogoSection?.partnerLogo.map(singleLogo => {
                    return (
                    <div key={singleLogo.sourceUrl}>
                  <Image 
                  loader={myLoader}
                  src={singleLogo.sourceUrl}
                  width="100%" 
                  height="15" 
                  layout="responsive" 
                  objectFit="contain"
                  alt={singleLogo.altText}
                  />
              </div>
              )
            } )
            
            }
          </Carousel>
          )}
          
          </div>
        )
       })}
     
       </Container>
        </>
    );
};

export default PartnerLogo;