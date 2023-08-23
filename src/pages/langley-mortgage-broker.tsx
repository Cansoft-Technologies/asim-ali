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
        pages(where: { id: 713 }) {
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
            Langley {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              mortgageProductsTitle
              mortgageProductsDescription
              mortgageProductsRightText
              mortgageProductsLeftText
              topLangleyDescription
              mortgageBrokerTitle
              mortgageBrokerDescription
              langleyBannerTitle
              langleySlider {
                title
                content
              }
              langleyBannerHeading
              langleyBannerDescription
              firstApplyStepTitle
              brokerLangleyTitle
              brokerLangleyDescription
              aboutLangleyText
              brokerLangleyLink {
                url
                title
              }
              langleyBannerImage {
                altText
                sourceUrl
              }
              aboutLangleyImage {
                altText
                sourceUrl
              }
              mortgageProductsImage {
                altText
                sourceUrl
              }
              faqImage {
                altText
                sourceUrl
              }
              renovateImageFirst {
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
      langleyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  langleyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Langley = (props: MyProps) => {
  const { settings, mainMenus, langleyData, metaData } = props;

  const [key, setKey] = useState(null);
console.log(langleyData);
  return (
    <>
      {langleyData?.map((data, index) => {
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
              {data?.Langley?.langleyBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Langley?.langleyBannerTitle}
                  heading={data?.Langley?.langleyBannerHeading}
                  description={data?.Langley?.langleyBannerDescription}
                  bgImage={data?.Langley?.langleyBannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Langley?.langleyBannerTitle?.split(" ")[0]}{" "}
                      <span>
                        {data?.Langley?.langleyBannerTitle?.split(" ")[1]}
                      </span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Langley?.topLangleyDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Langley?.aboutLangleyText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Langley?.aboutLangleyImage?.sourceUrl}
                      alt={data?.Langley?.aboutLangleyImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Col>
                </Row>
                <Row className="product-service">
                <Col className="px-5" md={1}></Col>
                  <Col md={10}>
                    <h2 className="text-center">
                      {data?.Langley?.mortgageProductsTitle}
                    </h2>
                    <p className="text-center">
                    {data?.Langley?.mortgageProductsDescription}
                    </p>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>
                {data?.Langley?.langleySlider == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {data?.Langley?.langleySlider.map((slide, a) => {
                        return (
                          <Tab
                            key={a}
                            eventKey={a.toString()}
                            title={
                              <p className="location-tab-title">
                                {slide?.title}
                              </p>
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
                <Row className="my-5">
                <Container>
                  <div className="my-5">
                    <MortgageAdvisor advisorData={data?.Langley?.advisorData} />
                  </div>
                </Container>
                </Row>
                <Row className="apply-step">
                  <Col md={4}>
                    {data?.Langley?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Langley?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Langley?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Langley?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Langley?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Langley?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Langley?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Langley?.mortgageBrokerTitle}
                    </h2>
                    <p>{data?.Langley?.mortgageBrokerDescription}</p>
                  </Col>
                </Row>
                <div className="service-row my-5">
                    <Container>
                      <Row>
                        <Col className="service-texts" lg={6}>
                          <div
                            className="service-content"
                            dangerouslySetInnerHTML={{
                              __html: data?.Langley?.mortgageProductsLeftText,
                            }}
                          ></div>
                        </Col>
                        <Col className="service-texts" lg={6}>
                          <div className="service-image">
                            <Image
                              src={data?.Langley?.mortgageProductsImage?.sourceUrl}
                              alt={data?.Langley?.mortgageProductsImage?.altText}
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
                              src={data?.Langley?.renovateImageFirst?.sourceUrl}
                              alt={data?.Langley?.renovateImageFirst?.altText}
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
                              __html: data?.Langley?.mortgageProductsRightText,
                            }}
                          ></div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Langley?.brokerLangleyTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Langley?.brokerLangleyDescription,
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

export default Langley;
