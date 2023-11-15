import { gql } from "@apollo/client";
import { CTA, Footer, Header, Hero } from "components";
import MortgageAdvisor from "components/MortgageAdvisor";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 2668 }) {
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
            CMortgageBC {
              serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
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
              aboutText
              aboutImage {
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
      CMortgageBCData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  CMortgageBCData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const CMortgageBC = (props: MyProps) => {
  const { settings, mainMenus, CMortgageBCData, metaData } = props;
  const [key, setKey] = useState(null);
  return (
    <>
      {CMortgageBCData?.map((data, index) => {
        return (
          <div key={index} className="our-services">
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
              {data?.CMortgageBC?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.CMortgageBC?.serviceBannerTitle}
                  heading={data?.CMortgageBC?.serviceBannerHeading}
                  description={data?.CMortgageBC?.serviceBannerDescription}
                  bgImage={data?.CMortgageBC?.serviceBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="coquitlam-grid my-5 d-flex justify-content-center align-items-center">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.CMortgageBC?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.CMortgageBC?.aboutImage?.sourceUrl}
                      alt={data?.CMortgageBC?.aboutImage?.altText}
                      width="390"
                      height="600"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
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
                      {data?.CMortgageBC?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.CMortgageBC?.productsDescription,
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
                            __html: data?.CMortgageBC?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.CMortgageBC?.productsImage?.sourceUrl}
                            alt={data?.CMortgageBC?.productsImage?.altText}
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
                            src={data?.CMortgageBC?.renovateImageFirst?.sourceUrl}
                            alt={data?.CMortgageBC?.renovateImageFirst?.altText}
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
                            __html: data?.CMortgageBC?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row
                  className="mortgage-broker text-center"
                  style={{ marginTop: "80px" }}
                >
                  <Col>
                    <h2 className="headering-title">
                      {data?.CMortgageBC?.brokerTitle}
                    </h2>
                    <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.CMortgageBC?.brokerDescription,
                          }}
                        ></div>
                  </Col>
                </Row>
                {data.CMortgageBC.renovation == null ? (
                  ""
                ) : (
                  <Row
                    className="renovation-tab-row"
                    style={{ marginTop: "80px" }}
                  >
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.CMortgageBC.renovation.map((tab, item) => {
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
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor
                        advisorData={data?.CMortgageBC?.advisorData}
                      />
                    </div>
                  </Container>
                </Row>
                <Row className="mortgage-broker-bottom text-center mt-5">
                  <Col>
                    <h2>{data?.CMortgageBC?.bottomBrokerTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.CMortgageBC?.bottomBrokerDescription,
                      }}
                    ></div>
                  </Col>
                </Row>
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

export default CMortgageBC;
