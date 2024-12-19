import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";
import LocationHero from "components/LocationHero";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 5072}) {
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
        mortgageBrokerChilliwack {
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
          
          reasonTitle
          reasonDescription
          reasonLeftText
          reasonRightText
          reasonLeftImage {
            altText
            sourceUrl
          }
          reasonRightImage {
            altText
            sourceUrl
          }
          
          borrowingPayment{
            borrowingTitle
            borrowingDescriptionTop
            borrowingRightDescription
            borrowingImage {
              sourceUrl
              altText
            }
          }
          servicesSection{
            helpLeftText
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
          }
          expertsHelp{
            expertsHelpTitle
            expertsHelpDescription
            helpLeftText
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
          }
          journeySection{
            title
            description
            helpLeftText
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
          }
          journeySection1{
            helpLeftText
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
          }
          journeyLeftText
          journeyRightImage {
            altText
            sourceUrl
          }

          ratesTitle
          ratesDescription
          
          tabWhyChoose{
            tabHeading
            tabDescription
            tabDetails{
              title
              description
            }
          }
          
          reasonLeftTextCopy
          reasonRightTextCopy
          reasonLeftImageCopy {
            altText
            sourceUrl
          }
          reasonRightImageCopy {
            altText
            sourceUrl
          }
 
          commonConcerns {
            advisorTitle
            advisorDescription
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          talkTitle
          talkDescription
          
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
      serviceBannerData: data?.pages?.nodes[0]?.mortgageBrokerChilliwack,
      reasonTitle: data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonLeftImage,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.reasonLeftImageCopy,
      journeyLeftText:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.journeyLeftText,
      journeyRightImage:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.journeyRightImage,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.borrowingPayment,
      expertsHelpData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.expertsHelp,
      servicesSectionData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.servicesSection,
      journeySectionData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.journeySection,
      journeySectionData1:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.journeySection1,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.tabWhyChoose,
      commonConcernsData:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.mortgageBrokerChilliwack?.ratesDescription,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  serviceBannerData: any;
  reasonTitle: any;
  reasonDescription: any;
  reasonLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  borrowingPaymentData: any;
  expertsHelpData: any;
  servicesSectionData: any;
  tabWhyChooseData: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
  ratesTitle: any;
  ratesDescription: any;
  journeySectionData: any;
  journeySectionData1: any;
  journeyLeftText: any;
  journeyRightImage: any;
};

export default function NewMortgageBrokerChilliwack(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    reasonDescription,
    reasonLeftText,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    reasonLeftTextCopy,
    reasonRightTextCopy,
    reasonLeftImageCopy,
    reasonRightImageCopy,
    borrowingPaymentData,
    expertsHelpData,
    servicesSectionData,
    tabWhyChooseData,
    commonConcernsData,
    talkTitle,
    talkDescription,
    ratesTitle,
    ratesDescription,
    journeySectionData,
    journeySectionData1,
    journeyLeftText,
    journeyRightImage,
  } = props;
  const teamTitle =
  '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Mortgage Lenders  </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">At Asim Ali, our strength lies in our extensive network, boasting connections with over 100 lenders. This diverse array of financial institutions and private lenders ensures that we can cater to a wide variety of needs and situations. Our partnerships enable us to present our clients with a multitude of mortgage options, from conventional loans to more specialized financing solutions.
</span></p>\n` + "";
const rateTitle = `
<h2>Our Current Mortgage Rates Chilliwack​</h2>
<p>We believe in transparency and providing value to our clients. While our rates are competitive and designed to suit various financial situations, they are subject to market conditions and individual creditworthiness. We work diligently to secure the most favorable rates for you by leveraging our extensive network of lenders. To get a detailed understanding of our current rates and how they can be tailored to your specific needs, we encourage a one-on-one consultation. This approach ensures that you receive the most accurate and personalized rate information possible.</p>

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
          <LocationHero
            title={serviceBannerData?.serviceBannerTitle}
            heading={serviceBannerData?.serviceBannerHeading}
            description={serviceBannerData?.serviceBannerDescription}
            bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
            buttonLeft={true}
            buttonText="GET APPROVED"
            buttonURL="/contact-us"
            button2Text="APPLY NOW"
            button2URL="/apply-now"
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
          <h2 className="text-center">{reasonTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: reasonDescription,
            }}
          ></div>
        </Container>

        <ServiceSection
          textLeft={expertsHelpData?.helpLeftText}
          textRight={expertsHelpData?.helpRightText}
          imageLeft={expertsHelpData?.helpLeftImage}
          imageRight={expertsHelpData?.helpRightImage}
        />
        <ServiceSection
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
        />
        <OurRates title={rateTitle} />
        <section className="split_section mt-5">
          <Container>
            <Row>
              <Col lg={5} className="text-hide-pc">
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingRightDescription,
                  }}
                  className=""
                ></div>
              </Col>
              <Col lg={6}>
              <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingTitle,
                  }}
                  className=""
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingDescriptionTop,
                  }}
                  className="mt-5"
                ></div>
                <div className="split_image">
                  <Image
                    src={borrowingPaymentData?.borrowingImage?.sourceUrl}
                    fill
                    alt={borrowingPaymentData?.borrowingImage?.altText}
                  />
                </div>
              </Col>
              <Col lg={6} className="text-hide-sm">
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingRightDescription,
                  }}
                  className=""
                ></div>
              </Col>
            </Row>
          </Container>
        </section>
        <div style={{ height: "50px" }}></div>


        <AccordionNewBC homebuyerData={commonConcernsData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <div style={{ height: "100px" }}></div>
        <Container className="mb-5">
          <h2 className="text-center service-title">{talkTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
