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
const advisorData = {
  advisorTitle: `<h2 style="font-weight: 400; margin-top: -80px;">Why Choose Us</h2>`,
  advisorDescriptionTop: `<p style="margin-top: 50px; margin-bottom: 100px">At Asim Ali, we understand that choosing a mortgage broker is an important decision. Few reasons why you should choose us for all your mortgage needs.</p>`,
  advisorDescriptionBottom:``,
  advisorImage:{
    sourceUrl: "http://asimaliprod.wpengine.com/wp-content/uploads/2023/08/mortgage-broker-in-langley.webp",
    altText: "mortgage broker surrey"
},
  advisorCards:[
    {
        title: "Experience",
        description: `<p>
        With years of experience in the mortgage industry, our team has the knowledge and expertise to guide you through the process. We understand the local market and can help you find the best mortgage rates in Langley.</p>`,
    },
    {
        title: "Personalized Service",
        description: `<p>We take the time to understand your unique needs and financial goals. Our personalized approach allows us to tailor mortgage solutions that are best for you. We believe in building long-term relationships with our clients, so you can trust us to have your best interests at heart.</p>`,
    },
    {
        title: "Access to Lenders",
        description: "<p>As a mortgage broker we have access to a wide range of lenders. This means we can shop around to find the best mortgage options for you. We do the legwork, so you don't have to.</p>",
    },
    {
        title: "Exceptional Customer Service",
        description: `<p>At Asim Ali, we pride ourselves on providing exceptional customer service. We are always available to answer your questions and address any concerns you may have. We are here to make the mortgage process as smooth and stress-free as possible.</p>`,
    },
    {
        title: "Comprehensive Solutions",
        description: `<p>Whether you're a first-time homebuyer or looking to refinance, we have the expertise to help. We offer a wide range of mortgage services, ensuring we can find the right solution for your unique needs.</p>
        <p>Choose Asim Ali as your mortgage broker and experience the difference of working with a trusted and reliable team. Let us take the stress out of mortgages and guide you towards homeownership. Contact us today to get started.</p>`,
    },
]
}

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
              mortgageProductsRightText
              mortgageProductsLeftText
              topLangleyDescription
              mortgageRenovation {
                title
                description
              }
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
              renovateImageSecond {
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
                  <Col className="px-4" md={12}>
                    <h2 className="text-center">
                      {data?.Langley?.mortgageProductsTitle}
                    </h2>
                    <p className="text-center">
                    As one of the best & trusted Mortgage Brokers in Coquitlam, We offer a wide range of services to meet your mortgage needs. We provide personalized solutions and tailored advice to ensure that you get the best mortgage rates and terms.
                    </p>
                  </Col>
                </Row>
                {data?.Langley?.langleySlider == null ? (
                  ""
                ) : (
                  <Row className="application-slider">
                    <Carousel
                      autoPlay={true}
                      infinite={true}
                      responsive={responsive}
                    >
                      {data?.Langley?.langleySlider.map((slide, a) => {
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
                <Row className="my-5">
                <Container>
                  <div className="my-5">
                    <MortgageAdvisor advisorData={advisorData} />
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
