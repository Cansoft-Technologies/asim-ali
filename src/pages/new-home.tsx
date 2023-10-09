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
import { Col, Container, Row } from 'react-bootstrap';
import ContactSection from 'components/ContactSection';
import FlexibilityTab from 'components/FlexibilityTab';
import Image from 'next/image';
import MortgageFeatured from 'components/MortgageFeatured';
import ServiceSection from 'components/ServiceSection';
import HomeBuyerSection from 'components/HomeBuyerSection';

const MobileBanner = dynamic(() => import('components/MobileBanner'));



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
        NewHomeLandingPage {
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
      sliders: data?.pages?.nodes[0]?.NewHomeLandingPage?.homeSliderSection,
      msliders: data?.pages?.nodes[0]?.NewHomeLandingPage?.homeSliderSection,
      helps: data?.pages?.nodes[0]?.NewHomeLandingPage?.weHelpSection,
      teamData: data?.pages?.nodes[0]?.NewHomeLandingPage?.teamSection,
      meetings: data?.pages?.nodes[0]?.NewHomeLandingPage?.meetingSection,
      advisorData: data?.pages?.nodes[0]?.NewHomeLandingPage?.advisorSection,
      mortgageInterestData: data?.pages?.nodes[0]?.NewHomeLandingPage?.mortgageInterest,
      mortgageServiceData: data?.pages?.nodes[0]?.NewHomeLandingPage?.mortgageServiceSection,
      bottomPartnerLogoSection: data?.pages?.nodes[0]?.NewHomeLandingPage?.bottomPartnerLogoSection,
      splitImagesRight: data?.pages?.nodes[0]?.NewHomeLandingPage?.splitImageRightSection,
      splitImagesLeft: data?.pages?.nodes[0]?.NewHomeLandingPage?.splitImageLeftSection,
      featuredTextLeft: data?.pages?.nodes[0]?.NewHomeLandingPage?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewHomeLandingPage?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewHomeLandingPage?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewHomeLandingPage?.featuredTextRight,
      reviewData: data?.pages?.nodes[0]?.NewHomeLandingPage?.reviewSection,
      contactData: data?.pages?.nodes[0]?.NewHomeLandingPage?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewHomeLandingPage?.tabRenovation,
      approvalRenovationData: data?.pages?.nodes[0]?.NewHomeLandingPage?.approvalRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewHomeLandingPage?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewHomeLandingPage?.tipsImageLeft,
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
  tipsImageRight  : any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageInterestData: any;
  homebuyerSectionData: any;
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, metaData, sliders, msliders, helps, teamData, meetings, advisorData, splitImagesRight, reviewData,contactData,tabRenovationData,approvalRenovationData,bottomPartnerLogoSection,  featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,mortgageServiceData,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,splitImagesLeft,mortgageInterestData,homebuyerSectionData  } = props;

console.log(settings);
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
        <WeHelp helps={helps} />
        <Team teams={teamData} />
        <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
                <Container className="apply-now-home">
                <div className="text-center mt-5 mb-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: approvalRenovationData?.tabHeading,
                  }}
                ></div>
              </div>
                  <div className="mt-5">
                  <Row className="apply-step">
                  <Col md={4}>
                    {approvalRenovationData?.tabDetails[0] == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p className='title'>{approvalRenovationData?.tabDetails[0]?.title}</p>
                        <div className="desc" dangerouslySetInnerHTML={{
                    __html: approvalRenovationData?.tabDetails[0]?.description,
                  }}></div>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {approvalRenovationData?.tabDetails[1] == null  == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p className="title">
                          {approvalRenovationData?.tabDetails[1]?.title}
                        </p>
                        <div className="desc" dangerouslySetInnerHTML={{
                    __html: approvalRenovationData?.tabDetails[1]?.description,
                  }}></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {approvalRenovationData?.tabDetails[2] == null  == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p className='title'>{approvalRenovationData?.tabDetails[2]?.title}</p>
                        <div className="desc"  dangerouslySetInnerHTML={{
                    __html: approvalRenovationData?.tabDetails[2]?.description,
                  }}></div>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                  </div>
                </Container>
        <Meeting meetings={meetings} />
        <MortgageAdvisor advisorData={advisorData}/>
        <SplitImageRight splitImagesRight={splitImagesRight} />
        <MortgageFeatured advisorData={mortgageInterestData}/>
        <SplitImageLeft splitImagesLeft={splitImagesLeft} />
        <FlexibilityTab tabData={tabRenovationData}/>
        <MortgageAdvisor advisorData={mortgageServiceData}/>
                    <Container className="mb-5 px-3 py-3" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {tipsTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: tipsDescription,
                      }}
                    ></div>
                  </Container>
        <ServiceSection textLeft={tipsLeftText} textRight={tipsRightText} imageLeft={tipsImageLeft} imageRight={tipsImageRight}/>
        <HomeBuyerSection homebuyerData={homebuyerSectionData} />
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
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
