import { gql } from "@apollo/client";
import Head from "next/head";
import { apolloClient } from "../lib/apollo";
import { Fragment } from "react";
import Header from "components/homepage/header";
import HeroSection from "components/homepage/hero-section";
import AboutSection from "components/homepage/about-section";
import MortgageRatesSection from "components/homepage/mortgage-rates-section";
import RoleSection from "components/homepage/role-section";
import ApprovalProcessSection from "components/homepage/approval-process-section";
import ScheduleMeetingSection from "components/homepage/schedule-meeting-section";
import TalkToUsSection from "components/homepage/talk-to-us-section";
import ServicesSection from "components/homepage/services-section";
import CalculatorToolsSection from "components/homepage/calculator-tools-section";
import Footer from "components/homepage/footer";


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
            teamImages {
              image {
                sourceUrl
                altText
              }
              linkUrl
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
          planSection {
            planTitle
            linkUrls {
              linkText
              url
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
            logoUploadTwo {
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
        menuItems(first: 150){
          nodes {
            url
            target
            parentId
            label
            cssClasses
            description
            id
            childItems (first: 150) {
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
      planSection:
        data?.pages?.nodes[0]?.HomePage?.planSection,
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
  planSection: any;
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
    planSection,
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
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const schemaCode = settings?.generalSettings?.schemaProductRating;
  return (
    <>
      <Head>
        {metaData?.map((meta, index) => {
          return (
            <Fragment key={index}>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
              <meta name="robots" content="noindex"></meta>
              <meta property="og:title" content={meta?.seo?.title} />
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
              <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: schemaCode }}
                        key="product-jsonld"
                      />
            </Fragment>
          );
        })}
      </Head>
      <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <MortgageRatesSection />
      <RoleSection />
      <TalkToUsSection />
      <ApprovalProcessSection />
      <ScheduleMeetingSection />
      <CalculatorToolsSection />
      <Footer />
    </main>
    </>
  );
}
