import dynamic from 'next/dynamic';
import { getNextStaticProps } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { CTA, Footer, Header } from 'components';
import { client } from 'client';
import { Carousel, Col, Row, Button, Container } from 'react-bootstrap';
import Image from 'next/image';
import styles from 'scss/components/Banner.module.scss';


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
import Link from 'next/link';

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



export async function getStaticProps() {
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
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
          HomeLandingPage {
            homeSliderSection {
              homeSlider {
                sliderTitle
                sliderSubtitle
                sliderDescription
                sliderImage {
                  sourceUrl
                }
                sliderButtonUrl {
                  url
                }
              }
            }
          }
          HomeLandingPage {
            partnerLogoSection {
              hideSection
              partnerLogo {
                sourceUrl
                altText
              }
            }
          }
          HomeLandingPage {
            weHelpSection {
              helpTitle
              helpDescription
              hideSection
              helpImage {
                mediaItemUrl
              }
            }
          }
        }
      }
      settingsOptions {
        AsimOptions {
          headerSettings {
            uploadLogo {
              sourceUrl
              altText
            }
          }
        }
      }

      menus(where: {location: PRIMARY}) {
        nodes {
          name
          slug
          menuItems(first: 50){
            nodes {
              url
              target
              parentId
              label
              cssClasses
              description
              id
              childItems {
                nodes {
                  uri
                  label
                }
              }
            }
          }
        }
      }
    }`,
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes,
      helps: data?.pages?.nodes,
      logos: data?.pages?.nodes,
    },
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  helps: any;
  logos: any;
};

export default function Page(props: MyProps) {
  const { metaData, sliders, helps, settings, mainMenus, logos } = props;



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
      <main className="content">
      <Header settings={settings} mainMenus={mainMenus} />
      <Banner sliders={sliders} />
      <WeHelp helps={helps} />
      <PartnerLogo logos={logos}/>
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

// export async function getStaticProps(context: GetStaticPropsContext) {
//   return getNextStaticProps(context, {
//     Page,
//     client,
    
//   });
// }

