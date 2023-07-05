import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 425 }) {
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
            mortgagecalculator {
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
            <main className="content">
              {data?.mortgagecalculator?.calculatorBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.mortgagecalculator?.calculatorBannerTitle}
                  bgImage={
                    data?.mortgagecalculator?.calculatorBannerImage?.sourceUrl
                  }
                />
              )}

              <Container className="my-5">
                <Row className="mortgagecalculator-heading">
                  <h1>
                    {
                      data?.mortgagecalculator?.calculatorBannerTitle.split(
                        " "
                      )[0]
                    }{" "}
                    <span>
                      {
                        data?.mortgagecalculator?.calculatorBannerTitle.split(
                          " "
                        )[1]
                      }
                    </span>
                  </h1>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data?.mortgagecalculator?.calculatorPageContent,
                    }}
                  ></div>
                </Row>
              </Container>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Calculator;
