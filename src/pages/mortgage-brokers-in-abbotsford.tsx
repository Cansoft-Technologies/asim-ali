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
import { advisorData } from "dummyData/dummy";
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
              faqImage {
                altText
                sourceUrl
              }
              renovateImageFirst {
                altText
                sourceUrl
              }
              renovateImageSecond {
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
                {data?.Abbotsford?.slider == null ? (
                  ""
                ) : (
                  <Row className="application-slider">
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >
                      {data?.Abbotsford?.slider.map((slide, a) => {
                        return (
                          <div
                            key={a}
                            className="application-slide text-center"
                          >
                            <h2>{slide?.title}</h2>
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
                      {data?.Abbotsford?.productsTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: `<span style="font-weight: 400;">As the leading</span><b> mortgage broker in abbotsford bc</b><span style="font-weight: 400;">, We offer a wide range of services to meet all of your mortgage needs. Whether you're a first-time homebuyer, looking to refinance, or seeking a commercial mortgage, we have the expertise and resources to help you secure the best home loan for your unique situation. Our team of experienced professionals is committed to providing personalized service and guidance throughout the entire process. With access to over 40 lenders, including </span><i><span style="font-weight: 400;">national mortgage abbotsford</span></i><span style="font-weight: 400;"> options, we can find the most competitive rates and terms for you. </span>`,
                      }}
                    ></div>
                  </Col>

                  <div className="service-row">
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
                              src={data?.Abbotsford?.productsImage?.sourceUrl}
                              alt={data?.Abbotsford?.productsImage?.altText}
                              width="390"
                              height="400"
                              style={{ width: "100%", objectFit: "contain" }}
                            />
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div className="service-row">
                    <Container>
                      <Row>
                        <Col className="service-texts" lg={6}>
                          <div className="service-image">
                            <Image
                              src={
                                data?.Abbotsford?.renovateImageSecond?.sourceUrl
                              }
                              alt={
                                data?.Abbotsford?.renovateImageSecond?.altText
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
                </Row>
                <Row className="apply-step">
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
                <Row className="my-5">
                  <Image
                    src={data?.Abbotsford?.renovateImageFirst?.sourceUrl}
                    alt={data?.Abbotsford?.renovateImageFirst?.altText}
                    width="390"
                    height="400"
                    priority={true}
                    style={{ width: "100%", objectFit: "contain" }}
                  />
                </Row>
                <Container>
                  <div className="my-5">
                    <MortgageAdvisor advisorData={advisorData} />
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
