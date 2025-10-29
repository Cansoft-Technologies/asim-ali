import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

import { apolloClient } from "lib/apollo";
import { FaLinkedin } from "react-icons/fa";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 7514 }) {
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
            authorInfo {
              heroDescription
              bannerTitle
              heroTitle
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
              linkedinProfile
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
      authorData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  authorData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, authorData, metaData } = props;

  const [key, setKey] = useState(null);

  return (
    <>
      {authorData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData?.map((meta, index) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <meta name="robots" content="noindex"></meta>
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
              {data?.authorInfo?.bannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={data?.authorInfo?.bannerTitle}
                  heading={data?.authorInfo?.bannerHeading}
                  description={data?.authorInfo?.bannerDescription}
                  bgImage={data?.authorInfo?.bannerImage?.sourceUrl}
                />
              )}

              <Container className="my-5">
                <Card className="blog-author-card">
                  <Row className="g-4">
                    {/* Author Image Column */}
                    <Col
                      md={3}
                      className="d-flex align-items-center justify-content-center gap-3"
                    >
                      <Image
                        src={data?.authorInfo?.aboutImage?.sourceUrl}
                        alt={data?.authorInfo?.aboutImage?.altText}
                        // className="author-image"
                        width="390"
                        height="400"
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </Col>

                    {/* Author Content Column */}
                    <Col md={9}>
                      <div className="author-content">
                        <h3 className="author-name">
                          {data?.authorInfo?.heroTitle}
                        </h3>
                        <p className="author-title">
                          {data?.authorInfo?.heroDescription}
                        </p>

                        <div
                          className="author-bio"
                          dangerouslySetInnerHTML={{
                            __html: data?.authorInfo?.aboutText,
                          }}
                        ></div>
                        <div className="">
                          {data?.authorInfo?.linkedinProfile && (
                            <a
                              href={data?.authorInfo?.linkedinProfile}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <FaLinkedin size={30} color="#0A66C2" />
                            </a>
                          )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card>
              </Container>
            </main>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
}
