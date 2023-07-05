import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const CTA = () => {
  const [catSections, setCatSections] = useState([]);

  useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query {
            pages(where: { title: "home" }) {
              nodes {
                HomeLandingPage {
                  callToActionSection {
                    hideSection
                    actionTitle
                    actionLink {
                      url
                      title
                    }
                    actionBackgroundImage {
                      sourceUrl
                    }
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => setCatSections(result?.data?.pages?.nodes));
  }, []);

  return (
    <>
      {catSections.map((cat, index) => {
        return (
          <Container key={index}>
            <Head>
              <link
                rel="preload"
                as="image"
                href={
                  cat?.HomeLandingPage?.callToActionSection
                    ?.actionBackgroundImage?.sourceUrl
                }
              />
            </Head>
            {cat?.HomeLandingPage?.callToActionSection?.hideSection == true ? (
              ""
            ) : (
              <div
                //   style={{
                //  backgroundImage: `url(${cat?.HomeLandingPage?.callToActionSection?.actionBackgroundImage?.sourceUrl})`
                //  }}
                className="cta_section"
              >
                <div
                  className="cta_first"
                  style={{
                    position: "relative",
                    width: "100%",
                    clipPath: "inset(0 0 0 0)",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "100%",
                      width: "100%",
                      left: "0",
                      top: "0",
                    }}
                  >
                    <Image
                      src={
                        cat?.HomeLandingPage?.callToActionSection
                          ?.actionBackgroundImage?.sourceUrl
                      }
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "82vh",
                      }}
                      alt="Logo"
                      width={500}
                      height="250"
                    />
                  </div>
                </div>
                <div className="cta_text">
                  <p>
                    {cat?.HomeLandingPage?.callToActionSection?.actionTitle}
                  </p>

                  {cat?.HomeLandingPage?.callToActionSection?.actionLink ==
                  null ? (
                    ""
                  ) : (
                    <Link
                      href={
                        cat?.HomeLandingPage?.callToActionSection?.actionLink
                          ?.url
                      }
                    >
                      <Button className="ctaBtn">
                        {
                          cat?.HomeLandingPage?.callToActionSection?.actionLink
                            ?.title
                        }
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            )}
          </Container>
        );
      })}
    </>
  );
};

export default CTA;
