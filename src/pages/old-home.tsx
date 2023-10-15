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
import ClientReviews from 'components/ClientReviews';
import MortgageAdvisor from 'components/MortgageAdvisor';
import { Container, Row } from 'react-bootstrap';
import ContactSection from 'components/ContactSection';
import FlexibilityTab from 'components/FlexibilityTab';
import Image from 'next/image';

const MobileBanner = dynamic(() => import('components/MobileBanner'));



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
            teamDescription
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
          advisorSection {
            advisorTitle
            advisorDescriptionBottom
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
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
          tabRenovation{
            tabHeading
            tabDetails{
              title
              description
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
          homeContactSection {
            title
            description
          }
          bottomPartnerLogoSection {
            altText
            sourceUrl
          }
          reviewSection {
            reviewTitle
            reviewDescription
            reviewCard{
              author
              reviewText
              clientImage{
                sourceUrl
                altText
              }
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
      sliders: data?.pages?.nodes[0]?.HomeLandingPage?.homeSliderSection,
      msliders: data?.pages?.nodes[0]?.HomeLandingPage?.homeSliderSection,
      helps: data?.pages?.nodes[0]?.HomeLandingPage?.weHelpSection,
      logos: data?.pages?.nodes,
      teamData: data?.pages?.nodes[0]?.HomeLandingPage?.teamSection,
      meetings: data?.pages?.nodes[0]?.HomeLandingPage?.meetingSection,
      advisorData: data?.pages?.nodes[0]?.HomeLandingPage?.advisorSection,
      bottomPartnerLogoSection: data?.pages?.nodes[0]?.HomeLandingPage?.bottomPartnerLogoSection,
      flexsliders: data?.pages?.nodes,
      splitImagesRight: data?.pages?.nodes[0]?.HomeLandingPage?.splitImageRightSection,
      images: data?.pages?.nodes,
      reviewData: data?.pages?.nodes[0]?.HomeLandingPage?.reviewSection,
      contactData: data?.pages?.nodes[0]?.HomeLandingPage?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.HomeLandingPage?.tabRenovation,
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
  teamData: any;
  meetings: any;
  advisorData: any;
  flexsliders: any;
  splitImagesRight: any;
  images: any;
  reviewData: any;
  contactData: any;
  tabRenovationData: any;
  bottomPartnerLogoSection: any;
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, metaData, sliders, msliders, helps, logos, teamData, meetings, advisorData, flexsliders, splitImagesRight, images, reviewData,contactData,tabRenovationData,bottomPartnerLogoSection } = props;

console.log(sliders);
  return (
    <>
      <Head>
        {metaData?.map((meta) => {

          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta name="robots" content="noindex,nofollow" />
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
        <Container>
              <div className="ms-auto mt-5 footer-partner-logo">
              {bottomPartnerLogoSection?.map(
                    (singleLogo) => {
                      return (
                        <div key={singleLogo.sourceUrl}>
                          <Image
                            src={singleLogo.sourceUrl}
                            width="350"
                            height="150"
                            alt={singleLogo.altText}
                            style={{ objectFit: "contain", width: "100%" }}
                          />
                        </div>
                      );
                    }
                  )}
              </div>
            </Container>
        <WeHelp helps={helps} />
        <PartnerLogo logos={logos} />
        <Team teams={teamData} />
        <FlexibilityTab tabData={tabRenovationData}/>
        <Meeting meetings={meetings} />
        <MortgageAdvisor advisorData={advisorData}/>
        <FlexabilitySlider flexsliders={flexsliders} />
        <SplitImageRight splitImagesRight={splitImagesRight} />
        <Gallery images={images} />
        <ClientReviews reviews={reviewData} />
        <CTA contactData={contactData}/>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
