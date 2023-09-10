import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

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
  const client = new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
      query {
        pages(where: { id: 876 }) {
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
            Vancouver {
              thirdApplyStepTitle
              secondApplyStepTitle
              firstApplyStepTitle
              secondApplyStepDescription
              bannerTitle
              bannerHeading
              bannerDescription
              topDescription
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
      vancouverData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  vancouverData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Vancouver = (props: MyProps) => {
  const { settings, mainMenus, vancouverData, metaData } = props;
  const [key, setKey] = useState(null);

  return (
    <>
      {vancouverData?.map((data, index) => {
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
              {data?.Vancouver?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Vancouver?.bannerTitle}
                  heading={data?.Vancouver?.bannerHeading}
                  description={data?.Vancouver?.bannerDescription}
                  bgImage={data?.Vancouver?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Vancouver?.bannerTitle?.split(" ")[0]}{" "}
                      <span>{data?.Vancouver?.bannerTitle?.split(" ")[1]}</span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Vancouver?.topDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Vancouver?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Vancouver?.aboutImage?.sourceUrl}
                      alt={data?.Vancouver?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                <Row className="product-service">
                  <Col className="px-5" md={1}></Col>
                  <Col className="py-3" md={10} style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {data?.Vancouver?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Vancouver?.productsDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                <div className="service-row my-5">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={6}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.Vancouver?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Vancouver?.productsImage?.sourceUrl}
                            alt={data?.Vancouver?.productsImage?.altText}
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
                            src={data?.Vancouver?.renovateImageFirst?.sourceUrl}
                            alt={data?.Vancouver?.renovateImageFirst?.altText}
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
                            __html: data?.Vancouver?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Vancouver?.brokerTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Vancouver?.brokerDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                </Row>
                {data.Vancouver.renovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data?.Vancouver?.renovation?.map((tab, item) => {
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
                <Row className="apply-step" style={{ marginTop: "80px" }}>
                  <Col md={4}>
                    {data?.Vancouver?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Vancouver?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Vancouver?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Vancouver?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Vancouver?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Vancouver?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Vancouver?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor advisorData={data?.Vancouver?.advisorData} />
                    </div>
                  </Container>
                </Row>
                  <Row className="mortgage-broker-bottom text-center mt-5">
                  <Col>
                    <h2>{data?.Vancouver?.bottomBrokerTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Vancouver?.bottomBrokerDescription,
                              }}
                            ></div>
                    {/* {data?.Vancouver?.brokerLink == null ? (
                      ""
                    ) : (
                      <Link href={data?.Vancouver?.brokerLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )} */}
                  </Col>
                </Row>
                {/* faq section start */}

                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Vancouver?.faqAccordion?.map((qa, index) => {
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

export default Vancouver;
