import { gql } from "@apollo/client";
import { FAQ, Hero } from "components";
import AccordionSection from "components/AccordionSection";
import FlexibilityTab from "components/FlexibilityTab";
import MortgageAdvisor from "components/MortgageAdvisor";
import MortgageFeatured from "components/MortgageFeatured";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";
import LocationHero from "components/LocationHero";
import ClientReviews from "components/ClientReviews";
import CategoryTabs from "components/CatagoryTabs";
import FeaturedTab from "components/FeaturedTab";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 3950 }) {
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
            NewKelowna {
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
                reviewCard {
                  author
                  reviewText
                  clientImage {
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
                childItems(first: 150) {
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
  // Ensure no undefined values are returned in props
  const safe = (v) => v === undefined ? null : v;
  return {
    props: {
      settings: safe(data?.settingsOptions?.AsimOptions),
      mainMenus: safe(data?.menus?.nodes),
      metaData: safe(data?.pages?.nodes),
      serviceLeftText: safe(data?.pages?.nodes[0]?.NewKelowna?.serviceLeftText),
      serviceRightText: safe(data?.pages?.nodes[0]?.NewKelowna?.serviceRightText),
      serviceImageLeft: safe(data?.pages?.nodes[0]?.NewKelowna?.serviceImageLeft),
      serviceImageRight: safe(data?.pages?.nodes[0]?.NewKelowna?.serviceImageRight),
      advisorData: safe(data?.pages?.nodes[0]?.NewKelowna?.advisorSection),
      mortgageInterestData: safe(data?.pages?.nodes[0]?.NewKelowna?.mortgageInterest),
      serviceBannerData: safe(data?.pages?.nodes[0]?.NewKelowna),
      mortgageBenefitsData: safe(data?.pages?.nodes[0]?.NewKelowna?.mortgageBenifits),
      featuredTextLeft: safe(data?.pages?.nodes[0]?.NewKelowna?.featuredTextLeft),
      featuredImageLeft: safe(data?.pages?.nodes[0]?.NewKelowna?.featuredImageLeft),
      featuredImageRight: safe(data?.pages?.nodes[0]?.NewKelowna?.featuredImageRight),
      featuredTextRight: safe(data?.pages?.nodes[0]?.NewKelowna?.featuredTextRight),
      contactData: safe(data?.pages?.nodes[0]?.NewKelowna?.homeContactSection),
      tabRenovationData: safe(data?.pages?.nodes[0]?.NewKelowna?.tabRenovation),
      tipsTitle: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsTitle),
      tipsDescription: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsDescription),
      tipsLeftText: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsLeftText),
      tipsRightText: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsRightText),
      tipsImageRight: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsImageRight),
      tipsImageLeft: safe(data?.pages?.nodes[0]?.NewKelowna?.tipsImageLeft),
      faqData: safe(data?.pages?.nodes[0]?.NewKelowna?.faqSection),
      planSection: safe(data?.pages?.nodes[0]?.NewKelowna?.planSection),
      reviewSection: safe(data?.pages?.nodes[0]?.NewKelowna?.reviewSection),
    },
    revalidate: 60,
  };
}

type MyProps = {
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
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  serviceBannerData: any;
  advisorData: any;
  faqData: any;
  planSection: any;
  reviewSection: any;
};

export default function NewKelowna(props: MyProps) {
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
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
    serviceLeftText,
    serviceRightText,
    serviceImageLeft,
    serviceImageRight,
    mortgageInterestData,
    faqData,
    planSection,
    reviewSection,
  } = props;

  const teamTitle =
    '<h2 style="font-size: 40px;">Lenders <span style="color: #f0b243;">We Work With </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">
</span></p>\n` + "";
  const rateTitle = `
<h2>Current Mortgage Rates Kelowna</h2>
<p>
</p>

`;
  return (
    <>
      <Head>
        {metaData?.map((meta, index) => {
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
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        {/* <ServiceSection
          textLeft={serviceLeftText}
          textRight={serviceRightText}
          imageLeft={serviceImageLeft}
          imageRight={serviceImageRight}
        /> */}
        <OurRates title={rateTitle} />
        {/* <MortgageAdvisor advisorData={mortgageBenefitsData} /> */}
        {/* <AccordionSection advisorData={mortgageInterestData} /> */}
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
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
