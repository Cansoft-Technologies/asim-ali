import React, { useState, useEffect } from 'react';
import { Carousel, Col, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const FlexabilitySlider = () => {
    const [sliders, setSliders] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query MyQuery {
            pages(where: {title: "home"}) {
              nodes {
                HomeLandingPage {
                  flexabilitySlider {
                    sliderTitle
                    sliderSubtitle
                    sliderDescription
                    sliderImage {
                      altText
                      sourceUrl
                    }
                    sliderButtonUrl {
                      url
                    }
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setSliders(result?.data?.pages?.nodes));
    }, []);
    
    
    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <>
            <div className="flexability-slider"> 
            
            <Carousel fade>
           

            {sliders.map( function(slider) { 

              return( 

                slider?.HomeLandingPage?.flexabilitySlider == null ? "" : 
                
                slider?.HomeLandingPage?.flexabilitySlider.map( (slide) => 
               
              {
                  return (  
                    <Carousel.Item key={slide.sliderTitle}>
                        <div className="overlay"></div>
                        <Image 
                            src={slide?.sliderImage?.sourceUrl} 
                            loader={myLoader}           
                            width="100%" 
                            height="57" 
                            layout="responsive" 
                            objectFit="contain"
                            alt={slide?.sliderImage?.altText} />
                            <Carousel.Caption className="carouselcaption">
                            <Row className="align-items-center home-slide"> 
                                <Col className='text-start' xs={12} lg="6">
                                <div className="bannerCaption">
                                    <h1>{slide?.sliderTitle}</h1>
                                    <h4>{slide?.sliderSubtitle}</h4>
                                    <p>{slide?.sliderDescription}</p>
                                    <Link href={slide?.sliderButtonUrl
?.url}><Button className="bannerBtn" >Get <span>Approved</span></Button></Link>
                                </div>
                                
                                </Col>
                               
                            </Row>
                        </Carousel.Caption>
                    </Carousel.Item>
                     )
                    }
                    
                    ))
         
                 
                     }
         
                     )}
                    
                </Carousel>
            </div>
        </>
    );
};

export default FlexabilitySlider;