import { gql } from "@apollo/client";
import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { apolloClient } from "lib/apollo";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import MortgageAdvisor from "components/MortgageAdvisor";

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
        pages(where: { id: 810 }) {
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
            Kamloops {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              productsTitle
              productsDescription
              productsRightText
              productsLeftText
              firstApplyStepTitle
              brokerTitle
              topBrokerDescription
              bottomBrokerTitle
              bottomBrokerDescription
              topDescription
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
              brokerLink {
                url
                title
              }
              productsImage {
                altText
                sourceUrl
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
              tabs {
                title
                content
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
      kamloopsData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  kamloopsData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Kamloops = (props: MyProps) => {
  const { settings, mainMenus, kamloopsData, metaData } = props;
  const [key, setKey] = useState(null);

  return (
    <>
      {kamloopsData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData.map((meta) => {
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
              {data?.Kamloops?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Kamloops?.bannerTitle}
                  heading={data?.Kamloops?.bannerHeading}
                  description={data?.Kamloops?.bannerDescription}
                  bgImage={data?.Kamloops?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Kamloops?.bannerTitle?.split(" ")[0]}{" "}
                      <span>{data?.Kamloops?.bannerTitle?.split(" ")[1]}</span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Kamloops?.topDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kamloops?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Kamloops?.aboutImage?.sourceUrl}
                      alt={data?.Kamloops?.aboutImage?.altText}
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
                      <MortgageAdvisor
                        advisorData={data?.Kamloops?.advisorData}
                      />
                    </div>
                  </Container>
                </Row>
                <Row className="product-service">
                  <Col className="px-5" md={1}></Col>
                  <Col
                    className="py-3"
                    md={10}
                    style={{
                      border: "1px solid #f0b254",
                      borderRadius: "10px",
                    }}
                  >
                    <h2 className="text-center">
                      {data?.Kamloops?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kamloops?.productsDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                {data?.Kamloops?.tabs == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data?.Kamloops?.tabs?.map((slide, a) => {
                        return (
                          <Tab
                            key={a}
                            eventKey={a.toString()}
                            title={
                              <h3 className="location-tab-title">
                                {slide?.title}
                              </h3>
                            }
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: slide?.content,
                              }}
                              className="renovation-content-list"
                            ></div>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </Row>
                )}
                <Row className="apply-step" style={{ marginTop: "80px" }}>
                  <Col md={4}>
                    {data?.Kamloops?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Kamloops?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kamloops?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Kamloops?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Kamloops?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kamloops?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Kamloops?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Kamloops?.brokerTitle}
                    </h2>
                    <div
                      className="service-content"
                      dangerouslySetInnerHTML={{
                        __html: data?.Kamloops?.topBrokerDescription,
                      }}
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
                            __html: data?.Kamloops?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Kamloops?.productsImage?.sourceUrl}
                            alt={data?.Kamloops?.productsImage?.altText}
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
                            src={data?.Kamloops?.renovateImageFirst?.sourceUrl}
                            alt={data?.Kamloops?.renovateImageFirst?.altText}
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
                            __html: data?.Kamloops?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Kamloops?.bottomBrokerTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kamloops?.bottomBrokerDescription,
                      }}
                    ></div>
                    {data?.Kamloops?.brokerLink == null ? (
                      ""
                    ) : (
                      <Link href={data?.Kamloops?.brokerLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}
                  </Col>
                </Row>
                {/* faq section start */}
                {data?.Kamloops?.faqAccordion == null ? (
                  ""
                ) : (
                  <Container>
                    {/* <Row className="my-5">
                    <Image
                      src={data?.Kamloops?.faqImage?.sourceUrl}
                      alt={data?.Kamloops?.faqImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Row> */}
                    <div className="faq-accordion mt-5">
                      <Accordion defaultActiveKey="0">
                        {data?.Kamloops?.faqAccordion.map((qa, index) => {
                          return (
                            <Accordion.Item
                              key={index}
                              eventKey={index.toString()}
                            >
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
                  </Container>
                )}

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

export default Kamloops;
