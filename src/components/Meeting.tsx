import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';


const Meeting = () => {
    const [meetings, setMeetings] = useState([]);

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
                  meetingSection {
                    meetingTitle
                    meetingDescription
                    hideSection
                    meetingImage {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setMeetings(result?.data?.pages?.nodes));
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }


    return (
        <>
           <section className='meeting_section'>
            {meetings.map(meeting => {
                return(
                <div key={meeting}>
                    {meeting?.homeLandingPage?.meetingSection?.hideSection == true ? "" : (
                    <Container>
                    <Row> 
                        <Col> 
                            <h2 dangerouslySetInnerHTML={{__html: meeting?.homeLandingPage?.meetingSection?.meetingTitle}} ></h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                           <div dangerouslySetInnerHTML={{__html: meeting?.homeLandingPage?.meetingSection?.meetingDescription}} className="meeting_text">
                           </div>
                        </Col>
                        <Col lg={8}>
                            <div className="meeting_image">
                            <Image 
                            loader={myLoader}
                            src={meeting?.homeLandingPage?.meetingSection?.meetingImage?.sourceUrl}
                            width="1920" 
                            height="1228" 
                            alt={meeting?.homeLandingPage?.meetingSection?.meetingImage?.altText} />
                            </div>
                        </Col>
                    </Row>
                    </Container>
                    )}
                    
                </div>
                )
            }) }
            
           </section>
        </>
    );
};

export default Meeting;