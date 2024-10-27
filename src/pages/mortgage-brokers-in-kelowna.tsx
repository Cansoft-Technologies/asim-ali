import { gql } from "@apollo/client";
import { Hero } from "components";
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
      }
    `,
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
      serviceLeftText: data?.pages?.nodes[0]?.NewKelowna?.serviceLeftText,
      serviceRightText: data?.pages?.nodes[0]?.NewKelowna?.serviceRightText,
      serviceImageLeft: data?.pages?.nodes[0]?.NewKelowna?.serviceImageLeft,
      serviceImageRight:
        data?.pages?.nodes[0]?.NewKelowna?.serviceImageRight,
      advisorData: data?.pages?.nodes[0]?.NewKelowna?.advisorSection,
      mortgageInterestData:
        data?.pages?.nodes[0]?.NewKelowna?.mortgageInterest,
      serviceBannerData: data?.pages?.nodes[0]?.NewKelowna,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewKelowna?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewKelowna?.featuredTextLeft,
      featuredImageLeft:
        data?.pages?.nodes[0]?.NewKelowna?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewKelowna?.featuredImageRight,
      featuredTextRight:
        data?.pages?.nodes[0]?.NewKelowna?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewKelowna?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewKelowna?.tabRenovation,
      tipsTitle: data?.pages?.nodes[0]?.NewKelowna?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewKelowna?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewKelowna?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewKelowna?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewKelowna?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewKelowna?.tipsImageLeft,
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
  } = props;

  const teamTitle =
    '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders In Kelowna </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">We pride ourselves on our strong relationships with over 100 lenders. This extensive network includes major banks, credit unions, and private lenders, all offering a variety of mortgage products. This diversity guarantees that we can get you a good product to fit your financial background and homeownership dreams. Our mission is to come up with an offer that is the best fit for you so that your homeownership ride will be smooth.
</span></p>\n` + "";
  const rateTitle = `
<h2>Current Mortgage Rates Kelowna</h2>
<p>Exploring mortgage rates can feel like navigating a maze, but don't worry, we've got your back. Our job is to hunt down rates that not only fit your budget but also make your dream of homeownership more achievable. Each client's financial situation is unique, which is why we offer a personalized approach, ensuring the rates we find are tailored just for you. Keep in mind, that mortgage rates fluctuate due to market conditions, but our commitment to finding you the best deal remains steadfast.
</p>

`;
  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
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
          textLeft={serviceLeftText}
          textRight={serviceRightText}
          imageLeft={serviceImageLeft}
          imageRight={serviceImageRight}
        />
        <OurRates title={rateTitle} />
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        <AccordionSection advisorData={mortgageInterestData} />
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
