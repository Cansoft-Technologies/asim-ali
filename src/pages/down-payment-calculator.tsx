import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

import MortgageAdvisor from "components/MortgageAdvisor";
import { apolloClient } from "lib/apollo";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DownPaymentCalculator from "components/DownPaymentCalculator";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 6672 }) {
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
              heroTitle
              heroDescription
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
              brokerImage {
                altText
                sourceUrl
              }

              brokerText
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
            menuItems(first: 150) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems (first: 150) {
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
  if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
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

const Page = (props: MyProps) => {
  const { settings, mainMenus, refinanceData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {refinanceData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData?.map((meta,index) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <meta name="robots" content="noindex"></meta>
                    <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
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
                  <p className="hero-title">
            {data?.Refinance?.bannerTitle?.split(" ")[0]}
            {data?.Refinance?.bannerTitle?.split(" ")[1] && data?.Refinance?.bannerTitle?.split(" ")[2] ? (
              <span>
                {data?.Refinance?.bannerTitle?.split(" ")[1]} {data?.Refinance?.bannerTitle?.split(" ")[2]}
              </span>
            ) : (
              <span>{data?.Refinance?.bannerTitle?.split(" ")[1]}</span>
            )}
            {/* <span>{title?.split(" ")[1]}</span> */}
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
                      
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                <Row className="my-5">
                  <Container>
                    <div className="my-5">
                      <MortgageAdvisor advisorData={data?.Refinance?.advisorData} />
                    </div>
                  </Container>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="service-title">
                      {data?.Refinance?.brokerTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Refinance?.brokerDescription,
                      }}
                      className="text-center"
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
                            __html: data?.Refinance?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={data?.Refinance?.productsImage?.sourceUrl}
                            alt={data?.Refinance?.productsImage?.altText}
                            width="390"
                            height="400"
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker">
                <Col>
                <p className="service-title">
                      Down Payment Calculator
                    </p>
                    <DownPaymentCalculator />
            </Col>
                </Row>
                <div className="service-row mt-5">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={12}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.Refinance?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Refinance?.bottomBrokerTitle}</h2>
                    <div
                              dangerouslySetInnerHTML={{
                                __html: data?.Refinance?.bottomBrokerDescription,
                              }}
                            ></div>
                  </Col>
                </Row>
                {/* faq section start */}

                <div className="faq-accordion">
                  <Accordion defaultActiveKey="0">
                    {data?.Refinance?.faqAccordion?.map((qa, index) => {
                      return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header as="p" className="service-title">
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
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Page;
