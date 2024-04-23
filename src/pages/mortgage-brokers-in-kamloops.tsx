import { gql } from "@apollo/client";
import { Hero, Team } from "components";
import FlexibilityTab from "components/FlexibilityTab";
import HomeBuyerSection from "components/HomeBuyerSection";
import MortgageAdvisor from "components/MortgageAdvisor";
import MortgageFeatured from "components/MortgageFeatured";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import { Fragment } from "react";
import Link from "next/link";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 3624 }) {
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
              jsonLd {
                raw
              }
            }
            NewKamloops {
              serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
                altText
                sourceUrl
              }
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
              featuredTextLeft
              featuredTextRight
              featuredImageRight {
                altText
                sourceUrl
              }
              featuredImageLeft {
                altText
                sourceUrl
              }
              mortgageInterest {
                advisorTitle
                advisorDescriptionTop
                advisorImage {
                  sourceUrl
                  altText
                }
                advisorCards {
                  title
                  description
                }
              }
              tipsTitle
              tipsDescription
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
              homebuyerSection {
                advisorTitle
                advisorCards {
                  title
                  description
                  image {
                    sourceUrl
                    altText
                  }
                }
              }
              advisorSection {
                advisorTitle
                advisorDescriptionTop
                advisorImage {
                  sourceUrl
                  altText
                }
                advisorCards {
                  title
                  description
                }
              }
              mortgageBenifits {
                advisorTitle
                advisorDescriptionTop
                advisorImage {
                  sourceUrl
                  altText
                }
                advisorCards {
                  title
                  description
                }
              }
              tabRenovation {
                tabHeading
                tabDetails {
                  title
                  description
                }
              }
              homeContactSection {
                title
                description
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
              uploadLogoMobile {
                sourceUrl
                altText
              }
            }
            generalSettings {
              schemaProductRating
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
                childItems(first: 50) {
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
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      advisorData: data?.pages?.nodes[0]?.NewKamloops?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewKamloops,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewKamloops?.mortgageBenifits,
      mortgageServiceData: data?.pages?.nodes[0]?.NewKamloops?.mortgageInterest,
      featuredTextLeft: data?.pages?.nodes[0]?.NewKamloops?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewKamloops?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewKamloops?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewKamloops?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewKamloops?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewKamloops?.tabRenovation,
      homebuyerSectionData:
        data?.pages?.nodes[0]?.NewKamloops?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewKamloops?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewKamloops?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewKamloops?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewKamloops?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewKamloops?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewKamloops?.tipsImageLeft,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  contactData: any;
  tabRenovationData: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  mortgageServiceData: any;
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  homebuyerSectionData: any;
  serviceBannerData: any;
  advisorData: any;
};

export default function NewKamloops(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    contactData,
    tabRenovationData,
    featuredTextLeft,
    featuredImageLeft,
    featuredImageRight,
    featuredTextRight,
    mortgageServiceData,
    tipsImageRight,
    tipsLeftText,
    tipsRightText,
    tipsDescription,
    tipsTitle,
    tipsImageLeft,
    homebuyerSectionData,
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
  } = props;

  const dataRates = [
    {
      term: "6 Months",
      bankRate: "6.59 %",
      bankPayment: "$675.29",
      ourRate: "7.49 %",
      ourPayment: "$730.93",
      savings: "$-55.64",
    },
    {
      term: "1 Year",
      bankRate: "7.84 %",
      bankPayment: "$753.03",
      ourRate: "6.93 %",
      ourPayment: "$696.10",
      savings: "$56.93",
    },
    {
      term: "2 Years",
      bankRate: "7.34 %",
      bankPayment: "$721.53",
      ourRate: "6.37 %",
      ourPayment: "$661.96",
      savings: "$59.57",
    },
    {
      term: "3 Years",
      bankRate: "6.99 %",
      bankPayment: "$699.80",
      ourRate: "5.44 %",
      ourPayment: "$606.90",
      savings: "$92.90",
    },
    {
      term: "4 Years",
      bankRate: "6.79 %",
      bankPayment: "$687.50",
      ourRate: "5.52 %",
      ourPayment: "$611.56",
      savings: "$75.94",
    },
    {
      term: "5 Years",
      bankRate: "6.84 %",
      bankPayment: "$690.57",
      ourRate: "4.99 %",
      ourPayment: "$581.04",
      savings: "$109.53",
    },
    {
      term: "7 Years",
      bankRate: "7.10 %",
      bankPayment: "$706.60",
      ourRate: "6.09 %",
      ourPayment: "$645.17",
      savings: "$61.43",
    },
    {
      term: "10 Years",
      bankRate: "7.25 %",
      bankPayment: "$715.92",
      ourRate: "6.14 %",
      ourPayment: "$648.15",
      savings: "$67.77",
    },
  ];
  const meetingTitle = `
  <h2>Our Mortgage Rates</h2>
<p>We know that finding a good deal matters to you. That's why our rates are something to smile about! We work hard to give you rates that are just right. Our team talks to lots of lenders to make sure you don't pay too much. This means you save money for other important things.</p>

  `;
  const lendersData = {
    __typename: "Page_Homepage_TeamSection",
    teamTitle:
      '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></h2>\n' +
      "",
    teamDescription:
      `<p><span style="font-weight: 400;">We team up with over 100 lenders. This big group includes all kinds of places that lend money for homes. Big banks, special groups that help people buy homes, and other money-lending places are all in this group. Because we know so many, we can find the best fit for your home dream. Every person's home wish is different, so having lots of choices helps us match you with the perfect one. </span></p>\n` +
      "",
    hideSection: null,
    teamImage: {
      __typename: "MediaItem",
      sourceUrl:
        "https://asimaliprod.wpengine.com/wp-content/uploads/2023/03/mortgage-broker-surrey-7.webp",
      altText: "Mortgage Broker Surrey",
    },
    teamImages: [
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/amba-1.png",
          altText: "amba 1",
        },
        linkUrl: "https://www.amba.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/b2b-01.png",
          altText: "b2b 01",
        },
        linkUrl: "https://b2bbank.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/bridge-water-logo.png",
          altText: "bridge water logo",
        },
        linkUrl: "https://bridgewaterbank.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/cmba.png",
          altText: "cmba",
        },
        linkUrl: "https://www.cmbabc.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/cmls.png",
          altText: "cmls",
        },
        linkUrl: "https://www.cmls.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/dlc-logo.png",
          altText: "dlc logo",
        },
        linkUrl: "https://dominionlending.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/EquitableBank-EN-Stacked-RGB-1.png",
          altText: "EquitableBank EN Stacked RGB 1",
        },
        linkUrl: "https://www.equitablebank.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/FCT-01.png",
          altText: "FCT 01",
        },
        linkUrl: "https://fct.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/First-National-01.png",
          altText: "First National 01",
        },
        linkUrl: "https://www.firstnational.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Fisgard-01.png",
          altText: "Fisgard 01",
        },
        linkUrl: "https://fisgard.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Home-Equity-01-1.png",
          altText: "Home Equity 01",
        },
        linkUrl: "https://www.homeequitybank.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Home-Trust-01.png",
          altText: "Home Trust 01",
        },
        linkUrl: "https://www.hometrust.ca/",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/lendwise.png",
          altText: "lendwise",
        },
        linkUrl: "https://www.merixfinancial.com/#main",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/icici-01.png",
          altText: "icici 01",
        },
        linkUrl: "https://www.icicibank.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/insureline-logo.png",
          altText: "insureline logo",
        },
        linkUrl: "https://insureline.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/manulife-logo.png",
          altText: "manulife logo",
        },
        linkUrl: "https://www.manulife.ca/personal.html",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/marathon-mortgage-logo.png",
          altText: "marathon mortgage logo",
        },
        linkUrl: "https://www.marathonmortgage.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/mcap-logo.png",
          altText: "mcap logo",
        },
        linkUrl: "https://www.mcap.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/merix-logo.png",
          altText: "merix logo",
        },
        linkUrl: "https://www.merixfinancial.com",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/mpc-logo-1.png",
          altText: "mpc logo 1",
        },
        linkUrl: "https://mortgageproscan.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/reca.png",
          altText: "reca",
        },
        linkUrl: "https://www.reca.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/rfa-logo.png",
          altText: "rfa logo",
        },
        linkUrl: "https://www.rfa.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/rmg-logo.png",
          altText: "rmg logo",
        },
        linkUrl: "https://www.rmgmortgages.ca",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Scotiabank-logo.png",
          altText: "Scotiabank logo",
        },
        linkUrl: "https://www.scotiabank.com/ca/en/personal.html",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/td-logo.png",
          altText: "td logo",
        },
        linkUrl: "https://www.td.com/ca/en/personal-banking",
      },
      {
        __typename: "Page_Homepage_TeamSection_teamImages",
        image: {
          __typename: "MediaItem",
          sourceUrl:
            "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/wealthone.png",
          altText: "wealthone",
        },
        linkUrl: "https://www.wealthonebankofcanada.com",
      },
    ],
  };
  return (
    <>
      <Head>
        {metaData?.map((meta, index) => {
          return (
            <Fragment key={index}>
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
            </Fragment>
          );
        })}
      </Head>
      <Header settings={settings} mainMenus={mainMenus} />
      <main className="content">
        {serviceBannerData?.serviceBannerTitle == null ? (
          ""
        ) : (
          <Hero
            title={serviceBannerData?.serviceBannerTitle}
            heading={serviceBannerData?.serviceBannerHeading}
            description={serviceBannerData?.serviceBannerDescription}
            bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
          />
        )}
        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={7}>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.aboutText,
                }}
              ></div>
              <div className="tb-btn-left">
                <Link href={"/apply-now"}>
                  <Button className="HeadBtn">Secure Your Future!</Button>
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="400"
                priority={true}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>

        <Container
          className="mb-5 px-3 py-3 my-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{tipsTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: tipsDescription,
            }}
          ></div>
          <div className="tb-btn">
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">Explore Your Options!</Button>
            </Link>
          </div>
        </Container>
        <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        <div>
          <Container>
            <Row>
              <Col lg={12}>
                <div>
                  <Col>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: meetingTitle,
                      }}
                    ></div>
                  </Col>
                </div>
              </Col>
            </Row>
            <Row lg={12} className="text-center mt-5">
              <Col className="rates-table" lg={10} md={{ span: 10, offset: 1 }}>
                <Row>
                  <Col lg={3}>
                    <Row>
                      <Col lg={12} md={6}>
                        <div className="variable-prime-rates">
                          <p>
                            6.30 <span>%</span>
                          </p>
                          <span className="small-print">
                            Current Variable Rate
                          </span>
                        </div>
                      </Col>
                      <Col lg={12} md={6}>
                        <div className="variable-prime-rates">
                          <p>
                            7.20 <span>%</span>
                          </p>
                          <span className="small-print">
                            Current Prime Rate
                          </span>
                        </div>
                      </Col>
                      <Col lg={12}>
                        <Alert variant="info" className="small">
                          <p>
                            <b>Please Note:</b> Some conditions may apply. Rates
                            may vary from Province to Province. Rates subject to
                            change without notice. Posted rates may be high
                            ratio and/or quick close which can differ from
                            conventional rates. *O.A.C. & E.O
                          </p>
                        </Alert>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={9} className="rates">
                    <Row>
                      <Col xs={2}>
                        <b>Terms</b>
                      </Col>
                      <Col xs={2}>
                        <b>Bank Rates</b>
                      </Col>
                      <Col xs={2}>
                        <b>Payment Per $100K</b>
                      </Col>
                      <Col xs={2}>
                        <b>Our Rates</b>
                      </Col>
                      <Col xs={2}>
                        <b>Payment Per $100K</b>
                      </Col>
                      <Col xs={2}>
                        <b>Savings</b>
                      </Col>
                    </Row>
                    {dataRates.map((rate, index) => (
                      <Row key={index}>
                        <Col xs={2}>{rate.term}</Col>
                        <Col xs={2}>{rate.bankRate}</Col>
                        <Col xs={2}>{rate.bankPayment}</Col>
                        <Col xs={2}>{rate.ourRate}</Col>
                        <Col xs={2}>{rate.ourPayment}</Col>
                        <Col xs={2}>{rate.savings}</Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              </Col>
              <div className="mt-4 row">
                <Col lg={10} className="offset-lg-1 px-0">
                  <Alert variant="info">
                    <div className="meeting_text">
                      <p className="">
                        Please Note: Rates you see may change, and the rate you
                        get from any bank or lender, or whether you’re approved
                        or not, depends on your situation. The rates you see are
                        just estimates and might not be exact. It’s best to talk
                        to us for the most accurate info and to find out if you
                        qualify.
                      </p>
                    </div>
                  </Alert>
                </Col>
              </div>
            </Row>
          </Container>
        </div>
        <FlexibilityTab tabData={tabRenovationData} />
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        <Team teams={lendersData} />
        <Container className="mt-5">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-start"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
