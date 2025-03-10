import { gql } from "@apollo/client";
import { FAQ } from "components";
import CategoryTabs from "components/CatagoryTabs";
import ClientReviews from "components/ClientReviews";
import FeaturedTab from "components/FeaturedTab";
import LocationHero from "components/LocationHero";
import OurLenders from "components/OurLenders";
import OurRates from "components/OurRates";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import DownPaymentCalculator from "components/DownPaymentCalculator";

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
        schemaField {
          schemaCode
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
          planSection {
            planTitle
            linkUrls {
              linkText
              url
            }
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
      faqData: data?.pages?.nodes[0]?.NewAbbotsford?.faqSection,
      planSection:
        data?.pages?.nodes[0]?.NewAbbotsford?.planSection,
      reviewSection: data?.pages?.nodes[0]?.NewAbbotsford?.reviewSection,
      schemaCode: data?.pages?.nodes[0]?.schemaField?.schemaCode,
    },
    revalidate: 60,
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
  faqData: any;
  planSection: any;
  reviewSection: any;
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
    faqData,
    planSection,
    reviewSection,
    schemaCode
  } = props;

  const teamTitle =
      '<h2 style="font-size: 40px;">Lenders <span style="color: #f0b243;">We Work With </span></h2>\n' +
      "";
   const teamDescription =
      `<p><span style="font-weight: 400;"></span></p>\n` +
      "";
      const rateTitle = `
  <h2>Current Mortgage Rates In Abbotsford</h2>
<p></p>

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
              <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: schemaCode }}
          key="product-jsonld"
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
          <LocationHero
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
                
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
        <OurRates title={rateTitle} />
        <Container
          className="mb-5 px-3 py-3 my-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center service-title">{tipsTitle}</h2>
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
        {/* <ServiceSection
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
        /> */}
        {/* <MortgageAdvisorLoc advisorData={mortgageBenefitsData} /> */}
        <FeaturedTab tabData={tabRenovationData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <ClientReviews reviews={reviewSection} />
        <FAQ faqsections={faqData} />
        <CategoryTabs planData={planSection} />
        {/* <iframe title="Mortgage Down Payment Calculator - BMO" src="https://calculators.bmo.com/response/bmo/calc/home07?hide=logo" scrolling="auto" height="1500" className="width--100" width="100%" id="persMortgageDownPaymentCalc" style={{ overflow: 'hidden', border: 'none' }}></iframe> */}
        <Container className="mt-5">
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
