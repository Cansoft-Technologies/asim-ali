import { gql } from "@apollo/client";
import emailjs from "@emailjs/browser";
import { Footer, Header, Hero } from "components";
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
            menuItems(first: 50) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems (first: 50) {
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
  if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
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
              {metaData?.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
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
                      <div className="current-container">
                        <h1 className="mb-1">Current Rates</h1>
                        {data?.CurrentRates?.currentMortgageRate == null ? (
                          ""
                        ) : (
                          <p>
                            Current Variable Mortgage Rate is{" "}
                            <b>{data?.CurrentRates?.currentMortgageRate}</b>
                          </p>
                        )}
                        {data?.CurrentRates?.currentPrimeRate == null ? (
                          ""
                        ) : (
                          <p>
                            Current Prime Rate is{" "}
                            <b>{data?.CurrentRates?.currentPrimeRate}</b>
                          </p>
                        )}

                        <table className="text-center table table-striped table-hover">
                          <thead className="table-light">
                            <tr>
                              <th scope="col">Terms</th>
                              <th scope="col">Bank Rates</th>
                              <th scope="col">Dominion</th>
                            </tr>
                          </thead>
                          <tbody>
                            {data?.CurrentRates?.tableRateInformation.map(
                              (info, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{info?.terms}</td>
                                    <td>{info?.bankRates}%</td>
                                    <td>{info?.dominion}%</td>
                                  </tr>
                                );
                              }
                            )}
                          </tbody>
                        </table>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: data?.CurrentRates?.tableBottomNotes,
                          }}
                          className="notes fst-italic"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url("${data?.CurrentRates?.easyApplicationBackground?.sourceUrl}")`,
                }}
                className="easy-application"
              >
                <div className="overlay"></div>
                <Container className="py-1">
                  <Row>
                    <Col md={6}>
                      <div className="easyapplication-title">
                        <h2>{data?.CurrentRates?.easyApplicationTitle}</h2>
                        <p>{data?.CurrentRates?.easyApplicationSubtitle}</p>
                      </div>

                      <div className="application-container">
                        <form ref={form2} onSubmit={sendEmail2}>
                          <input
                            placeholder="Full Name"
                            type="text"
                            name="fullname"
                          />
                          <input
                            placeholder="Email"
                            type="email"
                            name="email"
                          />
                          <input placeholder="Phone" type="text" name="phone" />
                          <input
                            value="Send"
                            type="submit"
                            className="contactBt"
                          />
                          {success2 && (
                            <div
                              className="alert alert-success mt-4"
                              role="alert"
                            >
                              Your message was sent Successfully
                            </div>
                          )}
                        </form>
                      </div>
                    </Col>
                    <Col md={6}></Col>
                  </Row>
                </Container>
              </div>

              <div className="calculator-cta">
                <h2>{data?.CurrentRates?.paymentCalculatorTitle}</h2>
                <Link href={data?.CurrentRates?.paymentCalculatorLink?.url}>
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
