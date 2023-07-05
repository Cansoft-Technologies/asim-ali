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
        pages(where: { id: 745 }) {
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
            Delta {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              productsTitle
              productsRightText
              productsLeftText
              firstApplyStepTitle
              brokerTitle
              title
              description
              brokerDescription
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
              renovation {
                title
                description
              }
              slider {
                title
                content
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
      deltaData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  deltaData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Delta = (props: MyProps) => {
  const { settings, mainMenus, deltaData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {deltaData.map((data, index) => {
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
              {data?.Delta?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Delta?.bannerTitle}
                  heading={data?.Delta?.bannerHeading}
                  description={data?.Delta?.bannerDescription}
                  bgImage={data?.Delta?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Delta?.bannerTitle?.split(" ")[0]}{" "}
                      <span>{data?.Delta?.bannerTitle?.split(" ")[1]}</span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Delta?.topDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Delta?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Delta?.aboutImage?.sourceUrl}
                      alt={data?.Delta?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                {data?.Delta?.slider == null ? (
                  ""
                ) : (
                  <Row className="application-slider">
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >
                      {data?.Delta?.slider.map((slide: any, a: any) => {
                        return (
                          <div
                            key={slide?.title}
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
                      {data?.Delta?.productsTitle}
                    </h2>
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Delta?.productsLeftText,
                      }}
                    ></span>
                  </Col>
                  <Col md={6}>
                    <Image
                      src={data?.Delta?.productsImage?.sourceUrl}
                      alt={data?.Delta?.productsImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                  <Col md={3}>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: data?.Delta?.productsRightText,
                      }}
                    ></span>
                  </Col>
                </Row>
                <Row className="apply-step">
                  <Col md={4}>
                    {data?.Delta?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Delta?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Delta?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Delta?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Delta?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Delta?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Delta?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Delta?.brokerTitle}
                    </h2>
                    <p>{data?.Delta?.description}</p>
                  </Col>
                </Row>
                {data.Delta.renovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.Delta.renovation.map((tab, item) => {
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
                <Row className="broker-coquitlam">
                  <Col>
                    <h2>{data?.Delta?.title}</h2>
                    <p>{data?.Delta?.description}</p>
                    {data?.Delta?.brokerLink == null ? (
                      ""
                    ) : (
                      <Link href={data?.Delta?.brokerLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}
                  </Col>
                </Row>
                {/* faq section start */}

                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Delta?.faqAccordion.map((qa, index) => {
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
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Delta;
