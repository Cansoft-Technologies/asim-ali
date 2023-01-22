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

const BcCoquitlam = () => {
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
            pages (where: {title: "Coquitlam"}){
              nodes {
                coquitlam {
                  coquitlamBannerTitle
                  coquitlamBannerHeading
                  coquitlamBannerDescription
                  thirdApplyStepTitle
                  secondApplyStepTitle
                  secondApplyStepDescription
                  mortgageProductsTitle
                  mortgageProductsRightText
                  mortgageProductsLeftText
                  mortgageBrokerTitle
                  mortgageBrokerDescription
                  firstApplyStepTitle
                  brokerCoquitlamTitle
                  brokerCoquitlamDescription
                  aboutCoquitlamText
                  mortgageProductsImage {
                    altText
                    sourceUrl
                  }
                  coquitlamSlider {
                    title
                    content
                  }
                  coquitlamBannerImage {
                    altText
                    sourceUrl
                  }
                  brokerCoquitlamLink {
                    url
                  }
                  aboutCoquitlamImage {
                    altText
                    sourceUrl
                  }
                  mortgageRenovation {
                    title
                    description
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
                {data?.coquitlam?.coquitlamBannerTitle} - {generalSettings?.title}
                </title>
            </Head>
            <main className="content">
            {data?.coquitlam?.coquitlamBannerTitle == null ? "" : (
                <Hero
                title={data?.coquitlam?.coquitlamBannerTitle}
                heading={data?.coquitlam?.coquitlamBannerHeading}
                description={data?.coquitlam?.coquitlamBannerDescription}
                bgImage={data?.coquitlam?.coquitlamBannerImage?.sourceUrl}
            />  
            )}
            
            <Container className='my-5'>
                <Row className='refinance-text my-5'>
                    <Col md={5}>
                    <h2>{data?.coquitlam?.coquitlamBannerTitle?.split(" ")[0]} <span>{data?.coquitlam?.coquitlamBannerTitle?.split(" ")[1]}</span></h2>
                    </Col>
                    <Col md={7}>
                        <p>{data?.coquitlam?.coquitlamBannerDescription}</p> 
                    </Col>
                </Row>
                <Row className='coquitlam-grid my-5'>
                    <Col md={7}>
                        <div dangerouslySetInnerHTML={{__html: data?.coquitlam?.aboutCoquitlamText }} >
                        </div>
                    </Col>
                    <Col md={5}>
                    <Image 
                        src={data?.coquitlam?.aboutCoquitlamImage?.sourceUrl}
                        loader={myLoader}
                        alt={data?.coquitlam?.aboutCoquitlamImage?.altText}
                        width="100%" 
                        height="120" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                </Row>
                {data?.coquitlam?.coquitlamSlider == null ? "" : (
                    <Row className='application-slider'>
                    
                    <Carousel 
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        >
                            
                            {data?.coquitlam?.coquitlamSlider.map( (slide, a) => {
                                return(
                               <div key={a} className="application-slide text-center">
                                <h3>{slide?.title}</h3>
                                <p>{slide?.content}</p>
                            </div>
                                )
                            } ) }
                            
                        </Carousel>
                    </Row>
                )}
                
                <Row className="product-service">
                    <Col className='mb-5' md={12}>
                        <h2 className='text-center'>{data?.coquitlam?.mortgageProductsTitle}</h2>
                    </Col>
                    <Col md={3}>
                        <span
                        dangerouslySetInnerHTML={{__html: data?.coquitlam?.mortgageProductsLeftText }} 
                        ></span>
                        
                    </Col>
                    <Col md={6}>
                        <Image 
                         src={data?.coquitlam?.mortgageProductsImage?.sourceUrl}
                         loader={myLoader}
                         alt={data?.coquitlam?.mortgageProductsImage?.altText}
                        width="190" 
                        height="150" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                    <Col md={3}>
                    <span
                    dangerouslySetInnerHTML={{__html: data?.coquitlam?.mortgageProductsRightText }} 
                    ></span>
                    </Col>
                </Row>
                <Row className='apply-step'>
                    <Col md={4}>
                        {data?.coquitlam?.firstApplyStepTitle == null ? "" : (
                             <div className="apply">
                             <h2>01</h2>
                             <h2>{data?.coquitlam?.firstApplyStepTitle}</h2>
                             <div className="apply-border">
                             </div>
                         </div>
                        )}
                    </Col> 
                    <Col md={4}>
                    {data?.coquitlam?.secondApplyStepTitle == null ? "" : (
                        <div className="approved"> 
                            <h2>02</h2>
                            <h2>{data?.coquitlam?.secondApplyStepTitle}</h2>
                            <p>{data?.coquitlam?.secondApplyStepDescription}</p> 
                        </div>
                         )}
                    </Col> 
                    <Col md={4}>
                    {data?.coquitlam?.thirdApplyStepTitle == null ? "" : (
                        <div className="apply">
                            <h2>03</h2>
                            <h2>{data?.coquitlam?.thirdApplyStepTitle}</h2>
                            <div className="apply-border">
                            </div>
                        </div>
                        )}
                    </Col> 
                </Row>
                <Row className='mortgage-broker'>
                    <Col>
                        <h2>{data?.coquitlam?.mortgageBrokerTitle}</h2> 
                        <p>{data?.coquitlam?.mortgageBrokerDescription}</p>
                    </Col>
                </Row>
                {data.coquitlam.mortgageRenovation == null ? "" : (
                    <Row className="renovation-row">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key == null ? 1 : key }
                        onSelect={(k) => setKey(k)}
                        className="mb-3 renovation"
                        >
                        {data.coquitlam.mortgageRenovation.map( (tab, item) => {
                            return(
                                <Tab key={item} eventKey={item.toString()} title={tab.title}>
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
                    <h2>{data?.coquitlam?.
                    brokerCoquitlamTitle}</h2>
                    <p>{data?.coquitlam?.brokerCoquitlamDescription}</p>
                    {data?.coquitlam?.brokerCoquitlamLink == null ? "" : (
                        <a href={data?.coquitlam?.brokerCoquitlamLink?.url}>Read More <FontAwesomeIcon icon={faChevronRight} /></a>
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

export default BcCoquitlam;