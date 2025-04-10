import { gql } from "@apollo/client";
import { FAQ, Hero } from "components";
import FlexibilityTab from "components/FlexibilityTab";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import OurLenders from "components/OurLenders";
import OurRates from "components/OurRates";
import LocationHero from "components/LocationHero";
import FeaturedTab from "components/FeaturedTab";
import CategoryTabs from "components/CatagoryTabs";
import ClientReviews from "components/ClientReviews";
import EmbeddedMap from "components/EmbeddedMap";
import { Fragment } from "react";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3271}) {
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
        NewLangley {
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
          bottomFeaturedTextLeft
          bottomFeaturedTextRight
          bottomFeaturedImageRight {
            altText
            sourceUrl
          }
          bottomFeaturedImageLeft {
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
          benefitTitle
          benefitDescription
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
          mapSection {
            mapTitle
            mapUrl
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
      serviceBannerData: data?.pages?.nodes[0]?.NewLangley,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewLangley?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewLangley?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewLangley?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewLangley?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewLangley?.featuredTextRight,
      bottomFeaturedTextLeft:
        data?.pages?.nodes[0]?.NewLangley?.bottomFeaturedTextLeft,
      bottomFeaturedImageLeft:
        data?.pages?.nodes[0]?.NewLangley?.bottomFeaturedImageLeft,
      bottomFeaturedImageRight:
        data?.pages?.nodes[0]?.NewLangley?.bottomFeaturedImageRight,
      bottomFeaturedTextRight:
        data?.pages?.nodes[0]?.NewLangley?.bottomFeaturedTextRight,
      contactData: data?.pages?.nodes[0]?.NewLangley?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewLangley?.tabRenovation,
      tipsTitle: data?.pages?.nodes[0]?.NewLangley?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewLangley?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewLangley?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewLangley?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewLangley?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewLangley?.tipsImageLeft,
      benefitTitle: data?.pages?.nodes[0]?.NewLangley?.benefitTitle,
      benefitDescription: data?.pages?.nodes[0]?.NewLangley?.benefitDescription,
      faqData: data?.pages?.nodes[0]?.NewLangley?.faqSection,
      planSection:
        data?.pages?.nodes[0]?.NewLangley?.planSection,
      reviewSection: data?.pages?.nodes[0]?.NewLangley?.reviewSection,
      mapSection: data?.pages?.nodes[0]?.NewLangley?.mapSection,
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
  bottomFeaturedTextLeft: any;
  bottomFeaturedImageLeft: any;
  bottomFeaturedImageRight: any;
  bottomFeaturedTextRight: any;
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  serviceBannerData: any;
  benefitTitle: any;
  benefitDescription: any;
  faqData: any;
  planSection: any;
  reviewSection: any;
  mapSection: any;
};

export default function NewLangley(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    faqData,
    planSection,
    reviewSection,
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
    mortgageBenefitsData,
    bottomFeaturedTextLeft,
    bottomFeaturedImageLeft,
    bottomFeaturedImageRight,
    bottomFeaturedTextRight,
    serviceBannerData,
    benefitTitle,
    benefitDescription,
    mapSection,
    schemaCode
  } = props;

  const teamTitle =
    '<h2 style="font-size: 40px;">Lenders <span style="color: #f0b243;">We Work With</span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">
</span></p>\n` + "";
  const rateTitle = `
<h2 className="text-4xl font-rb md:text-5xl xl:text-[48px] font-bold leading-7">Current Mortgage Rates in Langley</h2>
`;
  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {
          return (
            <Fragment key={index}>
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
            </Fragment>
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
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{benefitTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: benefitDescription,
            }}
          ></div>
        </Container>
        <ServiceSection
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
        />
        {/* <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        /> */}
        
        <OurRates title={rateTitle} />
        <FeaturedTab tabData={tabRenovationData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <ClientReviews reviews={reviewSection} />
        <FAQ faqsections={faqData} />
        <CategoryTabs planData={planSection} />
        <Container className="mt-5">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-start"
          ></div>
        </Container>
        <EmbeddedMap mapData={mapSection}/>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
