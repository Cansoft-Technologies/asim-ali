import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Container } from "react-bootstrap";
import { apolloClient } from "../lib/apollo";
const HomeComponents = dynamic(() => import("components/HomeComponents"));
const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));
const Banner = dynamic(() => import("../components/Banner"));
const WeHelp = dynamic(() => import("../components/WeHelp"));
const MobileBanner = dynamic(() => import("components/MobileBanner"));

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 2856}) {
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
        HomePage {
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
          featuredTextLeft
          featuredTextRight
          featuredImageRight {
            altText
            sourceUrl
          }
          featuredImageLeft {
            altText
            sourceUrl
          }
          approvalRenovation{
            tabHeading
            tabDetails{
              title
              description
            }
          }
          mortgageServiceSection {
            advisorTitle
            advisorDescriptionTop
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          tipsTitle
          tipsDescription
          tipsLeftText
          tipsRightText
          tipsImageRight {
            altText
            sourceUrl
          }
          tipsImageLeft {
            altText
            sourceUrl
          }
          homebuyerSection {
            advisorTitle
            advisorCards{
              title
              description
              image{
                sourceUrl
                altText
              }
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
          mortgageInterest {
            advisorTitle
            advisorDescriptionTop
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
          uploadLogoMobile {
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
            childItems (first: 50) {
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
  if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes[0]?.HomePage?.homeSliderSection,
      msliders: data?.pages?.nodes[0]?.HomePage?.homeSliderSection,
      helps: data?.pages?.nodes[0]?.HomePage?.weHelpSection,
      teamData: data?.pages?.nodes[0]?.HomePage?.teamSection,
      meetings: data?.pages?.nodes[0]?.HomePage?.meetingSection,
      advisorData: data?.pages?.nodes[0]?.HomePage?.advisorSection,
      mortgageInterestData: data?.pages?.nodes[0]?.HomePage?.mortgageInterest,
      mortgageServiceData:
        data?.pages?.nodes[0]?.HomePage?.mortgageServiceSection,
      bottomPartnerLogoSection:
        data?.pages?.nodes[0]?.HomePage?.bottomPartnerLogoSection,
      splitImagesRight: data?.pages?.nodes[0]?.HomePage?.splitImageRightSection,
      splitImagesLeft: data?.pages?.nodes[0]?.HomePage?.splitImageLeftSection,
      featuredTextLeft: data?.pages?.nodes[0]?.HomePage?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.HomePage?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.HomePage?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.HomePage?.featuredTextRight,
      reviewData: data?.pages?.nodes[0]?.HomePage?.reviewSection,
      contactData: data?.pages?.nodes[0]?.HomePage?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.HomePage?.tabRenovation,
      approvalRenovationData:
        data?.pages?.nodes[0]?.HomePage?.approvalRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.HomePage?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.HomePage?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.HomePage?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.HomePage?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.HomePage?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.HomePage?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.HomePage?.tipsImageLeft,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  teamData: any;
  meetings: any;
  advisorData: any;
  splitImagesRight: any;
  splitImagesLeft: any;
  reviewData: any;
  contactData: any;
  tabRenovationData: any;
  approvalRenovationData: any;
  bottomPartnerLogoSection: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  mortgageServiceData: any;
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageInterestData: any;
  homebuyerSectionData: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    sliders,
    msliders,
    helps,
    teamData,
    meetings,
    advisorData,
    splitImagesRight,
    reviewData,
    contactData,
    tabRenovationData,
    approvalRenovationData,
    bottomPartnerLogoSection,
    featuredTextLeft,
    featuredImageLeft,
    featuredImageRight,
    featuredTextRight,
    mortgageServiceData,
    tipsImageRight,
    tipsLeftText,
    tipsRightText,
    tipsDescription,
    tipsTitle,
    tipsImageLeft,
    splitImagesLeft,
    mortgageInterestData,
    homebuyerSectionData,
  } = props;

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
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
              <link
                rel="preload"
                href={msliders?.homeSlider[0].mobileImage?.sourceUrl}
                as="image"
              />
            </>
          );
        })}
      </Head>
      <main>
        <Header settings={settings} mainMenus={mainMenus} />
        <div className="desktop-banner">
          <Banner sliders={sliders} />
        </div>
        <div className="mobile-banner">
          <MobileBanner msliders={msliders} />
        </div>
        <Container>
          <div className="ms-auto mt-5 footer-partner-logo">
            {bottomPartnerLogoSection?.map((singleLogo) => {
              return (
                <div key={singleLogo.sourceUrl}>
                  <Image
                    src={singleLogo.sourceUrl}
                    width="350"
                    height="150"
                    alt={singleLogo.altText}
                    style={{ objectFit: "contain", width: "100%" }}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </Container>
        <WeHelp helps={helps} />
        <div>
          <HomeComponents
            teamData={teamData}
            featuredTextLeft={featuredTextLeft}
            featuredTextRight={featuredTextRight}
            featuredImageLeft={featuredImageLeft}
            featuredImageRight={featuredImageRight}
            approvalRenovationData={approvalRenovationData}
            sliders={sliders}
            meetings={meetings}
            advisorData={advisorData}
            splitImagesRight={splitImagesRight}
            mortgageInterestData={mortgageInterestData}
            splitImagesLeft={splitImagesLeft}
            tabRenovationData={tabRenovationData}
            mortgageServiceData={mortgageServiceData}
            tipsTitle={tipsTitle}
            tipsDescription={tipsDescription}
            tipsLeftText={tipsLeftText}
            tipsRightText={tipsRightText}
            tipsImageLeft={tipsImageLeft}
            tipsImageRight={tipsImageRight}
            homebuyerSectionData={homebuyerSectionData}
            contactData={contactData}
          />
        </div>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
