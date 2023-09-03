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
        pages(where: { id: 1308 }) {
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
            commercialvancouver {
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
      commercialvancouverData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  commercialvancouverData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const CommercialVancouver = (props: MyProps) => {
  const { settings, mainMenus, commercialvancouverData, metaData } = props;
  const [key, setKey] = useState(null);
  return (
    <>
      {commercialvancouverData?.map((data, index) => {
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
              {data?.commercialvancouver?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.commercialvancouver?.serviceBannerTitle}
                  heading={data?.commercialvancouver?.serviceBannerHeading}
                  description={data?.commercialvancouver?.serviceBannerDescription}
                  bgImage={data?.commercialvancouver?.serviceBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.commercialvancouver?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.commercialvancouver?.aboutImage?.sourceUrl}
                      alt={data?.commercialvancouver?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor
                        advisorData={data?.commercialvancouver?.advisorData}
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
                      {data?.commercialvancouver?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.commercialvancouver?.productsDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                {data.commercialvancouver.renovation == null ? (
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
                      {data.commercialvancouver.renovation.map((tab, item) => {
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
                <Row
                  className="mortgage-broker text-center"
                  style={{ marginTop: "80px" }}
                >
                  <Col>
                    <h2 className="headering-title">
                      {data?.commercialvancouver?.brokerTitle}
                    </h2>
                    <p>{data?.commercialvancouver?.brokerDescription}</p>
                  </Col>
                </Row>
                <div className="service-row my-5">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={6}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.commercialvancouver?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.commercialvancouver?.productsImage?.sourceUrl}
                            alt={data?.commercialvancouver?.productsImage?.altText}
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
                            src={data?.commercialvancouver?.renovateImageFirst?.sourceUrl}
                            alt={data?.commercialvancouver?.renovateImageFirst?.altText}
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
                            __html: data?.commercialvancouver?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker-bottom text-center mt-5">
                  <Col>
                    <h2>{data?.commercialvancouver?.bottomBrokerTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.commercialvancouver?.bottomBrokerDescription,
                      }}
                    ></div>
                  </Col>
                </Row>
                {/* faq section start */}
                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.commercialvancouver?.faqAccordion?.map((qa, index) => {
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

export default CommercialVancouver;
