import dynamic from 'next/dynamic';
import { getNextStaticProps } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { CTA, Footer, Header } from 'components';
import { client } from 'client';
const Banner = dynamic(() => import('../components/Banner'));
const WeHelp = dynamic(() => import('../components/WeHelp'));
const Team = dynamic(() => import('components/Team'));
const Meeting = dynamic(() => import('components/Meeting'));
const PartnerLogo = dynamic(() => import('components/PartnerLogo'));
const SplitImageLeft = dynamic(() => import('../components/SplitImageLeft'));
const FAQ = dynamic(() => import('components/FAQ'));
const Gallery = dynamic(() => import('components/Gallery'));
const FlexabilitySlider = dynamic(() => import('components/FlexabilitySlider'));
const SplitImageRight = dynamic(() => import('../components/SplitImageRight'));
import { useState } from 'react';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';

// import Banner from '../components/Banner';
// import WeHelp from '../components/WeHelp';
// import Team from 'components/Team';
// import Meeting from 'components/Meeting';
// import PartnerLogo from 'components/PartnerLogo';
// import SplitImageLeft from '../components/SplitImageLeft';
// import FAQ from 'components/FAQ';
// import Gallery from 'components/Gallery';
// import FlexabilitySlider from 'components/FlexabilitySlider';
// import SplitImageRight from '../components/SplitImageRight';


export default function Page() {

  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
        cache: new InMemoryCache(),
      });
    
    client
    .query({
      query: gql`query{
        pages(where: {id: 14}) {
          nodes {
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
          }
        }
      }`,
    })
    .then((result) => setMetaData(result?.data?.pages?.nodes));

}, []);


  return (
    <>
     <Head>
      {metaData.map((meta) => {
                   
              return(
                <>
                <title>{meta?.seo?.title}</title>
                <meta name="description" content={meta?.seo?.description} />
                <link rel="canonical" href={meta?.seo?.canonicalUrl} />
                <meta property="og:title" content={meta?.seo?.title} />
                <meta property="og:description" content={meta?.seo?.description} />
                <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
                </>
              )
                })}
      </Head>
      <Header />

     
      <main className="content">
        <Banner />
        <WeHelp />
        <PartnerLogo />
        <Team />
        <Meeting />
        <SplitImageLeft />

      <FlexabilitySlider />
      <SplitImageRight />
      <Gallery />
      <FAQ /> 
      <CTA />
      </main>
      
      <Footer/>

      
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    
  });
}

