import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import React, { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Link from "next/link";

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
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
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
              contactField
              heroTitle
              heroDescription
              productsTitle
              productsDescription
              productsRightText
              productsLeftText
              brokerSection
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
              productsImage {
                altText
                sourceUrl
              }
              renovation {
                title
                description
              }
              slider {
                title
                content
              }
              faqAccordion {
                answer
                question
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

  const myLoader = ({ src, width, quality }) => {
    return `${src}?w=${width}&q=${quality || 75}`;
  };

  return (
    <>
      {refinanceData?.map((data, index) => {
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
                      {data?.Refinance?.heroTitle?.split(" ")[0]}{" "}
                      <span>{data?.Refinance?.heroTitle?.split(" ")[1]}</span>
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
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                {data?.Refinance?.slider == null ? (
                  ""
                ) : (
                  <Row className="application-slider">
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >
                      {data?.Refinance?.slider.map((slide, a) => {
                        return (
                          <div
                            key={a}
                            className="application-slide text-center"
                          >
                            <span>{slide?.title}</span>
                            <p>{slide?.content}</p>
                          </div>
                        );
                      })}
                    </Carousel>
                  </Row>
                )}

                <Row className="product-service">
                  <Col className="mb-5" md={12}>
                    <h2 className="text-center">
                      {data?.Refinance?.productsTitle}
                    </h2>
                    <p className="text-center">
                      {data?.Refinance?.productsDescription}
                    </p>
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.productsLeftText,
                      }}
                    ></span>
                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.Refinance?.productsImage?.sourceUrl}
                      alt={data?.Refinance?.productsImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.productsRightText,
                      }}
                    ></span>
                  </Col>
                </Row>

                <Row className="mortgage-broker">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.Refinance?.brokerSection,
                    }}
                  ></div>
                </Row>
                {data.Refinance.renovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.Refinance.renovation.map((tab, item) => {
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

                {/* faq section start */}

                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Refinance?.faqAccordion.map((qa, index) => {
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

                <Row className="mortgage-broker">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.Refinance?.contactField,
                    }}
                  ></div>
                </Row>
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