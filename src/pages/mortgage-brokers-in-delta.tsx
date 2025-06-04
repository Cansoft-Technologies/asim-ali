import { gql } from "@apollo/client";
import { FAQ, Hero } from "components";
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
import { Fragment } from "react";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";
import LocationHero from "components/LocationHero";
import FeaturedTab from "components/FeaturedTab";
import ClientReviews from "components/ClientReviews";
import CategoryTabs from "components/CatagoryTabs";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 3564 }) {
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
            NewDelta {
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
                advisorCards {
                  title
                  description
                  image {
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
                advisorCards {
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
                advisorCards {
                  title
                  description
                }
              }
              tabRenovation {
                tabHeading
                tabDetails {
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

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 150) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems(first: 50) {
                  nodes {
                    uri
                    label
                  }
                }
              }
            }
          }
        }
      }
    `,
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
      advisorData: data?.pages?.nodes[0]?.NewDelta?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewDelta,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewDelta?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewDelta?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewDelta?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewDelta?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewDelta?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewDelta?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewDelta?.tabRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewDelta?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewDelta?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewDelta?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewDelta?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewDelta?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewDelta?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewDelta?.tipsImageLeft,
      faqData: data?.pages?.nodes[0]?.NewDelta?.faqSection,
      planSection:
        data?.pages?.nodes[0]?.NewDelta?.planSection,
      reviewSection: data?.pages?.nodes[0]?.NewDelta?.reviewSection,
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

export default function NewDelta(props: MyProps) {
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
    '<h2 style="font-size: 40px;">Lenders <span style="color: #f0b243;">We Work With</span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">
</span></p>\n` + "";
  const rateTitle = `
<h2>Current Mortgage Rates in Delta</h2>
<p>
</p>

`;
  return (
    <>
      <Head>
        {metaData?.map((meta, index) => {
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
        {/* <MortgageAdvisor advisorData={mortgageBenefitsData} /> */}
        <FeaturedTab tabData={tabRenovationData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <ClientReviews reviews={reviewSection} />
        <CategoryTabs planData={planSection} />
        <FAQ faqsections={faqData} />
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
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
