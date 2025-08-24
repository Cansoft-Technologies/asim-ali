import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Accordion, Col, Container, Row } from "react-bootstrap";

import { Button } from "components/ui/button";
import MortgageAdvisor from "components/MortgageAdvisor";
import { apolloClient } from "lib/apollo";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ScheduleMeetingSection from "components/homepage/schedule-meeting-section";
const locations = [
  {
    name: "Abbotsford",
    top: 75,
    left: 25,
    url: "/mortgage-broker-in-abbotsford",
  },
  {
    name: "Aberdeen",
    top: 40,
    left: 30,
    url: "/mortgage-broker-in-aberdeen",
  },
  {
    name: "Aldergrove East",
    top: 78,
    left: 28,
    url: "/aldergrove-east-mortgage-broker",
  },
  { name: "Burnaby", top: 65, left: 20, url: "/mortgage-broker-in-burnaby" },
  {
    name: "Campbell River",
    top: 30,
    left: 15,
    url: "/mortgage-broker-in-campbell-river",
  },
  {
    name: "Chilliwack",
    top: 72,
    left: 35,
    url: "/trusted-mortgage-broker-in-chilliwack",
  },
  {
    name: "Coquitlam",
    top: 62,
    left: 22,
    url: "/mortgage-broker-in-coquitlam",
  },
  { name: "Delta", top: 70, left: 18, url: "/mortgage-brokers-in-delta" },
  { name: "Hope", top: 68, left: 45, url: "/hope-mortgage-broker" },
  {
    name: "Kamloops",
    top: 45,
    left: 50,
    url: "/mortgage-brokers-in-kamloops",
  },
  { name: "Kelowna", top: 55, left: 60, url: "/mortgage-brokers-in-kelowna" },
  { name: "Langley", top: 75, left: 22, url: "/langley-mortgage-broker" },
  { name: "Nanaimo", top: 45, left: 10, url: "/mortgage-broker-in-nanaimo" },
  {
    name: "Prince George",
    top: 15,
    left: 55,
    url: "/mortgage-brokers-in-prince-george",
  },
  {
    name: "White Rock",
    top: 80,
    left: 20,
    url: "/mortgage-broker-in-white-rock",
  },
  {
    name: "Vancouver",
    top: 65,
    left: 15,
    url: "/mortgage-broker-in-vancouver",
  },
];

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 1955 }) {
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
            PrivateRefinance {
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
                childItems(first: 150) {
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
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      privatePrivateRefinanceData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  privatePrivateRefinanceData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const PrivateRefinance = (props: MyProps) => {
  const { settings, mainMenus, privatePrivateRefinanceData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {privatePrivateRefinanceData.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link
                      rel="canonical"
                      href={
                        meta?.seo?.canonicalUrl?.endsWith("/")
                          ? meta?.seo?.canonicalUrl?.slice(0, -1)
                          : meta?.seo?.canonicalUrl
                      }
                    />
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
            <Header settings={settings} menuData={mainMenus} />

            <main className="content">
              {data?.PrivateRefinance?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.PrivateRefinance?.bannerTitle}
                  heading={data?.PrivateRefinance?.bannerHeading}
                  description={data?.PrivateRefinance?.bannerDescription}
                  bgImage={data?.PrivateRefinance?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Row className="refinance-text my-5">
                  <Col md={5}>
                    <p>
                      {data?.PrivateRefinance?.bannerTitle?.split(" ")[0]}{" "}
                      <span>
                        {data?.PrivateRefinance?.bannerTitle?.split(" ")[1]}
                      </span>
                    </p>
                  </Col>
                  <Col md={7}>
                    <span>{data?.PrivateRefinance?.heroDescription}</span>
                  </Col>
                </Row>
                <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.PrivateRefinance?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={4}>
                    <Image
                      src={data?.PrivateRefinance?.aboutImage?.sourceUrl}
                      alt={data?.PrivateRefinance?.aboutImage?.altText}
                      width="390"
                      height="400"
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                <Row className="product-service">
                  <Col className="px-5" md={1}></Col>
                  <Col md={10}>
                    <h2 className="text-center mt-5">
                      {data?.PrivateRefinance?.productsTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.PrivateRefinance?.productsDescription,
                      }}
                      className="text-center my-4"
                    ></div>
                  </Col>
                  <Col className="px-5" md={1}></Col>
                </Row>

                <Row className="mortgage-broker">
                  <Col>
                    <h2 className="headering-title">
                      {data?.PrivateRefinance?.brokerTitle}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: data?.PrivateRefinance?.brokerDescription,
                      }}
                      className="text-center"
                    ></div>
                  </Col>
                </Row>
                <div className="service-row">
                  <Container>
                    <Row>
                      <Col className="service-texts" lg={6}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.PrivateRefinance?.productsLeftText,
                          }}
                        ></div>
                      </Col>
                      <Col className="service-texts" lg={6}>
                        <div className="service-image">
                          <Image
                            src={
                              data?.PrivateRefinance?.productsImage?.sourceUrl
                            }
                            alt={data?.PrivateRefinance?.productsImage?.altText}
                            width="390"
                            height="400"
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <Container>
                    <Row className="justify-content-center text-left mt-5">
                      <Col className="service-texts" lg={10}>
                        <div
                          className="service-content"
                          dangerouslySetInnerHTML={{
                            __html: data?.PrivateRefinance?.productsRightText,
                          }}
                        ></div>
                      </Col>
                    </Row>
                  </Container>
                </div>
                <Container>
                  <Row className="justify-content-center text-left my-5">
                    <Col className="service-texts" lg={10}>
                      <div
                        className="service-content"
                        dangerouslySetInnerHTML={{
                          __html:
                            data?.PrivateRefinance?.bottomBrokerDescription,
                        }}
                      ></div>
                    </Col>
                  </Row>
                </Container>

                {/* faq section start */}

                <div className="faq-accordion text-center">
                  <h2>Frequently Asked Questions</h2>
                  <p>
                    It’s normal to have questions. Here are answers to some
                    common questions we hear from clients:
                  </p>
                  <Accordion defaultActiveKey="0">
                    {data?.PrivateRefinance?.faqAccordion?.map((qa, index) => {
                      return (
                        <Accordion.Item key={index} eventKey={index.toString()}>
                          <Accordion.Header as="p">
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="flex flex-col justify-center items-start border-1 border-black mt-12">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5220.829340331075!2d-122.843247!3d49.1357508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1749630202672!5m2!1sen!2sbd"
                      title="Asim Ali"
                      width="100%"
                      height="450"
                      style={{ border: "0" }}
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                  <div className="flex flex-col justify-center items-start mt-12">
                    <div className="mt-12">
                      <p className="text-xl md:text-2xl xl:text-4xl font-bold mb-4 font-oswald">
                        Visit Our Office
                      </p>
                      <p
                        className="text-gray-600 mb-6"
                        dangerouslySetInnerHTML={{
                          __html: `Connect with the best mortgage broker in Surrey. Get expert
                advice, competitive rates, and customized solutions. Contact us
                now.`,
                        }}
                      ></p>

                      <div className="flex flex-wrap gap-2">
                        {locations.map((location) => (
                          <Link href={location?.url} key={location?.name}>
                            <Button
                              variant="outline"
                              className="border-gray-300 hover:bg-[#0a1e3b] hover:text-white text-[#0a1e3b] py-2 px-4 rounded-none"
                            >
                              {location?.name}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>
            </main>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default PrivateRefinance;
