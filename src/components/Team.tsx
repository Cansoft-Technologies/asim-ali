import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const Team = () => {

    const [teams, setTeams] = useState([]);

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



    return (
        <>
           <Container> 
            
                {teams.map(team => {
                    return(
                       
                      <div key={team}>
                        {team?.homeLandingPage?.teamSection?.hideSection == true ? "" : (
                          <div className='team_section'
                        style={{ 
                            backgroundImage: `url("${team?.homeLandingPage?.teamSection?.teamImage?.sourceUrl}")` 
                          }} > 
                        <h2 dangerouslySetInnerHTML={{__html: team?.homeLandingPage?.teamSection?.teamTitle}} ></h2>
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