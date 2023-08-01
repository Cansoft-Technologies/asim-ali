import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
const CTA = dynamic(() => import('../components/CTA'));
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
import { apolloClient } from "../lib/apollo";
import { gql } from '@apollo/client';
import { serviceData, weHelpData, advisorData,contactData } from 'dummyData/dummy';
const MobileBanner = dynamic(() => import('components/MobileBanner'));
import { teamData } from 'dummyData/dummy';
import { splitLeftData } from 'dummyData/dummy';
// import { splitRightData } from 'dummyData/dummy';
import { meetingData } from 'dummyData/dummy';
import FlexibilityTab from '../components/FlexibilityTab';
import { tabData } from 'dummyData/dummy';
import OurServices from 'components/OurServices';
import { reviewData } from 'dummyData/dummy';
import ContactSection from 'components/ContactSection';
import ClientReviews from 'components/ClientReviews';
import MortgageAdvisor from 'components/MortgageAdvisor';
import { Container } from 'react-bootstrap';
export async function getStaticProps() {

  const { data } = await apolloClient.query({
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
          jsonLd {
            raw
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
              mobileImage {
                sourceUrl
              }
              sliderButtonUrl {
                url
              }
            }
          }
          weHelpSection {
            helpTitle
            helpDescription
            hideSection
            helpImage {
              mediaItemUrl
            }
          }
         partnerLogoSection {
            hideSection
            partnerLogo {
              sourceUrl
              altText
            }
          }
         teamSection {
            teamTitle
            hideSection
            teamImage {
              sourceUrl
              altText
            }
          }
          meetingSection {
            meetingTitle
            meetingDescription
            hideSection
            meetingImage {
              sourceUrl
              altText
            }
          }
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
          flexabilitySlider {
            sliderTitle
            sliderSubtitle
            sliderDescription
            sliderImage {
              altText
              sourceUrl
            }
            sliderButtonUrl {
              url
            }
          }
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
          gallery {
            hideSection
            galleryImage1 {
              altText
              sourceUrl
            }
            galleryImage2 {
              altText
              sourceUrl
            }
            galleryImage3 {
              altText
              sourceUrl
            }
            galleryImage4 {
              altText
              sourceUrl
            }
            galleryImage5 {
              altText
              sourceUrl
            }
          }
          faqSection {
            hideSection
            faqTitle
            faqSubitle
            faqImage {
              altText
              sourceUrl
            }
            faqAccordion {
              question
              answer
            }
          }
          callToActionSection {
            hideSection
            actionTitle
            actionLink {
              url
              title
            }
            actionBackgroundImage {
              sourceUrl
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
        generalSettings {
            schemaProductRating
        }
        footerSettings {
          socialUrl {
            facebook
            tiktok
            linkedin
            instagram
          }
          copyrightText
          footerLeftWidget {
            title
            phoneNumber
            emailAddress
          }
          footerLogoSection {
            logoText
            logoUpload {
              altText
              sourceUrl
            }
          }
          footerRightWidget {
            title
            address
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
      msliders: data?.pages?.nodes,
      helps: data?.pages?.nodes,
      logos: data?.pages?.nodes,
      teams: data?.pages?.nodes,
      meetings: data?.pages?.nodes,
      splitImagesLeft: data?.pages?.nodes,
      flexsliders: data?.pages?.nodes,
      splitImagesRight: data?.pages?.nodes,
      images: data?.pages?.nodes,
      faqsections: data?.pages?.nodes,
    },
    revalidate: 60
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  logos: any;
  teams: any;
  meetings: any;
  splitImagesLeft: any;
  flexsliders: any;
  splitImagesRight: any;
  images: any;
  faqsections: any;
};

export default function NewHome(props: MyProps) {
  const { settings, mainMenus, metaData, sliders, msliders, helps, logos, teams, meetings, splitImagesLeft, flexsliders, splitImagesRight, images, faqsections } = props;

  return (
    <>
      <Head>
        {metaData?.map((meta) => {

          return (
            <>
              <noscript dangerouslySetInnerHTML={{
                __html: meta?.seo?.jsonLd?.raw,
              }}>

              </noscript>
              {meta?.seo?.jsonLd?.raw}

              <title>{meta?.seo?.title}</title>
              <meta name="robots" content="noindex" />
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
        <div className='desktop-banner'>
          <Banner sliders={sliders} />
        </div>
        <div className='mobile-banner'>
          <MobileBanner msliders={msliders} />
        </div>
        <WeHelp helps={weHelpData} />
        <PartnerLogo logos={logos} />
        <Team teams={teamData} />
        <Meeting meetings={meetingData} />
        <SplitImageLeft splitImagesLeft={splitLeftData} />
        <OurServices serviceData={serviceData} />
        <FlexibilityTab tabData={tabData} />
        <MortgageAdvisor advisorData={advisorData}/>
        <ClientReviews reviews={reviewData} />
        <FAQ faqsections={faqsections} />
        <CTA />
        <ContactSection />
        <Container className="mb-5">
        <p className="text-center service-title">{contactData?.title}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: contactData?.description,
        }}
        className="text-lg text-center"
      ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />


    </>
  );
}
