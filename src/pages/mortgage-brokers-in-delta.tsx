import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';      
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Delta = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    const [datas, setDatas] = useState([]);
    const [key, setKey] = useState(null);

    useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query{
            pages(where: {title: "Delta"}) {
              nodes {
                Delta {
                  thirdApplyStepTitle
                  secondApplyStepTitle
                  secondApplyStepDescription
                  productsTitle
                  productsRightText
                  productsLeftText
                  firstApplyStepTitle
                  brokerTitle
                  brokerDescription
                  bannerTitle
                  bannerHeading
                  bannerDescription
                  aboutText
                  aboutImage {
                    altText
                    sourceUrl
                  }
                  bannerImage {
                    altText
                    sourceUrl
                  }
                  brokerLink {
                    url
                    title
                  }
                  productsImage {
                    altText
                    sourceUrl
                  }
                  renovation {
                    title
                    description
                  }
                  slider {
                    title
                    content
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setDatas(result?.data?.pages?.nodes));
    }, []);


    const myLoader = ({ src, width, quality }) => {
        return `${src}?w=${width}&q=${quality || 75}`
      }


    return (
        <>
        {datas.map( (data, index) => {
            return(
        <div key={index} className='Bc-Coquitlam'>
        <Header />
            <Head>
                <title>
                {data?.Delta?.bannerTitle} - {generalSettings?.title}
                </title>
            </Head>
            <main className="content">
            {data?.Delta?.bannerTitle == null ? "" : (
                <Hero
                title={data?.Delta?.bannerTitle}
                heading={data?.Delta?.bannerHeading}
                description={data?.Delta?.bannerDescription}
                bgImage={data?.Delta?.bannerImage?.sourceUrl}
            />  
            )}
            
            <Container className='my-5'>
                <Row className='refinance-text my-5'>
                    <Col md={5}>
                    <h2>{data?.Delta?.bannerTitle?.split(" ")[0]} <span>{data?.Delta?.bannerTitle?.split(" ")[1]}</span></h2>
                    </Col>
                    <Col md={7}>
                        <p>{data?.Delta?.bannerDescription}</p> 
                    </Col>
                </Row>
                <Row className='kelowna-grid my-5'>
                    <Col md={7}>
                        <div dangerouslySetInnerHTML={{__html: data?.Delta?.aboutText }} >
                        </div>
                    </Col>
                    <Col md={5}>
                    <Image 
                        src={data?.Delta?.aboutImage?.sourceUrl}
                        loader={myLoader}
                        alt={data?.Delta?.aboutImage?.altText}
                        width="100%" 
                        height="90" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                </Row>
                {data?.Delta?.slider == null ? "" : (
                    <Row className='application-slider'>
                    
                    <Carousel 
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        >
                            
                            {data?.Delta?.slider.map( (slide, a) => {
                                return(
                               <div key={a} className="application-slide text-center">
                                <h4>{slide?.title}</h4>
                                <p>{slide?.content}</p>
                            </div>
                                )
                            } ) }
                            
                        </Carousel>
                    </Row>
                )}
                
                <Row className="product-service">
                    <Col className='mb-5' md={12}>
                        <h2 className='text-center'>{data?.Delta?.productsTitle}</h2>
                    </Col>
                    <Col md={3}>
                        <span
                        dangerouslySetInnerHTML={{__html: data?.Delta?.productsLeftText }} 
                        ></span>
                        
                    </Col>
                    <Col md={6}>
                        <Image 
                         src={data?.Delta?.productsImage?.sourceUrl}
                         loader={myLoader}
                         alt={data?.Delta?.productsImage?.altText}
                        width="190" 
                        height="150" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                    <Col md={3}>
                    <span
                    dangerouslySetInnerHTML={{__html: data?.Delta?.productsRightText }} 
                    ></span>
                    </Col>
                </Row>
                <Row className='apply-step'>
                    <Col md={4}>
                        {data?.Delta?.firstApplyStepTitle == null ? "" : (
                             <div className="apply">
                             <h2>01</h2>
                             <h2>{data?.Delta?.firstApplyStepTitle}</h2>
                             <div className="apply-border">
                             </div>
                         </div>
                        )}
                    </Col> 
                    <Col md={4}>
                    {data?.Delta?.secondApplyStepTitle == null ? "" : (
                        <div className="approved"> 
                            <h2>02</h2>
                            <h2>{data?.Delta?.secondApplyStepTitle}</h2>
                            <p>{data?.Delta?.secondApplyStepDescription}</p> 
                        </div>
                         )}
                    </Col> 
                    <Col md={4}>
                    {data?.Delta?.thirdApplyStepTitle == null ? "" : (
                        <div className="apply">
                            <h2>03</h2>
                            <h2>{data?.Delta?.thirdApplyStepTitle}</h2>
                            <div className="apply-border">
                            </div>
                        </div>
                        )}
                    </Col> 
                </Row>
                <Row className='mortgage-broker'>
                    <Col>
                        <h2>{data?.Delta?.brokerTitle}</h2> 
                        <p>{data?.Delta?.brokerDescription}</p>
                    </Col>
                </Row>
                {data.Delta.renovation == null ? "" : (
                    <Row className="renovation-row">
                        {console.log(data.Delta.renovation[0].title)}
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key == null ? 1 : key }
                        onSelect={(k) => setKey(k)}
                        className="mb-3 renovation"
                        >
                        {data.Delta.renovation.map( (tab, item) => {
                            return(
                                <Tab key={item} eventKey={item.toString()} title={tab.title}>
                                    {console.log("data aaa", tab.title)}
                                <div 
                                dangerouslySetInnerHTML={{__html: tab.description }}
                                className="renovation-content-list">   
                                </div>
                        </Tab>
                            )
                        })}
                        </Tabs>
                    </Row>
                )}
                <Row className='broker-coquitlam'>
                    <Col>
                    <h2>{data?.Delta?.
                    brokerTitle}</h2>
                    <p>{data?.Delta?.brokerDescription}</p>
                    {data?.Delta?.brokerLink == null ? "" : (
                        <a href={data?.delta?.brokerLink?.url}>Read More <FontAwesomeIcon icon={faChevronRight} /></a>
                    )}
                    
                    </Col>
                </Row>
               
            </Container>
            <CTA />
            </main>
            <Footer />
        
    </div>
        ) 
    } ) }
   
    </>
    );
};

export default Delta;