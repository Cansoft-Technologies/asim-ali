import { gql } from '@apollo/client';
import { Hero } from 'components';
import FlexibilityTab from 'components/FlexibilityTab';
import HomeBuyerSection from 'components/HomeBuyerSection';
import MortgageAdvisor from 'components/MortgageAdvisor';
import ServiceSection from 'components/ServiceSection';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apolloClient } from "../lib/apollo";
import { Fragment } from 'react';
import OurRates from 'components/OurRates';
import OurLenders from 'components/OurLenders';
import LocationHero from 'components/LocationHero';



export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3741}) {
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
        NewMaple {
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
      advisorData: data?.pages?.nodes[0]?.NewMaple?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewMaple,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewMaple?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewMaple?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewMaple?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewMaple?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewMaple?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewMaple?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewMaple?.tabRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewMaple?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewMaple?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewMaple?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewMaple?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewMaple?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewMaple?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewMaple?.tipsImageLeft,
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
  tipsImageRight  : any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  homebuyerSectionData: any;
  serviceBannerData: any;
  advisorData: any;
};

export default function NewMaple(props: MyProps) {
  const { settings, mainMenus, metaData,contactData,tabRenovationData, featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,homebuyerSectionData, serviceBannerData,advisorData,mortgageBenefitsData } = props;

  const teamTitle =
  '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">We have good relationships with more than 100 lenders. This wide range of networks includes big banks, local credit unions, and specialty finance companies. Our connections give us the flexibility to find you the best rates and terms, making your dream home more attainable. We're here to find the right fit for you in this wide world of financing. </span></p>\n` +
  "";
  const rateTitle = `
<h2>Mortgage Rates</h2>
<p>When it comes to mortgage rates, don't stress because Asim Ali your local mortgage broker in Maple Ridge, BC is here to lead you to the right decision. Interest rate on mortgage changes, which can impact the amount you pay for the house. We monitor these rates closely to give you choices that make the home-buying process more affordable. We aim to collaborate with you to determine the rates that fit your budget.</p>

`;
  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {

          return (
            <Fragment key={index}>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
            </Fragment>
          )
        })}
      </Head>
        <Header settings={settings} mainMenus={mainMenus} />
      <main className="content">
        {serviceBannerData?.serviceBannerTitle == null ? (
                ""
              ) : (
                <LocationHero
                  title={serviceBannerData?.serviceBannerTitle}
                  heading={serviceBannerData?.serviceBannerHeading}
                  description={serviceBannerData?.serviceBannerDescription}
                  bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
                />
              )}
              <Container className="mb-5">
              <Row className="my-5 coquitlam-grid">
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
        <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
        <OurRates title={rateTitle}/>
                      <FlexibilityTab tabData={tabRenovationData}/>
                      <MortgageAdvisor advisorData={mortgageBenefitsData}/>
        <HomeBuyerSection homebuyerData={homebuyerSectionData} />
        <OurLenders title={teamTitle} description={teamDescription} />
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
