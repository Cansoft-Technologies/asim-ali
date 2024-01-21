import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
type MyProps = {
  contactData?: any;
};
const CTA = (props: MyProps) => {
  const [catSections, setCatSections] = useState([]);
  const { contactData } = props;
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
                      height: "82vh",
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
                        height: "100%",
                      }}
                      alt="Logo"
                      fill
                    />
                  </div>
                </div>
                <div className="cta-details">
                  <Container className="mb-5">
                    <h2 className="text-center service-title">
                      {contactData?.title}
                    </h2>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: contactData?.description,
                      }}
                      className="text-lg text-start"
                    ></div>
                  </Container>
                </div>
                <div className="cta_text mt-5">
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
