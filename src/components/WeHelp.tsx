import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const WeHelp = () => {


    const [helps, setHelps] = useState([]);

    useEffect(() => {
      const client = new ApolloClient({
          uri: 'http://localhost:10004/graphql',
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
            pages(where: {title: "home"}) {
              nodes {
                homeLandingPage {
                  weHelpSection {
                    helpTitle
                    helpDescription
                    hideSection
                    helpImage {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setHelps(result?.data?.pages?.nodes));
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


    return (
        <>
          
            
                {helps.map(help =>  
               
                {
                    return(
                <div 
               
                key={help?.homeLandingPage?.weHelpSection}>

      {help?.homeLandingPage?.weHelpSection?.hideSection == true ? "" : (
         <section className='wehelp_section'>
        <Container>
            <Row >
                       <Col lg={6} >
                           <div className="wehelp_image">
                           <Image 
                           loader={myLoader}
                           src={help?.homeLandingPage?.weHelpSection?.helpImage?.sourceUrl}
                           width="500" 
                           height="639" 
                           alt={help?.homeLandingPage?.weHelpSection?.helpImage?.altText} />
                           </div>
                       </Col>
                       <Col lg={6} >
                          <div className="wehelp_text">
                               <h2 dangerouslySetInnerHTML={{__html: help?.homeLandingPage?.weHelpSection?.helpTitle}} ></h2>
                           <p>{help?.homeLandingPage?.weHelpSection?.helpDescription} 
                           {help?.helpImage?.sourceUrl}</p>
                           
                          </div>
                       </Col>
                   </Row>
        </Container>
        </section>
      )}
                    
                   </div> 
                   )
                }
                
                
                )}
                    
            
                
           
        </>
    );
};

export default WeHelp;