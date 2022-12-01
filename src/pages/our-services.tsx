import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
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
      items: 5
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

const Services = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    const [datas, setDatas] = useState([]);

    useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query{
            pages(where: {title: "Our Services"}) {
              nodes {
                services {
                  serviceBannerTitle
                  serviceBannerHeading
                  servicesDescription
                  serviceBannerImage {
                    sourceUrl
                  }
                  serviceBannerDescription
                  refinancingTitle
                  refinancingDescription
                  serviceCarousel {
                    serviceItem
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setDatas(result?.data?.pages?.nodes));
    }, []);


    return (
       <>
         {datas.map( (data, index) => {
            return(
        <div key={index} className='our-services'>
            <Header />
            {console.log(data?.services?.refinancingTitle)}
                <Head>
                    <title>
                    {data?.services?.serviceBannerTitle} - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                {data?.services?.serviceBannerTitle == null ? "" : (
                    <Hero
                    title={data?.services?.serviceBannerTitle}
                    heading={data?.services?.serviceBannerHeading}
                    description={data?.services?.serviceBannerDescription}
                    bgImage={data?.services?.serviceBannerImage?.sourceUrl}
                />
                )}
                
                <Container className='my-5'>
                    {data?.services?.serviceCarousel == null ? "" : (
                        <Carousel 
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        >

                    {data?.services?.serviceCarousel.map( (slide, i) => {
                       return(
                        <div key={i} className="slide-text">
                           
                        <h4>{slide?.serviceItem}</h4>
                        </div>
                       )

                    })}
                     
                        
                       
                    </Carousel>
                    )}
                    
                    <Row className='refinance-text'>
                        <Col md={5}>
                            {data?.services?.refinancingTitle == null ? "" : (
                                <h2>{data?.services?.refinancingTitle.split(" ")[0]} <span>{data?.services?.refinancingTitle.split(" ")[1]}</span></h2>
                            )}
                            

                        </Col>
                        <Col md={7}>
                            <p>
                                {data?.services?.refinancingDescription}</p> 
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                        {data?.services?.servicesDescription == null ? "" : (
                            <div dangerouslySetInnerHTML={{__html: data?.services?.servicesDescription }} className="service-text"></div>
                        )}
                            
                        </Col>
                    </Row>
                </Container>
                <CTA />
                </main>
                <Footer />
            
        </div>

            )
        })}
       </>
        
    );
};

export default Services;