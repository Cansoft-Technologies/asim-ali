import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import FeaturedSection from "components/FeaturedSection";
import MortgageCalculator from "components/MortgageRatesCalculator";
import ServiceDividerSection from "components/ServiceDivider";
import ServiceSection from "components/ServiceSection";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 6924 }) {
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
            newMortgagecalculator {
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
              tipsLeftText
              tipsRightText
              tipsImageRight {
                altText
                sourceUrl
              }
              tipsImageLeft {
                altText
                sourceUrl
              }
              homeContactSection {
                title
                description
              }
              homebuyerSection {
                advisorTitle
                advisorCards{
                  title
                  description
                  image{
                    sourceUrl
                    altText
                  }
                }
              }
              calculatorBannerTitle
              calculatorPageContent
              calculatorBannerImage {
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
      calculatorData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  calculatorData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

export default function Page(props: MyProps){
  const { settings, mainMenus, calculatorData, metaData } = props;

  return (
    <>
      {calculatorData?.map((data, index) => {
        return (
          <div key={index} className="our-locations">
            <Head>
              {metaData?.map((meta,index) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link
                      rel="canonical"
                      href="https://asimali.ca/mortgage-calculator"
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
            <div>
              <main className="content">
                {data?.newMortgagecalculator?.calculatorBannerTitle == null ? (
                  ""
                ) : (
                  <Hero
                    title={data?.newMortgagecalculator?.calculatorBannerTitle}
                    bgImage={
                      data?.newMortgagecalculator?.calculatorBannerImage
                        ?.sourceUrl
                    }
                  />
                )}

                <Container className="my-5">
                  <Row className="mortgagecalculator-heading text-center my-5 service-title">
                    <p>
                      {
                        data?.newMortgagecalculator?.calculatorBannerTitle.split(
                          " "
                        )[0]
                      }{" "}
                      <span>
                        {
                          data?.newMortgagecalculator?.calculatorBannerTitle.split(
                            " "
                          )[1]
                        }
                      </span>
                    </p>
                  </Row>
                  <MortgageCalculator/>
                  <div className="tab-btn">
                    <Link href={"/apply-now"}>
                      <Button className="HeadBtn">
                        Apply <span>Now</span>
                      </Button>
                    </Link>
                  </div>
                </Container>
                <Container className="my-5">
                  <Row className="coquitlam-grid my-5">
                    <Col md={7}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.newMortgagecalculator?.aboutText,
                        }}
                      ></div>
                    </Col>
                    <Col md={5}>
                      <Image
                        src={data?.newMortgagecalculator?.aboutImage?.sourceUrl}
                        alt={data?.newMortgagecalculator?.aboutImage?.altText}
                        width="390"
                        height="400"
                        
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </Col>
                  </Row>
                </Container>
                <FeaturedSection
                  featuredData={data?.newMortgagecalculator?.homebuyerSection}
                />
                <section className="my-5">
                      <div className="service-row">
                        <Container>
                          <div className="service-image">
                                          <Image
                                            src={data?.newMortgagecalculator?.tipsImageRight?.sourceUrl}
                                            alt={data?.newMortgagecalculator?.tipsImageRight?.altText}
                                            width="390"
                                            height="400"
                                            style={{ width: "100%", objectFit: "contain", height: "45vh" }}
                                            quality={100}
                                          />
                                        </div>
                          <Row>
                            <Col className="service-texts hide-pc" lg={6}>
                              <div
                                className="service-content text-center"
                                dangerouslySetInnerHTML={{
                                  __html: data?.newMortgagecalculator?.tipsLeftText,
                                }}
                              ></div>
                            </Col>
                            <Col className="service-texts hide-sm" lg={6}>
                              <div
                                className="service-content"
                                dangerouslySetInnerHTML={{
                                  __html: data?.newMortgagecalculator?.tipsLeftText,
                                }}
                              ></div>
                            </Col>
                            <Col className="service-texts mb-5 hide-pc" lg={6}>
                              <div
                                className="service-content text-center"
                                dangerouslySetInnerHTML={{
                                  __html: data?.newMortgagecalculator?.tipsRightText,
                                }}
                              ></div>
                            </Col>
                            <Col className="service-texts my-5 hide-sm" lg={6}>
                              <div
                                className="service-content"
                                dangerouslySetInnerHTML={{
                                  __html: data?.newMortgagecalculator?.tipsRightText,
                                }}
                              ></div>
                            </Col>
                          </Row>
                          <div className="service-image">
                                          <Image
                                            src={data?.newMortgagecalculator?.tipsImageLeft?.sourceUrl}
                                            alt={data?.newMortgagecalculator?.tipsImageLeft?.altText}
                                            width="390"
                                            height="400"
                                            style={{ width: "100%", objectFit: "contain", height: "45vh" }}
                                            quality={100}
                                          />
                                        </div>
                        </Container>
                      </div>
                    </section>
                <Container className="mb-5">
                  <h2 className="text-center service-title">
                    {data?.newMortgagecalculator?.homeContactSection?.title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.newMortgagecalculator?.homeContactSection
                          ?.description,
                    }}
                    className="text-lg text-start"
                  ></div>
                </Container>
              </main>
            </div>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};
