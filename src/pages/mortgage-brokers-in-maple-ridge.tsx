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
          schemaField {
          schemaCode
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
      schemaCode: data?.pages?.nodes[0]?.schemaField?.schemaCode,
    },
    revalidate: 60
  };
}

type MyProps = {
  schemaCode: any;
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
  const { settings, mainMenus, metaData,contactData,tabRenovationData, featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,homebuyerSectionData, serviceBannerData,advisorData,mortgageBenefitsData,schemaCode } = props;

  const teamTitle =
  '<p style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></p>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">We have good relationships with more than 100 lenders. This lender network includes big banks, local credit unions, and specialty finance companies. It will help us find you the best rates and terms. We're here to find the right fit for you in this wide world of financing. </span></p>\n` +
  "";
  const rateTitle = `
<h2>Current Mortgage Rates in Maple Ridge</h2>
<p></p>

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
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaCode }}
          key="product-jsonld"
        />
            </Fragment>
          )
        })}
      </Head>
        <Header settings={settings} menuData={mainMenus} />
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
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
