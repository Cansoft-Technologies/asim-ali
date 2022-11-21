import React, { useState, useEffect } from 'react';
import { Carousel, Col, Row, Button } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import styles from 'scss/components/Banner.module.scss';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
const Banner = () => {

    const [sliders, setSliders] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: 'http://localhost:10004/graphql',
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`
          query {
            pages(where: {title: "home"}) {
              nodes {
                HomeLandingPage {
                  homeSliderSection {
                    homeSlider {
                      sliderTitle
                      sliderSubtitle
                      sliderDescription
                      sliderImage {
                        sourceUrl
                      }
                      sliderButtonUrl {
                        url
                      }
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
        <div>
            <div className="home-slider"> 


            <Carousel fade>
             
            
            {sliders.map( function(slider) { 
              
           return( 

            slider?.HomeLandingPage?.homeSliderSection?.homeSlider == null ? "" : 
            
            slider?.HomeLandingPage?.homeSliderSection?.homeSlider.map( (slide) => 
            
           {
               return (  
               <Carousel.Item key={slide.sliderTitle}>
                 {console.log(slider?.HomeLandingPage?.homeSliderSection?.homeSlider == null)}
                
                   <div className={styles.overlay}></div>

                 
                   <Image 
                       loader={myLoader}
                     src={slide?.sliderImage?.sourceUrl}
                       width="100%" 
                       height="57" 
                       layout="responsive" 
                       objectFit="contain"
                       alt={slide?.sliderImage?.altText} />
                       <Carousel.Caption className={styles.carouselcaption}>
                       <Row className="align-items-center home-slide"> 
                           <Col className='text-start' xs={12} lg="6">
                           <div className={styles.bannerCaption}>
                               <h4>{slide.sliderSubtitle}</h4>
                               <h1>{slide.sliderTitle}</h1>
                               <p>{slide.sliderDescription}</p>
                           </div>
                           
                           </Col>
                           {slide.sliderButtonUrl == null ? "" : (
                            <Col className='text-end' xs={12} lg="6">
                               <Link href={slide.sliderButtonUrl.url}><Button className={styles.bannerBtn} >Get <span>Approved</span></Button></Link>
                           </Col>
                           )}
                           
                       </Row>
                   </Carousel.Caption>
               </Carousel.Item>
                 )
          }  //  --
           
           ))

        
            }

            )}
                
            </Carousel>
            </div>
        </div>
    );
};

export default Banner;