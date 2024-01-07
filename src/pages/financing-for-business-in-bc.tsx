import { gql } from "@apollo/client";
import { Hero } from "components";
import FlexibilityTab from "components/FlexibilityTab";
import HomeBuyerSection from "components/HomeBuyerSection";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSection from "components/ServiceSection";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import AccordionSection from "components/AccordionSection";
import MortgageFeatured from "components/MortgageFeatured";
const CTA = dynamic(() => import("../components/CTA"));
const Banner = dynamic(() => import("../components/Banner"));
const WeHelp = dynamic(() => import("../components/WeHelp"));
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const PartnerLogo = dynamic(() => import("components/PartnerLogo"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
const FAQ = dynamic(() => import("components/FAQ"));
const Gallery = dynamic(() => import("components/Gallery"));
const FlexabilitySlider = dynamic(() => import("components/FlexabilitySlider"));
const SplitImageRight = dynamic(() => import("../components/SplitImageRight"));

const MobileBanner = dynamic(() => import("components/MobileBanner"));

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 3951 }) {
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
            NewFinance {
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
              bottomTextLeft
              bottomTextRight
              bottomImageRight {
                altText
                sourceUrl
              }
              bottomImageLeft {
                altText
                sourceUrl
              }
              serviceRightText
              serviceLeftText
              serviceImageRight {
                altText
                sourceUrl
              }
              serviceImageLeft {
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
              mortgageInterest {
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
              mortgagePartner {
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

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 50) {
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
      }
    `,
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      serviceLeftText: data?.pages?.nodes[0]?.NewFinance?.serviceLeftText,
      serviceRightText: data?.pages?.nodes[0]?.NewFinance?.serviceRightText,
      serviceImageLeft: data?.pages?.nodes[0]?.NewFinance?.serviceImageLeft,
      serviceImageRight:
        data?.pages?.nodes[0]?.NewFinance?.serviceImageRight,
      advisorData: data?.pages?.nodes[0]?.NewFinance?.advisorSection,
      mortgagePartnerData: data?.pages?.nodes[0]?.NewFinance?.mortgagePartner,
      mortgageInterestData:
        data?.pages?.nodes[0]?.NewFinance?.mortgageInterest,
      serviceBannerData: data?.pages?.nodes[0]?.NewFinance,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewFinance?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewFinance?.featuredTextLeft,
      featuredImageLeft:
        data?.pages?.nodes[0]?.NewFinance?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewFinance?.featuredImageRight,
      featuredTextRight:
        data?.pages?.nodes[0]?.NewFinance?.featuredTextRight,
        bottomTextLeft: data?.pages?.nodes[0]?.NewFinance?.bottomTextLeft,
      bottomImageLeft:
        data?.pages?.nodes[0]?.NewFinance?.bottomImageLeft,
      bottomImageRight:
        data?.pages?.nodes[0]?.NewFinance?.bottomImageRight,
      bottomTextRight:
        data?.pages?.nodes[0]?.NewFinance?.bottomTextRight,
      contactData: data?.pages?.nodes[0]?.NewFinance?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewFinance?.tabRenovation,
      tipsTitle: data?.pages?.nodes[0]?.NewFinance?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewFinance?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewFinance?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewFinance?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewFinance?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewFinance?.tipsImageLeft,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewFinance?.homebuyerSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  homebuyerSectionData: any;
  settings: any;
  mortgageInterestData: any;
  serviceLeftText: any;
  serviceRightText: any;
  serviceImageLeft: any;
  serviceImageRight: any;
  mainMenus: any;
  metaData: any;
  contactData: any;
  tabRenovationData: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  bottomTextLeft: any;
  bottomImageLeft: any;
  bottomImageRight: any;
  bottomTextRight: any;
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  serviceBannerData: any;
  advisorData: any;
  mortgagePartnerData: any;
};

export default function NewFinance(props: MyProps) {
  const {
    homebuyerSectionData,
    bottomTextLeft,
  bottomImageLeft,
  bottomImageRight,
  bottomTextRight,
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
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
    mortgagePartnerData,
    serviceLeftText,
    serviceRightText,
    serviceImageLeft,
    serviceImageRight,
    mortgageInterestData,
  } = props;

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
        <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        <ServiceSection
          textLeft={serviceLeftText}
          textRight={serviceRightText}
          imageLeft={serviceImageLeft}
          imageRight={serviceImageRight}
        />
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        <MortgageFeatured advisorData={advisorData} />
        <Container
          className="mb-5 px-3 py-3 my-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{tipsTitle}</h2>
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
            <ServiceSection
              textLeft={bottomTextLeft}
              textRight={bottomTextRight}
              imageLeft={bottomImageLeft}
              imageRight={bottomImageRight}
            />
        <FlexibilityTab tabData={tabRenovationData} />
        <MortgageAdvisor advisorData={mortgageInterestData} />
        <AccordionSection advisorData={mortgagePartnerData} />
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
