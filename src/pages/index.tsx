import { getNextStaticProps } from '@faustjs/next';
import { GetStaticPropsContext } from 'next';
import Head from 'next/head';
import React from 'react';
import { CTA, Footer, Header } from 'components';
import { client } from 'client';
import Banner from '../components/Banner';
import WeHelp from '../components/WeHelp';
import Team from 'components/Team';
import Meeting from 'components/Meeting';
import PartnerLogo from 'components/PartnerLogo';
import SplitImageLeft from '../components/SplitImageLeft';
import FAQ from 'components/FAQ';
import Gallery from 'components/Gallery';
import FlexabilitySlider from 'components/FlexabilitySlider';
import SplitImageRight from '../components/SplitImageRight';

export default function Page() {


  const { usePosts, useQuery } = client;
  const generalSettings = useQuery().generalSettings;


  return (
    <>
      <Header />

      <Head>

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      <meta name="theme-color" content="#ffffff" />

        <title>
          {generalSettings.title} - {generalSettings.description}
        </title>
      </Head>
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

