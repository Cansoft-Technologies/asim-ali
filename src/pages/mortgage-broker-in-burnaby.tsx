import { gql } from "@apollo/client";
import { Hero, Team } from "components";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import LocationHero from "components/LocationHero";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4846 }) {
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
            mortgageBrokerBurnaby {
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

              reasonTitle
              reasonDescription
              reasonLeftText
              reasonRightText
              reasonLeftImage {
                altText
                sourceUrl
              }
              reasonRightImage {
                altText
                sourceUrl
              }
              reasonLeftText2
              reasonRightText2
              reasonLeftImage2 {
                altText
                sourceUrl
              }
              reasonRightImage2 {
                altText
                sourceUrl
              }
              processBorrowing {
                advisorTitle
                advisorDescriptionTop
                advisorCards {
                  title
                  description
                }
              }
              processBelowDesc
              borrowingPayment {
                borrowingTitle
                borrowingDescriptionTop
                borrowingRightDescription
                borrowingImage {
                  sourceUrl
                  altText
                }
              }
              expertsHelp {
                expertsHelpTitle
                expertsHelpDescription
                helpLeftText
                helpRightText
                helpLeftImage {
                  sourceUrl
                  altText
                }
                helpRightImage {
                  sourceUrl
                  altText
                }
              }
              ratesTitle
              ratesDescription

              tabWhyChoose {
                tabHeading
                tabDescription
                tabDetails {
                  title
                  description
                }
              }
              loanTitle
              reasonLeftTextCopy
              reasonRightTextCopy
              reasonLeftImageCopy {
                altText
                sourceUrl
              }
              reasonRightImageCopy {
                altText
                sourceUrl
              }

              qualifyingTitle
              qualifyingDescription
              commonConcerns {
                advisorTitle
                advisorDescription
                advisorImage {
                  sourceUrl
                  altText
                }
                advisorCards {
                  title
                  description
                }
              }
              talkTitle
              talkDescription
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
            menuItems(first: 150) {
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
      serviceBannerData: data?.pages?.nodes[0]?.mortgageBrokerBurnaby,
      reasonTitle: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonDescription,
      processBelowDesc:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.processBelowDesc,
      reasonLeftText:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftImage,
      reasonLeftText2:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftText2,
      reasonRightImage2:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightImage2,
      reasonRightText2:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightText2,
      reasonLeftImage2:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftImage2,
      loanTitle: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.ratesDescription,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  serviceBannerData: any;
  reasonTitle: any;
  reasonDescription: any;
  processBelowDesc: any;
  reasonLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  reasonLeftText2: any;
  reasonRightText2: any;
  reasonLeftImage2: any;
  reasonRightImage2: any;
  loanTitle: any;
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  borrowingPaymentData: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
  ratesTitle: any;
  ratesDescription: any;
};

export default function NewMortgageBrokerInBurnaby(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    loanTitle,
    reasonDescription,
    processBelowDesc,
    reasonLeftText,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    reasonLeftText2,
    reasonRightText2,
    reasonLeftImage2,
    reasonRightImage2,
    reasonLeftTextCopy,
    reasonRightTextCopy,
    reasonLeftImageCopy,
    reasonRightImageCopy,
    borrowingPaymentData,
    expertsHelpData,
    tabWhyChooseData,
    borrowingProcessData,
    qualifyingTitle,
    qualifyingDescription,
    commonConcernsData,
    talkTitle,
    talkDescription,
    ratesTitle,
    ratesDescription,
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
  <h2>Our Rates</h2>
<p>We work hard to find you the best deals. Our team talks to many lenders to make sure you get low costs that fit your budget. We understand everyone wants a good deal, so we use our connections to help you save money. Our rates are competitive, which means we match or beat the costs you might see elsewhere. We make it simple for you to pick a mortgage that works best for you, without all the extra stress.</p>

  `;
  const lendersData = {
    __typename: "Page_Homepage_TeamSection",
    teamTitle:
      '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></h2>\n' +
      "",
    teamDescription:
      `<p><span style="font-weight: 400;">We have a close connection with over 100 lenders at our disposal. This large network has many diverse types of lenders to ensure that your needs are met perfectly. Big banks, small credit unions, and credit cooperatives together make up our group. It is now possible to provide an unlimited number of options and to always offer you the best rate. With a lot of mortgage products to choose from, getting the right home loan with the most favorable conditions is more of an easy task today than ever before. </span></p>\n` +
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
        {serviceBannerData?.serviceBannerTitle == null ? (
          ""
        ) : (
          <LocationHero
            title={serviceBannerData?.serviceBannerTitle}
            heading={serviceBannerData?.serviceBannerHeading}
            description={serviceBannerData?.serviceBannerDescription}
            bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
            buttonLeft={true}
            buttonText="GET APPROVED"
            buttonURL="/contact-us"
            button2Text="APPLY NOW"
            button2URL="/apply-now"
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
                  <Button className="HeadBtn">Embark on Homeownership!</Button>
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="200"
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
          <h2 className="text-center">{reasonTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: reasonDescription,
            }}
          ></div>
          <div className="tb-btn">
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">Explore Your Options!</Button>
            </Link>
          </div>
        </Container>
        <div className="service-row my-5">
          <Container>
            <Row className="">
              <Col className="service-texts mt-0 mb-2 text-hide-pc" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: expertsHelpData?.helpLeftText,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={expertsHelpData?.helpRightImage?.sourceUrl}
                    alt={expertsHelpData?.helpRightImage?.altText}
                    width="390"
                    height="400"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "45vh",
                    }}
                  />
                </div>
              </Col>
              <Col className="service-texts my-5 text-hide-sm" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: expertsHelpData?.helpLeftText,
                  }}
                ></div>
              </Col>
            </Row>
          </Container>
        </div>

        <ServiceSection
          textLeft={expertsHelpData?.helpRightText}
          textRight={reasonLeftText}
          imageLeft={reasonRightImage}
          imageRight={expertsHelpData?.helpLeftImage}
        />
        <div className="service-row">
          <Container>
            <Row>
              <Col className="service-texts" lg={6}>
                <div
                  className="service-content"
                  dangerouslySetInnerHTML={{
                    __html: reasonRightText,
                  }}
                ></div>
              </Col>
              <Col className="service-texts" lg={6}>
                <div className="service-image">
                  <Image
                    src={reasonLeftImage?.sourceUrl}
                    alt={reasonLeftImage?.altText}
                    width="390"
                    height="400"
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      height: "45vh",
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>

        <div style={{ height: "50px" }}></div>
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
        <TabNewBC tabData={tabWhyChooseData} />

        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: ratesTitle,
            }}
          ></div>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: ratesDescription,
            }}
          ></div>
          <div className="tb-btn">
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">Take Action Now!</Button>
            </Link>
          </div>
        </Container>
        <ServiceSection
          textLeft={reasonLeftTextCopy}
          textRight={reasonRightTextCopy}
          imageLeft={reasonLeftImageCopy}
          imageRight={reasonRightImageCopy}
        />
        <ServiceSection
          textLeft={reasonLeftText2}
          textRight={reasonRightText2}
          imageLeft={reasonLeftImage2}
          imageRight={reasonRightImage2}
        />

        <Team teams={lendersData} />
        <div style={{ height: "50px" }}></div>
        <Container className="mt-5">
          <h2 className="text-center service-title">{talkTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
          <div className="tab-btn">
            <Link href={"/contact-us"}>
              <Button className="HeadBtn">
                Contact <span>Us</span>
              </Button>
            </Link>
          </div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
