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

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 4583}) {
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
        dominionLendingMortgageRates {
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
      serviceBannerData: data?.pages?.nodes[0]?.dominionLendingMortgageRates,
      reasonTitle:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.dominionLendingMortgageRates?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates
          ?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates
          ?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates
          ?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates
          ?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.dominionLendingMortgageRates?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.talkDescription,
      ratesTitle:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.dominionLendingMortgageRates?.ratesDescription,
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
  ratesTitle: any;
  ratesDescription: any;
};

export default function NewDominionLendingMortgageRates(props: MyProps) {
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
            <Col md={5} className="text-hide-sm">
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="400"
                
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
            <Col md={5} className="text-hide-pc">
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="300"
                height="300"
                
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
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

        <section className="split_section">
          <Container>
            <Row>
              <Col lg={7}>
                <div className="split_image">
                  <Image
                    src={borrowingPaymentData?.borrowingImage?.sourceUrl}
                    fill
                    alt={borrowingPaymentData?.borrowingImage?.altText}
                  />
                </div>
              </Col>
              <Col lg={5} className="service-texts">
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingRightDescription,
                  }}
                  className="service-content"
                ></div>
              </Col>
            </Row>
          </Container>
        </section>
        <div className="service-row my-5">
          <Container>
            <Row>
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: expertsHelpData?.helpLeftText,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={expertsHelpData?.helpRightImage?.sourceUrl}
                    alt={expertsHelpData?.helpRightImage?.altText}
                    width="390"
                    height="400"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "60vh",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

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
        <div className="tab-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">
              Apply <span>Now</span>
            </Button>
          </Link>
        </div>
        <TabNewBC tabData={tabWhyChooseData} />

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
