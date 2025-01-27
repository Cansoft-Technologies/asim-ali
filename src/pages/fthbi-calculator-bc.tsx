import { gql } from "@apollo/client";
import { Hero } from "components";
import FirstTimeHomeBuyerCalculator from "components/Fthb";
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
      pages(where: {id: 5336}) {
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
        fthbiCalculatorBc {
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
          
          readvanceableTitle
          readvanceableDescription
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
          reasonLeftText2
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
          bottomText
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
          processTitle
          processDescription
          reasonLeftTextCopy
          
          reasonRightImageCopy {
            altText
            sourceUrl
          }
          leftText
          rightImage {
            altText
            sourceUrl
          }
          leftText2
          rightImage2 {
            altText
            sourceUrl
          }
          leftText3
          rightImage3 {
            altText
            sourceUrl
          }
          leftText4
          rightImage4 {
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
      serviceBannerData: data?.pages?.nodes[0]?.fthbiCalculatorBc,
      reasonTitle: data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonDescription,
      readvanceableTitle:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.readvanceableTitle,
      readvanceableDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.readvanceableDescription,
      processTitle: data?.pages?.nodes[0]?.fthbiCalculatorBc?.processTitle,
      processDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.processDescription,
      reasonLeftText: data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonLeftText,
      reasonLeftText2:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonLeftText2,
      reasonRightImage:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonRightImage,
      reasonRightImage2:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonRightImage2,
      reasonRightText:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.fthbiCalculatorBc?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.reasonRightImageCopy,
      leftText: data?.pages?.nodes[0]?.fthbiCalculatorBc?.leftText,
      rightImage: data?.pages?.nodes[0]?.fthbiCalculatorBc?.rightImage,
      leftText2: data?.pages?.nodes[0]?.fthbiCalculatorBc?.leftText2,
      rightImage2: data?.pages?.nodes[0]?.fthbiCalculatorBc?.rightImage2,
      leftText3: data?.pages?.nodes[0]?.fthbiCalculatorBc?.leftText3,
      rightImage3: data?.pages?.nodes[0]?.fthbiCalculatorBc?.rightImage3,
      leftText4: data?.pages?.nodes[0]?.fthbiCalculatorBc?.leftText4,
      rightImage4: data?.pages?.nodes[0]?.fthbiCalculatorBc?.rightImage4,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.borrowingPayment,
      expertsHelpData: data?.pages?.nodes[0]?.fthbiCalculatorBc?.expertsHelp,
      tabWhyChooseData: data?.pages?.nodes[0]?.fthbiCalculatorBc?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.processBorrowing,
      bottomText: data?.pages?.nodes[0]?.fthbiCalculatorBc?.bottomText,
      qualifyingTitle:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.fthbiCalculatorBc?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.fthbiCalculatorBc?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.fthbiCalculatorBc?.ratesDescription,
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
  readvanceableTitle: any;
  readvanceableDescription: any;
  processTitle: any;
  processDescription: any;
  reasonLeftText: any;
  reasonLeftText2: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  reasonRightImage2: any;
  loanTitle: any;
  reasonLeftTextCopy: any;
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
  ratesTitle: any;
  ratesDescription: any;
  leftText: any;
  rightImage: any;
  leftText2: any;
  rightImage2: any;
  leftText3: any;
  rightImage3: any;
  leftText4: any;
  rightImage4: any;
  bottomText: any;
};

export default function FTHBICalculatorInBC(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    readvanceableTitle,
    readvanceableDescription,
    processTitle,
    processDescription,
    loanTitle,
    reasonDescription,
    reasonLeftText,
    reasonLeftText2,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    reasonRightImage2,
    reasonLeftTextCopy,
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
    leftText,
    rightImage,
    leftText2,
    rightImage2,
    leftText3,
    rightImage3,
    leftText4,
    rightImage4,
    bottomText,
  } = props;

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
            buttonLeft={true}
            buttonText="GET APPROVED"
            buttonURL="/contact-us"
            button2Text="APPLY NOW"
            button2URL="/apply-now"
          />
        )}
        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={6}>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.aboutText,
                }}
              ></div>
              <div className="tab-btn-left">
                <Link href={"/contact-us"}>
                  <Button className="HeadBtn">Explore FTHBI Now!</Button>
                </Link>
              </div>
            </Col>
            <Col md={6}>
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
          <h2 className="text-center">{readvanceableTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: readvanceableDescription,
            }}
          ></div>
        </Container>
        <Container className="mb-5">
          <FirstTimeHomeBuyerCalculator />
        </Container>
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center" style={{ color: "#f0b254" }}>
            {reasonTitle}
          </h2>
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

        <Container
          className="mb-5 px-3 py-3 mt-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{ratesTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: ratesDescription,
            }}
          ></div>
          <div
            className="tab-btn-left"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">Start Your Journey!</Button>
            </Link>
          </div>
        </Container>
        <ServiceSection
          textLeft={reasonLeftText2}
          textRight={reasonLeftTextCopy}
          imageLeft={reasonRightImageCopy}
          imageRight={reasonRightImage2}
        />
        <ServiceSection
          textLeft={leftText}
          textRight={leftText2}
          imageLeft={rightImage2}
          imageRight={rightImage}
        />
        <div className="service-row">
          <Container>
            <Row>
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: leftText3,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={rightImage3?.sourceUrl}
                    alt={rightImage3?.altText}
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
        <Container className="my-5">
          <div
            dangerouslySetInnerHTML={{
              __html: bottomText,
            }}
            className="text-center"
          ></div>
        </Container>

        <TabNewBC
          tabData={tabWhyChooseData}
          buttonText="Unlock Home Dreams!"
          buttonUrl="/apply-now"
        />

        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={6}>
              <div
                dangerouslySetInnerHTML={{
                  __html: leftText4,
                }}
              ></div>
              <div className="tab-btn-left">
                <Link href={"/apply-now"}>
                  <Button className="HeadBtn">
                    Explore Your Possibilities!
                  </Button>
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <Image
                src={rightImage4?.sourceUrl}
                alt={rightImage4?.altText}
                width="390"
                height="400"
                
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
        <Container className="my-5">
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
