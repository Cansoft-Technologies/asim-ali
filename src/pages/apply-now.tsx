import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import ApplySection from "components/ApplySection";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 2222 }) {
          nodes {
            ApplyNow {
              bannerTitle
              bannerBackgroundImage {
                altText
                sourceUrl
              }
              formBackgroundImage {
                altText
                sourceUrl
              }
              applyStepHeading
              applyStepSection{
                firstStepTitle
                firstStepDescription
                secondStepTitle
                secondStepDescription
                thirdStepTitle
                thirdStepDescription
              }
              applyNowContent
            }
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
      howApplyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  howApplyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

function ApplyNow(props: MyProps) {
  const { settings, mainMenus, howApplyData, metaData } = props;
  console.log(howApplyData);
  const form = useRef();
  const [success, setSuccess] = useState(null);

  return (
    <>
      {howApplyData?.map((data, index) => {
        return (
          <div key={index}>
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
            <main className="content">
              <Header settings={settings} mainMenus={mainMenus} usingFor='apply-now'/>
              <Hero
                title={data?.ApplyNow?.bannerTitle}
                bgImage={data?.ApplyNow?.bannerBackgroundImage?.sourceUrl}
              />
              <Container>
              <div className="text-center my-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.ApplyNow?.applyNowContent,
                  }}
                ></div>
              </div>
              </Container>

              <div
                style={{
                  backgroundImage: `url("${data?.ApplyNow?.formBackgroundImage?.sourceUrl}")`,
                }}
                className="howto-application"
              >
                <div className="overlay"></div>
                <Container className="py-1">
                  <Row>
                    <Col md={12}>
                      <ApplySection/>
                    </Col>
                    <Col md={6}></Col>
                  </Row>
                </Container>
              </div>
              <Container className="apply-now">
                <div className="text-center mt-5 mb-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.ApplyNow?.applyStepHeading,
                  }}
                ></div>
              </div>
                  <div className="mt-5">
                  <Row className="apply-step">
                  <Col md={4}>
                    {data?.ApplyNow?.applyStepSection?.firstStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>01</span>
                        <p>{data?.ApplyNow?.applyStepSection?.firstStepTitle}</p>
                        <p className="desc">{data?.ApplyNow?.applyStepSection?.firstStepDescription}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.ApplyNow?.applyStepSection?.secondStepTitle == null ? (
                      ""
                    ) : (
                      <div className="approved">
                        <span>02</span>
                        <p className="title">
                          {data?.ApplyNow?.applyStepSection?.secondStepTitle}
                        </p>
                        <p>{data?.ApplyNow?.applyStepSection?.secondStepDescription}</p>
                      </div>
                    )}
                  </Col>
                  <Col md={4}>
                    {data?.ApplyNow?.applyStepSection?.thirdStepTitle == null ? (
                      ""
                    ) : (
                      <div className="apply">
                        <span>03</span>
                        <p>{data?.ApplyNow?.applyStepSection?.thirdStepTitle}</p>
                        <p className="desc">{data?.ApplyNow?.applyStepSection?.thirdStepDescription}</p>
                        <div className="apply-border"></div>
                      </div>
                    )}
                  </Col>
                </Row>
                  </div>
                </Container>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
}

export default ApplyNow;
