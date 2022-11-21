import React, { useState, useEffect } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

const Favicon = () => {
    const [settings, setSettings] = useState([]);

    useEffect(() => {
      const client = new ApolloClient({
          uri: 'http://localhost:10004/graphql',
          cache: new InMemoryCache(),
        });
      client
      .query({
        query: gql`
        query{
          settingsOptions {
            settingsOptions {
              headerSettings {
                uploadFavicon {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }`,
      })
      .then((result) => setSettings(result?.data?.settingsOptions?.settingsOptions));
  }, []);

    return (
        <>
        {console.log("Favicon ",settings?.headerSettings?.uploadFavicon?.sourceUrl)}
            <link 
            rel="shortcut icon" 
            href={settings?.headerSettings?.uploadFavicon?.sourceUrl}
            />
        </>
    );
};

export default Favicon;