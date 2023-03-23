import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { client} from 'client';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';


const Testimonials = () => {

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
            pages(where: {title: "Testimonials"}) {
              nodes {
                Testimonials {
                  bannerTitle
                  bannerHeading
                  bannerDescription
                  bannerImage {
                    altText
                    sourceUrl
                  }
                  sectionTitle
                  testimonials {
                    testimonial
                    clientName
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
        <div key={index} className='our-testimonial'>
        <Header />
           <Head>
               <title>
               {data?.Testimonials?.bannerTitle} - {generalSettings?.title}
               </title>
           </Head>
           <main className="content">
           <Hero
               title={data?.Testimonials?.bannerTitle}
               bgImage={data?.Testimonials?.bannerImage?.sourceUrl}
           />

           {console.log("Hello frined",data.Testimonials)}

         <Container className="my-5 blog-container">
                <h1 className="my-3 text-center">{data?.Testimonials?.sectionTitle}</h1>
                    <div className="row row-cols-1 row-cols-md-3 g-4 items">

                        {data?.Testimonials?.testimonials.slice(0)
  .reverse().map((testimonial, key) => {
                            return(
                            <div key={key}  className="col">
                                    <div className="testimonial-box card h-100">
                                        {console.log('testimonial area',testimonial)}
                                
                                    <div className="card-body">
                                
                                        <q className='testimonials-content'>{testimonial?.testimonial}</q>
                                        <p className="testimonials-name">{testimonial?.clientName}</p>
                                    </div>

                                    </div>
                                </div>
                            )
                        })}
                        
                        
                        
                        
                      
              
                    </div>
                    
                </Container>
                </main>
                <Footer/>
                </div>
                   )
                })}
        </>
    );
};

export default Testimonials;