import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4933 }) {
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
            mortgageBrokerCampbell {
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
              processBorrowing {
                advisorTitle
                advisorDescriptionTop
                advisorCards {
                  title
                  description
                }
              }
              processBelowDesc
              borrowingPayment {
                borrowingTitle
                borrowingDescriptionTop
                borrowingRightDescription
                borrowingImage {
                  sourceUrl
                  altText
                }
              }
              expertsHelp {
                expertsHelpTitle
                expertsHelpDescription
                helpLeftText
                helpRightText
                helpLeftImage {
                  sourceUrl
                  altText
                }
                helpRightImage {
                  sourceUrl
                  altText
                }
              }
              ratesTitle
              ratesDescription

              tabWhyChoose {
                tabHeading
                tabDescription
                tabDetails {
                  title
                  description
                }
              }
              loanTitle
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

              qualifyingTitle
              qualifyingDescription
              commonConcerns {
                advisorTitle
                advisorDescription
                advisorImage {
                  sourceUrl
                  altText
                }
                advisorCards {
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
      serviceBannerData: data?.pages?.nodes[0]?.mortgageBrokerCampbell,
      reasonTitle: data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.mortgageBrokerCampbell?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.mortgageBrokerCampbell?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.talkDescription,
      processBelowDesc:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.processBelowDesc,
      ratesTitle: data?.pages?.nodes[0]?.mortgageBrokerCampbell?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.mortgageBrokerCampbell?.ratesDescription,
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
  loanTitle: any;
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  borrowingPaymentData: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
  processBelowDesc: any;
  ratesTitle: any;
  ratesDescription: any;
};

export default function NewMortgageBrokerInCampbellRiver(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    loanTitle,
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
    tabWhyChooseData,
    borrowingProcessData,
    qualifyingTitle,
    qualifyingDescription,
    commonConcernsData,
    talkTitle,
    talkDescription,
    ratesTitle,
    ratesDescription,
    processBelowDesc,
  } = props;
  const teamTitle =
    '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Campbell River Mortgage Lender </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">With our expansive network of over 100 lenders, we've got your back when it comes to exploring every imaginable financing option. This diverse network includes both traditional banks and alternative lending institutions, granting us access to the most favorable rates and terms customized to your unique circumstances. Our relationships with these lenders are built on trust and years of experience, affording us the ability to advocate on your behalf with confidence.
  </span></p>\n` + "";
  const rateTitle = `
<h2>Current Mortgage Rates In Campbell River</h2>
<p>These days, mortgage rates can be as unpredictable as the weather, shifting frequently. We keep an eye on these rates every day to find the best deals for you. Rates can go up and down daily, so it's important to check with us for the most recent information. We promise to help you understand these rates and show you how they fit into your home-buying plans.</p>

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
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: ratesTitle,
            }}
          ></div>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: ratesDescription,
            }}
          ></div>
        </Container>

        <ServiceSection
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
        />

        <ServiceSection
          textLeft={reasonLeftTextCopy}
          textRight={reasonRightTextCopy}
          imageLeft={reasonLeftImageCopy}
          imageRight={reasonRightImageCopy}
        />
        <OurRates title={rateTitle} />
        <AccordionNewBC homebuyerData={commonConcernsData} />
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
              <Col lg={7}>
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
              <Col lg={5} className="text-hide-sm">
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
        <OurLenders title={teamTitle} description={teamDescription} />
        <div style={{ height: "15px" }}></div>
        <Container className="mb-5 mt-5">
          <p className="text-center service-title">{talkTitle}</p>
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
