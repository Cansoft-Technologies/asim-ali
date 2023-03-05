import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';   

const FAQ = () => {
    const [faqsections, setFaqSections] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`
          query{
            pages(where: {title: "home"}) {
              nodes {
                HomeLandingPage {
                  faqSection {
                    hideSection
                    faqTitle
                    faqSubitle
                    faqImage {
                      altText
                      sourceUrl
                    }
                    faqAccordion {
                      question
                      answer
                    }
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setFaqSections(result?.data?.pages?.nodes));
    }, []);
    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
    
    return (
        <>
        
        {faqsections.map(faq => {
            return(
            <Container key={faq}> 
            {faq?.HomeLandingPage?.faqSection?.hideSection == true? "" : (
                <div>
                <div
                     style={{ 
                    backgroundImage: `url("${faq?.HomeLandingPage?.faqSection?.faqImage?.sourceUrl}")` 
                  }} 
                className='faq_section'> 
                    <div className="faq_text"> 
                    {/* <Image 
                   width="100" 
                   height="100" 
                  src={faq?.HomeLandingPage?.faqSection?.faqImage?.sourceUrl}
                  loader={myLoader}  
                  style={{zIndex: 0}} 
                  alt='Logo' /> */}
                        <p>{faq?.HomeLandingPage?.faqSection?.faqTitle}</p>
                        <p dangerouslySetInnerHTML={{__html: faq?.HomeLandingPage?.faqSection?.faqSubitle}} ></p>
                    
                    </div>
                </div>
                <div className='faq-accordion'>
                    {faq?.HomeLandingPage?.faqSection?.faqAccordion == null ? "" : (
                        <Accordion defaultActiveKey="0">
                       {faq?.HomeLandingPage?.faqSection?.faqAccordion.map( (qa, index) => {
                        return(
                        <Accordion.Item key={index} eventKey={index.toString()} >
                           <Accordion.Header>{qa.question}</Accordion.Header>
                           <Accordion.Body dangerouslySetInnerHTML={{__html: qa.answer}}>
                           </Accordion.Body>
                       </Accordion.Item>
                        )
                       }) }
                       
                   </Accordion>
                    )}
                    
                </div>
                </div>
            )}
            
        </Container>
            )
        })}
            
        </>
    );
};

export default FAQ;