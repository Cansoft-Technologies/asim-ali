import React, { useState, useEffect } from 'react';
import { Accordion, Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


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
                homeLandingPage {
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
    
    return (
        <>
        
        {faqsections.map(faq => {
            return(
            <Container key={faq}> 
            {faq?.homeLandingPage?.faqSection?.hideSection == true? "" : (
                <div>
                <div
                 style={{ 
                    backgroundImage: `url("${faq?.homeLandingPage?.faqSection?.faqImage?.sourceUrl}")` 
                  }} 
                className='faq_section'> 
                    <div className="faq_text"> 
                        <h2>{faq?.homeLandingPage?.faqSection?.faqTitle}</h2>
                        <h2 dangerouslySetInnerHTML={{__html: faq?.homeLandingPage?.faqSection?.faqSubitle}} ></h2>
                    
                    </div>
                </div>
                <div className='faq-accordion'>
                    {faq?.homeLandingPage?.faqSection?.faqAccordion == null ? "" : (
                        <Accordion defaultActiveKey="0">
                       {faq?.homeLandingPage?.faqSection?.faqAccordion.map( (qa, index) => {
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