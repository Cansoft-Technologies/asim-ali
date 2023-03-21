import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


const SplitImageLeft = () => {

    const [splitImages, setSplitImages] = useState([]);

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
                  splitImageLeftSection {
                    splitTitle
                    splitDescription
                    splitImage {
                      altText
                      sourceUrl
                    }
                    hideSection
                    splitButton {
                      url
                      title
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setSplitImages(result?.data?.pages?.nodes));
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }

    return (
        <>
   
            {splitImages.map( splitImage => {
                return(
                    <section 
                    key={splitImage}
                    className='split_section'>
                    { splitImage?.HomeLandingPage?.splitImageLeftSection?.hideSection == true ? "" : (
                       <Container>
                             <Row>
                                 <Col lg={8}>
                                     <div className="split_image">
                                     <Image 
                                     src={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitImage?.sourceUrl} 
                                     loader={myLoader}
                                     width="1556" 
                                     height="1921" 
                                     alt={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitImage?.altText} />
                                     </div>
                                 </Col>
                                 <Col lg={4}>
                                     <div className="split_text">
                                     <h3 dangerouslySetInnerHTML={{__html:splitImage?.HomeLandingPage?.splitImageLeftSection?.splitTitle}} ></h3>
                                     <p dangerouslySetInnerHTML={{__html:splitImage?.HomeLandingPage?.splitImageLeftSection?.splitDescription}}></p>                                
                                     
                                     {splitImage?.HomeLandingPage?.splitImageLeftSection?.splitButton == null ? "" : (
                                      <Link href={splitImage?.HomeLandingPage?.splitImageLeftSection?.splitButton.url}>
                                      <Button className="SplitBtn">Get <span>Approved</span>
                                      </Button>
                                      </Link>
                                     )}
                                    

                                     </div>
                                 </Col>
                             </Row>
   
                         </Container>
                    )  }
                   
                   </section>
                )
            })}
          
        </>
    );
};

export default SplitImageLeft;