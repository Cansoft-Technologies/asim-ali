import { gql } from "@apollo/client";
import emailjs from "@emailjs/browser";
import { Footer, Header, Hero } from "components";
import ApplySection from "components/ApplySection";
import ContactSection from "components/ContactSection";
import OurRates from "components/OurRates";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 301 }) {
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

            CurrentRates {
              bannerTitle
              currentMortgageRate
              currentPrimeRate
              easyApplicationSubtitle
              easyApplicationTitle
              paymentCalculatorTitle
              tableBottomNotes
              bannerBackgroundImage {
                altText
                sourceUrl
              }
              easyApplicationBackground {
                altText
                sourceUrl
              }
              paymentCalculatorLink {
                url
              }
              tableRateInformation {
                terms
                bankRates
                dominion
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
      currentData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  currentData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Current = (props: MyProps) => {
  const { settings, mainMenus, currentData, metaData } = props;
  const [success2, setSuccess2] = useState(null);
  const form2 = useRef();

  const sendEmail2 = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_12yqpdo",
        "template_hvh5bop",
        form2.current,
        "bKO8M-uo0olOYAj7Z"
      )
      .then(
        (result) => {
          setSuccess2(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  };

  return (
    <div className="currentRate">
      {currentData?.map((data, index) => {
        return (
          <div key={index} className="currentRate-container">
            <Head>
              {metaData?.map((meta,index) => {
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
            <Header settings={settings} mainMenus={mainMenus} />

            <main className="content">
              <Hero
                title={data?.CurrentRates?.bannerTitle}
                bgImage={data?.CurrentRates?.bannerBackgroundImage?.sourceUrl}
              />

              <div className="container py-5">
                <div className="row">
                  <div className="col-md-12">
                    <div className="current-rate">
                      <Container className="mt-5">
                        <h1 className="pt-5 text-center">Current Rates</h1>
                        <OurRates/>
                      </Container>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url("${data?.CurrentRates?.easyApplicationBackground?.sourceUrl}")`,
                }}
                className="howto-application"
              >
                <div className="overlay"></div>
                <Container className="py-1">
                  <ApplySection />
                </Container>
              </div>

              <div className="calculator-cta">
                <h2>{data?.CurrentRates?.paymentCalculatorTitle}</h2>
                <Link href="/mortgage-calculator">
                  <Button className="contactBtn">Mortgage Calculator</Button>
                </Link>
              </div>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </div>
  );
};

export default Current;
