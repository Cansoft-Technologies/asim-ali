import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const SplitImageRight = () => {

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
                homeLandingPage {
                  splitImageRightSection {
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
                    { splitImage?.homeLandingPage?.splitImageRightSection?.hideSection == true ? "" : (
                       <Container>
                             <Row className="flex-row-reverse">
                                 <Col lg={8}>
                                     <div className="split_image">
                                     <Image 
                                     src={splitImage?.homeLandingPage?.splitImageRightSection?.splitImage?.sourceUrl} 
                                     loader={myLoader}
                                     width="1556" 
                                     height="1921" 
                                     alt={splitImage?.homeLandingPage?.splitImageRightSection?.splitImage?.altText} />
                                     </div>
                                 </Col>
                                 <Col lg={4}>
                                     <div className="split_text">
                                     <h2 dangerouslySetInnerHTML={{__html:splitImage?.homeLandingPage?.splitImageRightSection?.splitTitle}} ></h2>
                                     <p>{splitImage?.homeLandingPage?.splitImageRightSection?.splitDescription}</p>                                
                                     {splitImage?.homeLandingPage?.splitImageRightSection?.splitButton == null ? "" : (
                                      <Link href={splitImage?.homeLandingPage?.splitImageRightSection?.splitButton.url}>
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

export default SplitImageRight;