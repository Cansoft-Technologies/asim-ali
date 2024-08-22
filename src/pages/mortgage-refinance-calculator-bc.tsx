import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

import MortgageAdvisor from "components/MortgageAdvisor";
import { apolloClient } from "lib/apollo";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 1893 }) {
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
            }
            Refinance {
              heroTitle
              heroDescription
              bannerTitle
              bannerHeading
              bannerDescription
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
              bannerImage {
                altText
                sourceUrl
              }
              productsTitle
              productsDescription
              productsRightText
              productsLeftText
              brokerTitle
              brokerDescription
              bottomBrokerTitle
              bottomBrokerDescription
              productsImage {
                altText
                sourceUrl
              }
              brokerImage {
                altText
                sourceUrl
              }

              brokerText
              renovation {
                title
                description
              }
              advisorData {
                advisorCards {
                  title
                  description
                }
                advisorTitle
                advisorDescriptionTop
                advisorImage {
                  altText
                  sourceUrl
                }
              }
              renovateImageFirst {
                altText
                sourceUrl
              }
              faqAccordion {
                question
                answer
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
      refinanceData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  refinanceData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Refinance = (props: MyProps) => {
  const { settings, mainMenus, refinanceData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {refinanceData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
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
              {data?.Refinance?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Refinance?.bannerTitle}
                  heading={data?.Refinance?.bannerHeading}
                  description={data?.Refinance?.bannerDescription}
                  bgImage={data?.Refinance?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Refinance?.bannerTitle?.split(" ")[0]}{" "}
                      <span>{data?.Refinance?.bannerTitle?.split(" ")[1]}</span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Refinance?.heroDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Refinance?.aboutImage?.sourceUrl}
                      alt={data?.Refinance?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor advisorData={data?.Refinance?.advisorData} />
                    </div>
                  </Container>
                </Row>
                <Row className="product-service">
                  <Col className="px-5" md={1}></Col>
                  <Col className="py-3" md={10} style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {data?.Refinance?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.productsDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                {data.Refinance.renovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data?.Refinance?.renovation?.map((tab, item) => {
                        return (
                          <Tab
                            key={item}
                            eventKey={item.toString()}
                            title={
                              <h3 className="location-tab-title">
                                {tab.title}
                              </h3>
                            }
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: tab.description,
                              }}
                              className="renovation-content-list"
                            ></div>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </Row>
                )}
                <Row className="mortgage-broker">
                <Col>
                <h2 className="headering-title">
                      Refinance Mortgage Calculator
                    </h2>
                    <iframe title="Mortgage Refinancing Savings Calculator - BMO" src="https://calculators.bmo.com/response/bmo/calc/home11?hide=logo" scrolling="auto" height="1420"  width="100%" id="persRefinanceSavingsCalc" style={{overflow: "hidden",border: "none"}}></iframe>
            </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Refinance?.brokerTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.brokerDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                </Row>
                <div className="service-row my-5">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={6}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.Refinance?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Refinance?.productsImage?.sourceUrl}
                            alt={data?.Refinance?.productsImage?.altText}
                            width="390"
                            height="400"
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div className="service-row my-5">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Refinance?.renovateImageFirst?.sourceUrl}
                            alt={data?.Refinance?.renovateImageFirst?.altText}
                            width="390"
                            height="400"
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.Refinance?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.brokerText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Refinance?.brokerImage?.sourceUrl}
                      alt={data?.Refinance?.brokerImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                  <Row className="mortgage-broker-bottom text-center mt-5">
                  <Col>
                    <h2>{data?.Refinance?.bottomBrokerTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Refinance?.bottomBrokerDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                {/* faq section start */}

                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Refinance?.faqAccordion?.map((qa, index) => {
                      return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header as="h3">
                            {qa.question}
                          </Accordion.Header>
                          <Accordion.Body
                            dangerouslySetInnerHTML={{ __html: qa.answer }}
                          ></Accordion.Body>
                        </Accordion.Item>
                      );
                    })}
                  </Accordion>
                </div>

                {/* faq section end */}
              </Container>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Refinance;
