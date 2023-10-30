import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import FeaturedSection from "components/FeaturedSection";
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
        pages(where: { id: 4096 }) {
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

const Calculator = (props: MyProps) => {
  const { settings, mainMenus, calculatorData, metaData } = props;

  return (
    <>
      {calculatorData?.map((data, index) => {
        return (
          <div key={index} className="our-locations">
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
            <div>
            <main className="content">
              {data?.newMortgagecalculator?.calculatorBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.newMortgagecalculator?.calculatorBannerTitle}
                  bgImage={
                    data?.newMortgagecalculator?.calculatorBannerImage?.sourceUrl
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
                     <div
                     className="mortgagecalculator-content my-5"
                      dangerouslySetInnerHTML={{
                        __html: data?.newMortgagecalculator?.calculatorPageContent,
                      }}
                    ></div>
                  <div className="tab-btn">
                  <Link
                            href={"/apply-now"}
                          >
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
                priority={true}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
              </Container>
                <FeaturedSection featuredData={data?.newMortgagecalculator?.homebuyerSection} />
        <ServiceSection
          textLeft={data?.newMortgagecalculator?.tipsLeftText}
          textRight={data?.newMortgagecalculator?.tipsRightText}
          imageLeft={data?.newMortgagecalculator?.tipsImageLeft}
          imageRight={data?.newMortgagecalculator?.tipsImageRight}
        />
        <Container className="mb-5">
          <h2 className="text-center service-title">{data?.newMortgagecalculator?.homeContactSection?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: data?.newMortgagecalculator?.homeContactSection?.description,
            }}
            className="text-lg text-start"
          ></div>
        </Container>
            </main>
            </div>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Calculator;
