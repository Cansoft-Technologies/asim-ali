import { gql } from "@apollo/client";
import { Hero } from "components";
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
};

export default function NewLangley(props: MyProps) {
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
    mortgageBenefitsData,
    bottomFeaturedTextLeft,
    bottomFeaturedImageLeft,
    bottomFeaturedImageRight,
    bottomFeaturedTextRight,
    serviceBannerData,
    benefitTitle,
    benefitDescription,
  } = props;

  const teamTitle =
    '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Private Lenders For Mortgage </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">We're proud to work with a big team of over 100 lenders! This means we can find just the right one for you. Think of it like having a huge box of crayons to color your dream home - the more colors you have, the better you can paint your perfect picture. Our lenders are friendly and understand all kinds of situations, so no matter what your story is, we can match you with someone who gets it.
</span></p>\n` + "";
  const rateTitle = `
<h2>Langley Mortgage Rates</h2>
<p>Talking about rates can seem a bit tricky, but it's just about finding out how much it costs to borrow money for your house. We work hard to make sure you get a great deal. Think of it like this: if you were buying a new car and one dealership had it for less money than another, you'd want to go to the cheaper dealership, right? It's the same with borrowing money for a house. We look around at lots of different places to find you a rate that's like getting your new car at the best price!
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
        <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        
        <OurRates title={rateTitle} />
        <FlexibilityTab tabData={tabRenovationData} />
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
