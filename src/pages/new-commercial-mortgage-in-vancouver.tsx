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
import { Hero } from 'components';
import AccordionSection from 'components/AccordionSection';

const MobileBanner = dynamic(() => import('components/MobileBanner'));



export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3272}) {
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
        NewComVancouver {
          serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
                altText
                sourceUrl
              }
              aboutText
              aboutImage {
                altText
                sourceUrl
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
          benefitTitle
          benefitDescription
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
          advisorSection {
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
          mortgageBenifits {
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
          tabRenovation{
            tabHeading
            tabDetails{
              title
              description
            }
          }
          homeContactSection {
            title
            description
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
      advisorData: data?.pages?.nodes[0]?.NewComVancouver?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewComVancouver,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewComVancouver?.mortgageBenifits,
      mortgageInterestData: data?.pages?.nodes[0]?.NewComVancouver?.mortgageInterest,
      mortgageServiceData: data?.pages?.nodes[0]?.NewComVancouver?.mortgageServiceSection,
      featuredTextLeft: data?.pages?.nodes[0]?.NewComVancouver?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewComVancouver?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewComVancouver?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewComVancouver?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewComVancouver?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewComVancouver?.tabRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewComVancouver?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewComVancouver?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewComVancouver?.tipsDescription,
      benefitTitle: data?.pages?.nodes[0]?.NewComVancouver?.benefitTitle,
      benefitDescription: data?.pages?.nodes[0]?.NewComVancouver?.benefitDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewComVancouver?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewComVancouver?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewComVancouver?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewComVancouver?.tipsImageLeft,
    },
    revalidate: 60
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  contactData: any;
  tabRenovationData: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  mortgageServiceData: any;
  tipsImageRight  : any;
  tipsTitle: any;
  tipsDescription: any;
  benefitTitle: any;
  benefitDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  homebuyerSectionData: any;
  serviceBannerData: any;
  advisorData: any;
  mortgageInterestData: any;
};

export default function NewComVancouver(props: MyProps) {
  const { settings, mainMenus, metaData,contactData,tabRenovationData, featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,mortgageServiceData,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,homebuyerSectionData, serviceBannerData,advisorData,mortgageBenefitsData,benefitTitle,benefitDescription,mortgageInterestData } = props;

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
              <meta name="robots" content="noindex,nofollow" />
            </>
          )
        })}
      </Head>
        <Header settings={settings} mainMenus={mainMenus} />
      <main className="content">
        {serviceBannerData?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={serviceBannerData?.serviceBannerTitle}
                  heading={serviceBannerData?.serviceBannerHeading}
                  description={serviceBannerData?.serviceBannerDescription}
                  bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
                />
              )}
              <Container className="mb-5">
              <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: serviceBannerData?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={serviceBannerData?.aboutImage?.sourceUrl}
                      alt={serviceBannerData?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                </Container>
                <Container className="mb-5 px-3 py-3" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {benefitTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: benefitDescription,
                      }}
                    ></div>
                  </Container>
                <MortgageAdvisor advisorData={mortgageBenefitsData}/>
        <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
        <MortgageAdvisor advisorData={advisorData}/>
                    <Container className="mb-5 px-3 py-3 my-5" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
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
        <FlexibilityTab tabData={tabRenovationData}/>
        <AccordionSection advisorData={mortgageServiceData}/>
        <MortgageAdvisor advisorData={mortgageInterestData}/>
        <HomeBuyerSection homebuyerData={homebuyerSectionData} />
        <Container className="mb-5">
        <h2 className="text-center service-title">{contactData?.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: contactData?.description,
        }}
        className="text-lg text-start"
      ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
