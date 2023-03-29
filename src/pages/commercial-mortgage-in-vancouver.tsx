import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';


const CommercialVancouver = () => {
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
            pages(where: {id: 1308}) {
              nodes {
                commercialvancouver {
                  serviceBannerTitle
                  serviceBannerHeading
                  serviceBannerDescription
                  serviceBannerImage {
                    altText
                    sourceUrl
                  }
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
            pages(where: {id: 1308}) {
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
                {data?.commercialvancouver?.serviceBannerTitle == null ? "" : (
                    <Hero
                    title={data?.commercialvancouver?.serviceBannerTitle}
                    heading={data?.commercialvancouver?.serviceBannerHeading}
                    description={data?.commercialvancouver?.serviceBannerDescription}
                    bgImage={data?.commercialvancouver?.serviceBannerImage?.sourceUrl}
                />
                )}
                
                <div className="service-container">
                {console.log("Services ",data?.commercialvancouver)}
                  <h1 className="text-center mt-5">{data?.commercialvancouver?.ourMortgageServicesTitle}</h1>
                  
                  {data?.commercialvancouver?.ourServices.map(
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
                        <div className="service-content">
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

export default CommercialVancouver;