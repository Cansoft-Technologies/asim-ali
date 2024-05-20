import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
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
    query: gql`query{
      pages(where: {id: 4862}) {
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
        mortgageBrokerNanaimo {
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
          ratesTitle2
          ratesDescription2
          
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
      serviceBannerData: data?.pages?.nodes[0]?.mortgageBrokerNanaimo,
      reasonTitle: data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonLeftText,
      reasonLeftText2:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonLeftText2,
      reasonRightImage:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonRightImage,
      reasonRightImage2:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonRightImage2,
      reasonRightText:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.ratesDescription,
      ratesTitle2: data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.ratesTitle2,
      ratesDescription2:
        data?.pages?.nodes[0]?.mortgageBrokerNanaimo?.ratesDescription2,
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
  ratesTitle2: any;
  ratesDescription2: any;
};

export default function NewMortgageBrokerInNanaimo(props: MyProps) {
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
    ratesTitle2,
    ratesDescription2,
  } = props;
  const teamTitle =
  '<h2 style="font-size: 40px;"><span style="color: #f0b243;">Lenders </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">Lenders play a crucial role in the mortgage process and as a top mortgage broker service, we work closely with a diverse network of lenders (100 to be exact!) to offer our clients a range of loan options tailored to their unique needs and financial situations. </span></p>\n` +
  "";
  const rateTitle = `
<h2>Our Rates</h2>
<p>Everyone likes saving money. That's why we are dedicated to searching for the best deals available out there for you. Our rates are like a special secret recipe that helps you pay less every month. We collaborate with multiple lenders to make sure you get a rate that makes you smile.</p>

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

        <div style={{ height: "50px" }}></div>
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
                    __html: reasonLeftText,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={reasonRightImage?.sourceUrl}
                    alt={reasonRightImage?.altText}
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
        <div className="service-row mt-5">
          <Container>
            <Row>
            <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={reasonLeftImage?.sourceUrl}
                    alt={reasonLeftImage?.altText}
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
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: reasonRightText,
                  }}
                ></div>
              </Col>
            </Row>
          </Container>
        </div>
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
              <Col lg={7}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingTitle,
                  }}
                  className="text-start"
                ></div>
                <h2 className="text-start borrowing-title">
                  {borrowingPaymentData?.borrowingTitle2}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: borrowingPaymentData?.borrowingDescriptionTop,
                  }}
                  className=""
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

        <div className="tab-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">
              Apply <span>Now</span>
            </Button>
          </Link>
        </div>
        <AccordionNewBC homebuyerData={commonConcernsData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <div style={{ height: "50px" }}></div>
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
