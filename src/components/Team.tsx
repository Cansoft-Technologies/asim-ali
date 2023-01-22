import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Image from 'next/image';
const Team = () => {

    const [teams, setTeams] = useState([]);

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
                  teamSection {
                    teamTitle
                    hideSection
                    teamImage {
                      sourceUrl
                      altText
                    }
                  }
                }
              }
            }
          }`,
      })
      .then((result) => setTeams(result?.data?.pages?.nodes));
  }, []);

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`
  }



    return (
        <>
           <Container> 
            
                {teams.map(team => {
                    return(
                       
                      <div key={team}>
                        {team?.HomeLandingPage?.teamSection?.hideSection == true ? "" : (
                          <div className='team_section'
                        style={{ 
                            backgroundImage: `url("${team?.HomeLandingPage?.teamSection?.teamImage?.sourceUrl}")` 
                          }} 
                          
                          > 
                         
                        <h2 dangerouslySetInnerHTML={{__html: team?.HomeLandingPage?.teamSection?.teamTitle}} ></h2>
                        </div>
                        )}
                        
                        </div>
                    )
                })}
                   

           
               
           </Container>
            
        </>
    );
};

export default Team;