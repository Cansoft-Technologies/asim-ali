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
      pages(where: {id: 4651}) {
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
        dischargeMortgageBc {
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
            advisorCards{
              title
              description
            }
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
      serviceBannerData: data?.pages?.nodes[0]?.dischargeMortgageBc,
      reasonTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonDescription,
      processTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.processTitle,
      processDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.processDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.borrowingPayment,

      expertsHelpData: data?.pages?.nodes[0]?.dischargeMortgageBc?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.ratesDescription,
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
  processTitle: any;
  processDescription: any;
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
  ratesTitle: any;
  ratesDescription: any;
};

export default function DischargeMortgageBc(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    processTitle,
    processDescription,
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
  } = props;

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
      <Header settings={settings} menuData={mainMenus} />
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
        <div className="tab-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">
              Apply <span>Now</span>
            </Button>
          </Link>
        </div>
        <TabNewBC tabData={tabWhyChooseData} />
        <HomeBuyerNewBC advisorData={borrowingProcessData} />

        <AccordionNewBC homebuyerData={commonConcernsData} />
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{processTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: processDescription,
            }}
          ></div>
        </Container>
        <ServiceSection
          textLeft={reasonLeftTextCopy}
          textRight={reasonRightTextCopy}
          imageLeft={reasonLeftImageCopy}
          imageRight={reasonRightImageCopy}
        />
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
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
