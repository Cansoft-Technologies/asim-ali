import { gql } from "@apollo/client";
import { Hero } from "components";
import BorrowingPayment from "components/BorrowingPayment";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 4458}) {
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
        newMortgageSelfEmployedBc {
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
          differenceLeftText
          mortgageLeftText
          reasonRightText
          reasonLeftImage {
            altText
            sourceUrl
          }
          reasonRightImage {
            altText
            sourceUrl
          }
          differenceRightImage {
            altText
            sourceUrl
          }
          mortgageRightImage {
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
          tabWhyChoose{
            tabHeading
            tabDescription
            tabDetails{
              title
              description
            }
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
      serviceBannerData: data?.pages?.nodes[0]?.newMortgageSelfEmployedBc,
      reasonTitle:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonLeftText,
      differenceLeftText:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.differenceLeftText,
      mortgageLeftText:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.mortgageLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonRightImage,
      differenceRightImage:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.differenceRightImage,
      mortgageRightImage:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.mortgageRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.reasonLeftImage,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.borrowingPayment,
      expertsHelpData:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.newMortgageSelfEmployedBc?.talkDescription,
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
  differenceLeftText: any;
  mortgageLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  differenceRightImage: any;
  mortgageRightImage: any;
  borrowingPaymentData: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
};

export default function NewMortgageSelfEmployedInBC(props: MyProps) {
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
    borrowingPaymentData,
    expertsHelpData,
    tabWhyChooseData,
    borrowingProcessData,
    qualifyingTitle,
    qualifyingDescription,
    commonConcernsData,
    talkTitle,
    talkDescription,
    differenceLeftText,
    differenceRightImage,
    mortgageLeftText,
    mortgageRightImage,
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
                quality={100}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>

        <BorrowingPayment borrowingPaymentData={borrowingPaymentData} />
        <section className="my-5">
          <div className="service-row">
            <Container>
              <Row>
                <Col className="service-texts" lg={6}>
                  <div
                    className="service-content"
                    dangerouslySetInnerHTML={{
                      __html: differenceLeftText,
                    }}
                  ></div>
                </Col>
                <Col className="service-texts" lg={6}>
                  <div className="service-image">
                    <Image
                      src={differenceRightImage?.sourceUrl}
                      alt={differenceRightImage?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

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
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
        />
        <section className="my-5">
          <div className="service-row">
            <Container>
              <Row>
                <Col className="service-texts" lg={6}>
                  <div
                    className="service-content"
                    dangerouslySetInnerHTML={{
                      __html: mortgageLeftText,
                    }}
                  ></div>
                </Col>
                <Col className="service-texts" lg={6}>
                  <div className="service-image">
                    <Image
                      src={mortgageRightImage?.sourceUrl}
                      alt={mortgageRightImage?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </section>

        <Container>
          <Row
            className="mortgage-broker text-center"
            style={{ marginTop: "80px" }}
          >
            <Col>
              <h2 className="headering-title">
                {expertsHelpData?.expertsHelpTitle}
              </h2>
              <p className="service-content">
                {expertsHelpData?.expertsHelpDescription}
              </p>
            </Col>
          </Row>
        </Container>
        <ServiceSection
          textLeft={expertsHelpData?.helpLeftText}
          textRight={expertsHelpData?.helpRightText}
          imageLeft={expertsHelpData?.helpLeftImage}
          imageRight={expertsHelpData?.helpRightImage}
        />
        {/*  */}
        <TabNewBC tabData={tabWhyChooseData} />
        <HomeBuyerNewBC advisorData={borrowingProcessData} />

        {/*  */}
        <Container>
          <div>
            <div className=" my-5">
              <div
                dangerouslySetInnerHTML={{
                  __html: commonConcernsData?.advisorTitle,
                }}
                className="text-center service-title text-lg tab-head"
              ></div>
              <div
                dangerouslySetInnerHTML={{
                  __html: commonConcernsData?.advisorDescription,
                }}
                className="text-center text-sm"
              ></div>
            </div>
            <div className="service-row my-5">
              <Container>
                <Row>
                  <Col>
                    <div className="faq-accordion">
                      <Accordion defaultActiveKey="0">
                        {commonConcernsData?.advisorCards?.map((qa, index) => {
                          return (
                            <Accordion.Item
                              key={index}
                              eventKey={index.toString()}
                            >
                              <Accordion.Header as="h3">
                                {qa?.title}
                              </Accordion.Header>
                              <Accordion.Body
                                dangerouslySetInnerHTML={{
                                  __html: qa?.description,
                                }}
                              ></Accordion.Body>
                            </Accordion.Item>
                          );
                        })}
                      </Accordion>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
          </div>
        </Container>

        <Container className="mb-5">
          <p className="text-center service-title">{talkTitle}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
