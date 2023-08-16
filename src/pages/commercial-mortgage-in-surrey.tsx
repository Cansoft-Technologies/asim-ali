import { gql } from "@apollo/client";
import { CTA, Footer, Header, Hero } from "components";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 1205 }) {
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
            surrey {
              serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
                altText
                sourceUrl
              }
              ourServices {
                serviceTitle
                serviceContent
                serviceImage {
                  altText
                  sourceUrl
                }
              }
              ourMortgageServicesTitle
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
      surreyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  surreyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const MortgageSurrey = (props: MyProps) => {
  const { settings, mainMenus, surreyData, metaData } = props;

  return (
    <>
      {surreyData?.map((data, index) => {
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
              {data?.surrey?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.surrey?.serviceBannerTitle}
                  heading={data?.surrey?.serviceBannerHeading}
                  description={data?.surrey?.serviceBannerDescription}
                  bgImage={data?.surrey?.serviceBannerImage?.sourceUrl}
                />
              )}

              <div className="service-container">
                <h1 className="text-center mt-5">
                  {data?.surrey?.ourMortgageServicesTitle}
                </h1>

                {data?.surrey?.ourServices.map((service, key) => {
                  return (
                    <div className="service-row" id={key} key={key}>
                      <Container>
                        <Row>
                          <Col className="service-texts" lg={6}>
                            <div className="service-image">
                              <Image
                                src={service?.serviceImage?.sourceUrl}
                                alt={service?.serviceImage?.altText}
                                width="390"
                                height="400"
                                priority={true}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            </div>
                          </Col>
                          <Col className="service-texts" lg={6}>
                            <div className="service-content">
                              <div
                                className="mt-4"
                                dangerouslySetInnerHTML={{
                                  __html: service?.serviceTitle,
                                }}
                              ></div>
                              {console.log(service.serviceContent)}
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: service.serviceContent,
                                }}
                              ></p>
                            </div>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  );
                })}
              </div>
              <CTA />
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default MortgageSurrey;
