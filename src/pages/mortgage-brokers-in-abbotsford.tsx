import { gql } from "@apollo/client";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CTA, Footer, Header, Hero } from "components";
import MortgageAdvisor from "components/MortgageAdvisor";
import { advisorData } from "dummyData/dummy";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Accordion, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";


export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 778 }) {
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
            Abbotsford {
              thirdApplyStepTitle
              secondApplyStepTitle
              secondApplyStepDescription
              productsTitle
              productsDescription
              productsRightText
              productsLeftText
              firstApplyStepTitle
              brokerTitle
              brokerDescription
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
              productsImageRight {
                altText
                sourceUrl
              }
              productsImageLeft {
                altText
                sourceUrl
              }
              advisorData {
                advisorCards {
                  title
                  description
                }
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
      abbotsfordData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  abbotsfordData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Abbotsford = (props: MyProps) => {
  const { settings, mainMenus, abbotsfordData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {abbotsfordData?.map((data, index) => {
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
                    <meta name="robots" content="noindex" />
                  </>
                );
              })}
            </Head>
            <Header settings={settings} mainMenus={mainMenus} />

            <main className="content">
              {data?.Abbotsford?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.Abbotsford?.bannerTitle}
                  heading={data?.Abbotsford?.bannerHeading}
                  description={data?.Abbotsford?.bannerDescription}
                  bgImage={data?.Abbotsford?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.Abbotsford?.bannerTitle?.split(" ")[0]}{" "}
                      <span>
                        {data?.Abbotsford?.bannerTitle?.split(" ")[1]}
                      </span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.Abbotsford?.topDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Abbotsford?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={data?.Abbotsford?.aboutImage?.sourceUrl}
                      alt={data?.Abbotsford?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                {data?.Abbotsford?.tabs == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-5 renovation"
                    >
                      {data?.Abbotsford?.tabs?.map((slide, a) => {
                        return (
                          <Tab
                            key={a}
                            eventKey={a.toString()}
                            title={
                              <h2 className="location-tab-title">
                                {slide?.title}
                              </h2>
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

                <Row className="product-service mt-5">
                <Col className="px-5" md={1}></Col>
                  <Col className="px-5 py-5" md={10} style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {data?.Abbotsford?.productsTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: data?.Abbotsford?.productsDescription,
                      }}
                    ></div>
                  </Col>
                  <Col className="px-5" md={8}></Col>
                </Row>
                <div className="service-row my-5">
                    <Container>
                      <Row>
                        <Col className="service-texts" lg={6}>
                          <div
                            className="service-content"
                            dangerouslySetInnerHTML={{
                              __html: data?.Abbotsford?.productsLeftText,
                            }}
                          ></div>
                        </Col>
                        <Col className="service-texts" lg={6}>
                          <div className="service-image">
                            <Image
                              src={data?.Abbotsford?.productsImageRight?.sourceUrl}
                              alt={data?.Abbotsford?.productsImageRight?.altText}
                              width="390"
                              height="400"
                              style={{ width: "100%", objectFit: "contain" }}
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
                              src={
                                data?.Abbotsford?.productsImageLeft?.sourceUrl
                              }
                              alt={
                                data?.Abbotsford?.productsImageLeft?.altText
                              }
                              width="390"
                              height="400"
                              style={{ width: "100%", objectFit: "contain" }}
                            />
                          </div>
                        </Col>
                        <Col className="service-texts" lg={6}>
                          <div
                            className="service-content"
                            dangerouslySetInnerHTML={{
                              __html: data?.Abbotsford?.productsRightText,
                            }}
                          ></div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                <Row className="apply-step" style={{marginTop: "80px"}}>
                  <Col md={4}>
                    {data?.Abbotsford?.firstApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.Abbotsford?.firstApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Abbotsford?.secondApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p>
                          <span>{data?.Abbotsford?.secondApplyStepTitle}</span>
                        </p>
                        <p>{data?.Abbotsford?.secondApplyStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.Abbotsford?.thirdApplyStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.Abbotsford?.thirdApplyStepTitle}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.Abbotsford?.brokerTitle}
                    </h2>
                    <p>{data?.Abbotsford?.brokerDescription}</p>
                  </Col>
                </Row>
                <Row className="">
                  <Image
                    src={data?.Abbotsford?.renovateImageFirst?.sourceUrl}
                    alt={data?.Abbotsford?.renovateImageFirst?.altText}
                    width="390"
                    height="400"
                    priority={true}
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                </Row>
                <Container style={{marginTop: "60px"}}>
                  <div >
                    <MortgageAdvisor advisorData={data?.Abbotsford?.advisorData} />
                  </div>
                </Container>
                <Row className="mortgage-broker-bottom text-center">
                  <Col>
                    <h2>{data?.Abbotsford?.bottomBrokerTitle}</h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.Abbotsford?.bottomBrokerDescription,
                      }}
                    ></div>
                    {data?.Abbotsford?.brokerLink == null ? (
                      ""
                    ) : (
                      <Link href={data?.Abbotsford?.brokerLink?.url}>
                        <span>
                          Read More <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </Link>
                    )}
                  </Col>
                </Row>
                {data?.Abbotsford?.faqAccordion == null ? (
                  "") : (
                    <Container>
                      {/* <Row className="my-5">
                    <Image
                      src={data?.Abbotsford?.faqImage?.sourceUrl}
                      alt={data?.Abbotsford?.faqImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "contain" }}
                    />
                  </Row> */}
                <div className="faq-accordion mt-5">
                  <Accordion defaultActiveKey="0">
                    {data?.Abbotsford?.faqAccordion.map((qa, index) => {
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
                    </Container>
                  )}
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

export default Abbotsford;
