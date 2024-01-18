import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 4720}) {
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
        fixedMortgageRatesBc {
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
          reasonLeftText2
          reasonRightText
          reasonLeftImage {
            altText
            sourceUrl
          }
          reasonRightImage {
            altText
            sourceUrl
          }
          reasonRightImage2 {
            altText
            sourceUrl
          }
          processBorrowing {
            advisorTitle
            advisorDescriptionTop
            advisorCards{
              title
              description
            }
          }
          processBelowDesc
          borrowingPayment{
            borrowingTitle
            borrowingDescriptionTop
            borrowingRightDescription
            borrowingImage {
              sourceUrl
              altText
            }
          }
          expertsHelp{
            expertsHelpTitle
            expertsHelpDescription
            helpLeftText
            helpLeftText2
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
            helpRightImage2{
                sourceUrl
                altText
            }    
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
        menuItems(first: 50){
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
      serviceBannerData: data?.pages?.nodes[0]?.fixedMortgageRatesBc,
      reasonTitle: data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonLeftText,
      reasonLeftText2:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonLeftText2,
      reasonRightImage:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonRightImage,
      reasonRightImage2:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonRightImage2,
      reasonRightText:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.fixedMortgageRatesBc?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.borrowingPayment,
      processBelowDesc:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.processBelowDesc,

      expertsHelpData: data?.pages?.nodes[0]?.fixedMortgageRatesBc?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.fixedMortgageRatesBc?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.fixedMortgageRatesBc?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.fixedMortgageRatesBc?.ratesDescription,
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
  reasonLeftText2: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  reasonRightImage2: any;
  loanTitle: any;
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  borrowingPaymentData: any;
  processBelowDesc: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
  ratesTitle: any;
  ratesDescription: any;
};

export default function NewFixedMortgageRatesBC(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    loanTitle,
    reasonDescription,
    reasonLeftText,
    reasonLeftText2,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    reasonRightImage2,
    reasonLeftTextCopy,
    reasonRightTextCopy,
    reasonLeftImageCopy,
    reasonRightImageCopy,
    borrowingPaymentData,
    processBelowDesc,
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
  } = props;

  return (
    <>
      <Head>
        {metaData?.map((meta) => {
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
        <div className="service-row">
          <Container>
            <Row>
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: expertsHelpData?.helpLeftText2,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={expertsHelpData?.helpRightImage2?.sourceUrl}
                    alt={expertsHelpData?.helpRightImage2?.altText}
                    width="390"
                    height="400"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "45vh",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div className="mt-5">
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
        </div>

        <ServiceSection
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
        />
        <div className="service-row">
          <Container>
            <Row>
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: reasonLeftText2,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={reasonRightImage2?.sourceUrl}
                    alt={reasonRightImage2?.altText}
                    width="390"
                    height="400"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "45vh",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <div style={{ marginTop: "60px" }}>
          <div className="tab-btn">
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">
                Apply <span>Now</span>
              </Button>
            </Link>
          </div>
        </div>
        <TabNewBC tabData={tabWhyChooseData} />
        <HomeBuyerNewBC advisorData={borrowingProcessData} />

        <Container>
          <p
            className="text-lg text-center my-5"
            dangerouslySetInnerHTML={{
              __html: processBelowDesc,
            }}
          ></p>
        </Container>

        <AccordionNewBC homebuyerData={commonConcernsData} />
        <Container className="mb-5">
          <h2 className="text-center service-title">{talkTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
          <div className="tab-btn">
            <Link href={"/contact-us"}>
              <Button className="HeadBtn">
                Contact <span>Us</span>
              </Button>
            </Link>
          </div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
