import { CTA, Footer, Header, Hero } from "components";
import Head from "next/head";
import { useState } from "react";

import { gql } from "@apollo/client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { apolloClient } from "lib/apollo";
import Link from "next/link";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
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
        pages(where: { id: 679 }) {
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
            Kelowna {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              mortgageProductsTitle
              mortgageProductsDescription
              mortgageProductsLeftText
              mortgageProductsRightText
              mortgageBrokerTitle
              mortgageBrokerDescription
              topKelownaDescription
              kelownaBannerTitle
              kelownaBannerHeading
              kelownaBannerDescription
              firstApplyStepTitle
              brokerCoquitlamTitle
              aboutKelownaText
              brokerCoquitlamDescription
              bottomBrokerTitle
              bottomBrokerDescription
              mortgageRenovation {
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
              mortgageProductsImage {
                altText
                sourceUrl
              }
              kelownaBannerImage {
                altText
                sourceUrl
              }
              aboutKelownaImage {
                altText
                sourceUrl
              }
              brokerKelownaImage {
                altText
                sourceUrl
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
      kelownaData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  kelownaData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Kelowna = (props: MyProps) => {
  const { settings, mainMenus, kelownaData, metaData } = props;
  const [key, setKey] = useState(null);

  return (
    <>
      {kelownaData?.map((data, index) => {
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
              {data?.Kelowna?.kelownaBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Kelowna?.kelownaBannerTitle}
                  heading={data?.Kelowna?.kelownaBannerHeading}
                  description={data?.Kelowna?.kelownaBannerDescription}
                  bgImage={data?.Kelowna?.kelownaBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Kelowna?.kelownaBannerTitle?.split(" ")[0]}{" "}
                      <span>
                        {data?.Kelowna?.kelownaBannerTitle?.split(" ")[1]}
                      </span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Kelowna?.topKelownaDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kelowna?.aboutKelownaText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Kelowna?.aboutKelownaImage?.sourceUrl}
                      alt={data?.Kelowna?.aboutKelownaImage?.altText}
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
                      <MortgageAdvisor advisorData={data?.Kelowna?.advisorData} />
                    </div>
                  </Container>
                </Row>
                <Row className="product-service">
                <Col className="px-5" md={1}></Col>
                  <Col className="mb-5 py-3"  md={10} style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {data?.Kelowna?.mortgageProductsTitle}
                    </h2>
                  <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kelowna?.mortgageProductsDescription,
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
                            __html: data?.Kelowna?.mortgageProductsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Kelowna?.mortgageProductsImage?.sourceUrl}
                            alt={data?.Kelowna?.mortgageProductsImage?.altText}
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
                            src={data?.Kelowna?.renovateImageFirst?.sourceUrl}
                            alt={data?.Kelowna?.renovateImageFirst?.altText}
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
                            __html: data?.Kelowna?.mortgageProductsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="apply-step" style={{marginTop: "80px"}}>
                  <Col md={4}>
                    {data?.Kelowna?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Kelowna?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kelowna?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Kelowna?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Kelowna?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Kelowna?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Kelowna?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Kelowna?.mortgageBrokerTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Kelowna?.mortgageBrokerDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                </Row>
                {data.Kelowna.mortgageRenovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data.Kelowna?.mortgageRenovation.map((tab, item) => {
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
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Kelowna?.brokerCoquitlamTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Kelowna?.brokerCoquitlamDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                {/* faq section start */}
                <Row className="my-5">
                    <Image
                      src={data?.Kelowna?.brokerKelownaImage?.sourceUrl}
                      alt={data?.Kelowna?.brokerKelownaImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Row>
                  <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Kelowna?.bottomBrokerTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Kelowna?.bottomBrokerDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Kelowna?.faqAccordion?.map((qa, index) => {
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

export default Kelowna;
