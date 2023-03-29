import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';

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
    const [datas, setDatas] = useState([]);
    const [metaData, setMetaData] = useState([]);

    useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query{
            pages(where: {id: 553}) {
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
                  ourServices {
                    serviceTitle
                    serviceContent
                    serviceImage {
                      altText
                      sourceUrl
                    }
                  }
                  ourMortgageServicesTitle
                }
              }
            }
          }`,
        })
        .then((result) => setDatas(result?.data?.pages?.nodes));

        client
        .query({
          query: gql`query{
            pages(where: {id: 553}) {
              nodes {
                seo {
                  title
                  description
                  canonicalUrl
                  focusKeywords
                  openGraph {
                    image {
                      url
                    }
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setMetaData(result?.data?.pages?.nodes));

    }, []);

    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }


    return (
       <>
         {datas.map( (data, index) => {
            return(
        <div key={index} className='our-services'>
          <Head>
            {metaData.map((meta) => {
                return(
                  <>
                  <title>{meta?.seo?.title}</title>
                  <meta name="description" content={meta?.seo?.description} />
                  <link rel="canonical" href={meta?.seo?.canonicalUrl} />
                  <meta property="og:title" content={meta?.seo?.title} />
                  <meta property="og:description" content={meta?.seo?.description} />
                  <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
                  </>
                )
            })}
            </Head>
                <Header />
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
                    {data?.services?.ourServices == null ? "" : (
                        <Carousel 
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        >

                    {data?.services?.ourServices.map( (slide, i) => {
                       return(
                        <div key={i} className="slide-text">
                           
                        <a href={`#${i}`}>{slide?.serviceTitle}</a>
                        </div>
                       )

                    })}
                     
                        
                       
                    </Carousel>
                    )}
                    
                    <Row className='refinance-text'>
                        <Col md={5}>
                            {data?.services?.refinancingTitle == null ? "" : (
                                <h1>{data?.services?.refinancingTitle.split(" ")[0]} <span>{data?.services?.refinancingTitle.split(" ")[1]}</span></h1>
                            )}
                            

                        </Col>
                        <Col md={7}>
                            <span>
                                {data?.services?.refinancingDescription}</span> 
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
                <div className="service-container">
                {console.log("Services ",data?.services)}
                  <h2 className="text-center">{data?.services?.ourMortgageServicesTitle}</h2>
                  
                  {data?.services?.ourServices.map(
                    (service, key) => {
                    return(
                        
                   <div className="service-row" id={key} key={key}>
                    {console.log("service", service?.serviceTitle)}

                    <Container>
                      <Row>
                      <Col className='service-texts' lg={6} >
                           <div className='service-image'> 
                            <Image 
                            loader={myLoader}
                            objectFit="contain"
                            src={service?.serviceImage?.sourceUrl}
                            width={500}
                            height={400}
                            alt={service?.serviceImage?.altText} />
                           </div>
                      </Col>
                      <Col className='service-texts' lg={6}>
                           <div className='service-content'>
                            <h2 className='mt-4'>{service?.serviceTitle}</h2>
                            <p dangerouslySetInnerHTML={{__html: service?.serviceContent}} ></p>
                           </div>
                      </Col>
                      </Row>
                    </Container>

                      

                    </div>

                    )
                  })}
                  
                </div>
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