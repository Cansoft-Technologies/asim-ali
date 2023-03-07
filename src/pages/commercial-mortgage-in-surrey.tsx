import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-multi-carousel/lib/styles.css';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';


const MortgageSurrey = () => {
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
            pages(where: {title: "Surrey"}) {
              nodes {
                surrey {
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
    }, []);

    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }


    return (
       <>
         {datas.map( (data, index) => {
            return(
        <div key={index} className='our-services'>
            <Header />
                <Head>
                    <title>
                    {data?.surrey?.serviceBannerTitle} - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                {data?.surrey?.serviceBannerTitle == null ? "" : (
                    <Hero
                    title={data?.surrey?.serviceBannerTitle}
                    heading={data?.surrey?.serviceBannerHeading}
                    description={data?.surrey?.serviceBannerDescription}
                    bgImage={data?.surrey?.serviceBannerImage?.sourceUrl}
                />
                )}
                
                <div className="service-container">
                {console.log("Services ",data?.surrey)}
                  <h2 className="text-center mt-5">{data?.surrey?.ourMortgageServicesTitle}</h2>
                  
                  {data?.surrey?.ourServices.map(
                    (service, key) => {
                    return(
                        
                   <div className="service-row" id={key} key={key}>
                    {console.log("service", service?.serviceTitle)}

                    <Container>
                      <Row>
                      <Col lg={6} >
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
                      <Col lg={6}>
                           <h2 className='mt-4'>{service?.serviceTitle}</h2>
                           <p dangerouslySetInnerHTML={{__html: service?.serviceContent}} ></p>
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

export default MortgageSurrey;