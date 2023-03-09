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

