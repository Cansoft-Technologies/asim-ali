import { gql } from "@apollo/client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { apolloClient } from "lib/apollo";
import Link from "next/link";
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
        pages(where: { id: 557 }) {
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
            coquitlam {
              coquitlamBannerTitle
              coquitlamBannerHeading
              coquitlamBannerDescription
              contactTitle
              contactDescription
              topDescription
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              mortgageProductsTitle
              mortgageProductsRightText
              mortgageProductsLeftText
              mortgageBrokerBottomText
              mortgageBrokerTitle
              mortgageBrokerDescription
              firstApplyStepTitle
              brokerCoquitlamTitle
              brokerCoquitlamDescription
              aboutCoquitlamText
              mortgageProductsImage {
                altText
                sourceUrl
              }
              coquitlamSlider {
                title
                content
              }
              coquitlamBannerImage {
                altText
                sourceUrl
              }
              brokerCoquitlamLink {
                url
              }
              aboutCoquitlamImage {
                altText
                sourceUrl
              }
              mortgageRenovation {
                title
                description
              }
              faqImage {
                altText
                sourceUrl
              }
              renovateImageFirst {
                altText
                sourceUrl
              }
              renovateImageSecond {
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
              footerPartnerLogoSection {
                footerPartnerLogo {
                  altText
                  sourceUrl
                }
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
            menuItems(first: 50) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems {
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

  return {
    props: {
      coquitlamData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  coquitlamData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const BcCoquitlam = (props: MyProps) => {
  const { settings, mainMenus, coquitlamData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {coquitlamData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData?.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl} />
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
              {data?.coquitlam?.coquitlamBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.coquitlam?.coquitlamBannerTitle}
                  heading={data?.coquitlam?.coquitlamBannerHeading}
                  description={data?.coquitlam?.coquitlamBannerDescription}
                  bgImage={data?.coquitlam?.coquitlamBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.coquitlam?.coquitlamBannerTitle?.split(" ")[0]}{" "}
                      <span>
                        {data?.coquitlam?.coquitlamBannerTitle?.split(" ")[1]}
                      </span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.coquitlam?.topDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.coquitlam?.aboutCoquitlamText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.coquitlam?.aboutCoquitlamImage?.sourceUrl}
                      alt={data?.coquitlam?.aboutCoquitlamImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                <Row className="product-service">
                  <Col className="mb-5" md={12}>
                    <h2 className="text-center">
                      {data?.coquitlam?.mortgageProductsTitle}
                    </h2>
                    <p className="text-center">
                    As one of the best & trusted Mortgage Brokers in Coquitlam, We offer a wide range of services to meet your mortgage needs. We provide personalized solutions and tailored advice to ensure that you get the best mortgage rates and terms.
                    </p>
                  </Col>
                  <div className="service-row my-5">
                      <Container>
                        <Row>
                          <Col className="service-texts" lg={6}>
                            <div className="service-image">
                              <Image
                                src={data?.coquitlam?.renovateImageFirst?.sourceUrl}
                                alt={data?.coquitlam?.renovateImageFirst?.altText}
                                width="390"
                                height="400"
                                style={{ width: "100%", objectFit: "contain" }}
                              />
                            </div>
                          </Col>
                          <Col className="service-texts" lg={6}>
                            <div className="service-content" dangerouslySetInnerHTML={{
                        __html: data?.coquitlam?.mortgageProductsLeftText,
                      }}
                    >
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  <div className="service-row my-5">
                      <Container>
                        <Row>
                          <Col className="service-texts" lg={6}>
                            <div className="service-content" dangerouslySetInnerHTML={{
                        __html: data?.coquitlam?.mortgageProductsRightText,
                      }}
                    >
                            </div>
                          </Col>
                          <Col className="service-texts" lg={6}>
                            <div className="service-image">
                              <Image
                                src={data?.coquitlam?.mortgageProductsImage?.sourceUrl}
                                alt={data?.coquitlam?.mortgageProductsImage?.altText}
                                width="390"
                                height="400"
                                style={{ width: "100%", objectFit: "contain" }}
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
                                src={data?.coquitlam?.faqImage?.sourceUrl}
                                alt={data?.coquitlam?.faqImage?.altText}
                                width="390"
                                height="400"
                                style={{ width: "100%", objectFit: "contain" }}
                              />
                            </div>
                          </Col>
                          <Col className="service-texts" lg={6}>
                            <div className="service-content" dangerouslySetInnerHTML={{
                        __html: data?.coquitlam?.mortgageBrokerBottomText,
                      }}
                    >
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                </Row>
                <Row className="apply-step">
                  <Col md={4}>
                    {data?.coquitlam?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.coquitlam?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.coquitlam?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.coquitlam?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.coquitlam?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.coquitlam?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.coquitlam?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.coquitlam?.mortgageBrokerTitle}
                    </h2>
                    <p>{data?.coquitlam?.mortgageBrokerDescription}</p>
                  </Col>
                </Row>
                {/* {data.coquitlam.mortgageRenovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.coquitlam.mortgageRenovation.map((tab, item) => {
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
                )} */}
                <Row className="my-5">
                    <Image
                      src={data?.coquitlam?.renovateImageSecond?.sourceUrl}
                      alt={data?.coquitlam?.renovateImageSecond?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Row>
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.coquitlam?.brokerCoquitlamTitle}</h2>
                    <p>{data?.coquitlam?.brokerCoquitlamDescription}</p>
                  </Col>
                </Row>
                {/* faq section start */}
                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.coquitlam?.faqAccordion.map((qa, index) => {
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
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.coquitlam?.contactTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.coquitlam?.contactDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                {/* faq section end */}
              </Container>
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default BcCoquitlam;
