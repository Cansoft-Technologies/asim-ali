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
        pages(where: { id: 2582 }) {
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
            aaaMortgage {
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
      aaaMortgageData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  aaaMortgageData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const AAAMortgage = (props: MyProps) => {
  const { settings, mainMenus, aaaMortgageData, metaData } = props;
  const [key, setKey] = useState(null);
  return (
    <>
      {aaaMortgageData?.map((data, index) => {
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
              {data?.aaaMortgage?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.aaaMortgage?.serviceBannerTitle}
                  heading={data?.aaaMortgage?.serviceBannerHeading}
                  description={data?.aaaMortgage?.serviceBannerDescription}
                  bgImage={data?.aaaMortgage?.serviceBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.aaaMortgage?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.aaaMortgage?.aboutImage?.sourceUrl}
                      alt={data?.aaaMortgage?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
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
                      {data?.aaaMortgage?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.aaaMortgage?.productsDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor
                        advisorData={data?.aaaMortgage?.advisorData}
                      />
                    </div>
                  </Container>
                </Row>
                <Row
                  className="mortgage-broker text-center"
                  style={{ marginTop: "80px" }}
                >
                  <Col>
                    <h2 className="headering-title">
                      {data?.aaaMortgage?.brokerTitle}
                    </h2>
                    <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.aaaMortgage?.brokerDescription,
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
                            __html: data?.aaaMortgage?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.aaaMortgage?.productsImage?.sourceUrl}
                            alt={data?.aaaMortgage?.productsImage?.altText}
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
                            src={data?.aaaMortgage?.renovateImageFirst?.sourceUrl}
                            alt={data?.aaaMortgage?.renovateImageFirst?.altText}
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
                            __html: data?.aaaMortgage?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker-bottom text-center mt-5">
                  <Col>
                    <h2>{data?.aaaMortgage?.bottomBrokerTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.aaaMortgage?.bottomBrokerDescription,
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

export default AAAMortgage;
