import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Footer, Header } from 'components';
import { Hero } from '../components';
import { client, Page as PageType } from 'client';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarker, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';



const contact = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;


    const [contacts, setContacts] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: 'http://localhost:10004/graphql',
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query{
            pages(where: {title: "contact us"}) {
              nodes {
                contactPage {
                  contactBannerTitle
                  phoneNumber
                  eMail
                  address
                  addressMap
                  contactBannerBackgroundImage {
                    altText
                    sourceUrl
                  }
                  contactForm
                }
              }
            }
          }`,
        })
        .then((result) => setContacts(result?.data?.pages?.nodes));
    }, []);
    
    

  
    return (
        <>
        {contacts.map((contact, index) => {
            return(
                <div key={index}>
                    <Header />
                    {console.log("contact", contact?.contactPage?.addressMap)}
                <Head>
                    <title>
                    {contact?.contactPage?.contactBannerTitle} - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                <Hero
                    title={contact?.contactPage?.contactBannerTitle}
                    bgImage={contact?.contactPage?.contactBannerBackgroundImage?.sourceUrl}
                />
                <div className="contact-page mt-5">
                <Container> 
                    <Row> 
                        {contact?.contactPage?.address == null && contact?.contactPage?.eMail == null && contact?.contactPage?.phoneNumber == null ? "" : (
                        <Col xs={12} lg="4">
                        <h5>Get in Touch</h5>

                        <div className="contact-item">
                        <div className="contact-icon">
                            <FontAwesomeIcon icon={faMapMarker} />
                        </div>
                        <h6>Address</h6>
                        <p>{contact?.contactPage?.address}</p>
                        </div>

                        <div className="contact-item">
                        <div className="contact-icon">
                            <FontAwesomeIcon icon={faPhone} />
                        </div>
                        <h6>Call Us</h6>
                        <a href={`tel: ${contact?.contactPage?.phoneNumber}`}>{contact?.contactPage?.phoneNumber}</a>
                        </div>

                        <div className="contact-item">
                        <div className="contact-icon">
                        <FontAwesomeIcon icon={faEnvelope} />
                        </div>
                        <h6>E-mail</h6>
                        <a href={`mailto:${contact?.contactPage?.eMail }`}>{contact?.contactPage?.eMail}</a>
                        </div>
                        </Col>
                        )}
                       
                        <Col xs={12} lg="8">
                        
                        <div id="contact-form" dangerouslySetInnerHTML={{__html: contact?.contactPage?.contactForm}} ></div>
                           
                        </Col>
                    </Row>
                    
                </Container>
                  <div dangerouslySetInnerHTML={{__html: contact?.contactPage?.addressMap }} className="mt-5"> 
                 
                  </div>
            </div>
        </main>
        <Footer />
                </div>

            )
        })}
            
        </>
    );
};

export default contact;
