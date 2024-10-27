import { gql } from "@apollo/client";
import { Hero } from "components";
import FlexibilityTab from "components/FlexibilityTab";
import HomeBuyerSection from "components/HomeBuyerSection";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3348}) {
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
        NewAbbotsford {
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
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      advisorData: data?.pages?.nodes[0]?.NewAbbotsford?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewAbbotsford,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewAbbotsford?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewAbbotsford?.featuredTextLeft,
      featuredImageLeft:
        data?.pages?.nodes[0]?.NewAbbotsford?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewAbbotsford?.featuredImageRight,
      featuredTextRight:
        data?.pages?.nodes[0]?.NewAbbotsford?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewAbbotsford?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewAbbotsford?.tabRenovation,
      homebuyerSectionData:
        data?.pages?.nodes[0]?.NewAbbotsford?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewAbbotsford?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewAbbotsford?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewAbbotsford?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewAbbotsford?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewAbbotsford?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewAbbotsford?.tipsImageLeft,
    },
    revalidate: 60,
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
  tipsImageRight: any;
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

export default function NewAbbotsford(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    contactData,
    tabRenovationData,
    featuredTextLeft,
    featuredImageLeft,
    featuredImageRight,
    featuredTextRight,
    tipsImageRight,
    tipsLeftText,
    tipsRightText,
    tipsDescription,
    tipsTitle,
    tipsImageLeft,
    homebuyerSectionData,
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
  } = props;

  const teamTitle =
      '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders in Abbotsford </span></h2>\n' +
      "";
   const teamDescription =
      `<p><span style="font-weight: 400;">Asim Ali is your trusted mortgage broker in Abbotsford, we're proud to work with more than 100 lenders. This means we have a lot of choices to help find the perfect loan for you. We work with big banks, special loan places, and other types of lenders. Our goal is to make sure you get a great loan that makes you happy. </span></p>\n` +
      "";
      const rateTitle = `
  <h2>Current Mortgage Rates In Abbotsford</h2>
<p>As your go-to mortgage broker in Abbotsford, BC Asim Ali wants to make sure you get a great deal. Our rates are very friendly, and we work hard to find you loans that won't break the bank. We chat with lots of lenders to make sure you get a rate that fits just right with what you need. Remember, different people need different rates, and we're here to help find the best one for you.</p>

  `;
  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link
                rel="canonical"
                href={
                  meta?.seo?.canonicalUrl?.endsWith("/")
                    ? meta?.seo?.canonicalUrl?.slice(0, -1)
                    : meta?.seo?.canonicalUrl
                }
              />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
            </>
          );
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
        
        <Container
          className="mb-5 px-3 py-3 my-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <p className="text-center service-title">{tipsTitle}</p>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: tipsDescription,
            }}
          ></div>
        </Container>
        <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        <ServiceSection
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
        />
        <OurRates title={rateTitle} />
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        <FlexibilityTab tabData={tabRenovationData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <Container className="mb-5">
          <p className="text-center service-title">{contactData?.title}</p>
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
