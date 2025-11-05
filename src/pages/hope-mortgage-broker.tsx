import { gql } from "@apollo/client";
import { Hero, Team } from "components";
import AccordionSection from "components/AccordionSection";
import FlexibilityTab from "components/FlexibilityTab";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import { Fragment } from "react";
import Link from "next/link";
import ContactSection from "components/ContactSection";
import OurRates from "components/OurRates";
import OurLenders from "components/OurLenders";
import LocationHero from "components/LocationHero";
import BorrowingPayment from "components/BorrowingPayment";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 6090 }) {
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
            NewVancouver {
              serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
                altText
                sourceUrl
              }
              aboutText
              aboutCtaText
              aboutCtaUrl
              aboutImage {
                altText
                sourceUrl
              }

              borrowingPayment {
                borrowingTitle
                borrowingDescriptionTop
                borrowingRightDescription
                borrowingImage {
                  sourceUrl
                  altText
                }
                borrowingCtaText
                borrowingCtaUrl
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
              reasonCtaText
              reasonCtaUrl

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
                advisorCtaText
                advisorCtaUrl
              }

              talk {
                talkTitle
                talkDescription
                talkCtaText
                talkCtaUrl
              }

              teamSection {
                teamTitle
                teamDescription
                hideSection
                teamImage {
                  sourceUrl
                  altText
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
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      teamData: data?.pages?.nodes[0]?.NewVancouver?.teamSection,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.NewVancouver?.borrowingPayment,
      advisorData: data?.pages?.nodes[0]?.NewVancouver?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewVancouver,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewVancouver?.mortgageBenifits,
      mortgageInterestData:
        data?.pages?.nodes[0]?.NewVancouver?.mortgageInterest,
      featuredTextLeft: data?.pages?.nodes[0]?.NewVancouver?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewVancouver?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewVancouver?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewVancouver?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewVancouver?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewVancouver?.tabRenovation,
      tipsTitle: data?.pages?.nodes[0]?.NewVancouver?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewVancouver?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewVancouver?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewVancouver?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewVancouver?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewVancouver?.tipsImageLeft,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  teamData: any;
  metaData: any;
  contactData: any;
  borrowingPaymentData: any;
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
  serviceBannerData: any;
  advisorData: any;
  mortgageInterestData: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    contactData,
    borrowingPaymentData,
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
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
    teamData,
    mortgageInterestData,
  } = props;

  //   const teamTitle =
  //   '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></h2>\n' +
  //   "";
  // const teamDescription =
  //   `<p><span style="font-weight: 400;">Our network includes partnerships with over 100 lenders, ranging from the most reputable major banks to specialized financing institutions. This expansive array of lending partners enables us to provide a comprehensive selection of mortgage options, designed to cater to the diverse financial situations and goals of our clients.
  // </span></p>\n` +
  //   "";
  //   const rateTitle = `
  // <h2>Ou Rates</h2>
  // <p>Discover competitive mortgage rates in Lochdale with Asim Ali, offering a spectrum of options to suit your financial scenario. Our extensive lender network enables us to secure favorable rates. s
  // </p>

  // `;
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
      <Header settings={settings} menuData={mainMenus} />
      <main className="content">
        {serviceBannerData?.serviceBannerTitle == null ? (
          ""
        ) : (
          <LocationHero
            title={serviceBannerData?.serviceBannerTitle}
            heading={serviceBannerData?.serviceBannerHeading}
            description={serviceBannerData?.serviceBannerDescription}
            bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
          />
        )}

        {/* About Section */}
        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={7}>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.aboutText,
                }}
              ></div>
              {/* CTA */}
              {serviceBannerData?.aboutCtaText && (
                <div className="tb-btn-left">
                  <Link href={serviceBannerData?.aboutCtaUrl || "/"}>
                    <Button className="HeadBtn">
                      {serviceBannerData?.aboutCtaText}
                    </Button>
                  </Link>
                </div>
              )}
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="400"
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>

        {/* Borrowing Payment Section */}
        <Container className="my-12">
          <BorrowingPayment borrowingPaymentData={borrowingPaymentData} />
        </Container>

        {/* Reason Section */}
        <Container className="my-12">
          <Container
            className="mb-5 p-3"
            style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
          >
            <h2 className="text-center">{serviceBannerData?.reasonTitle}</h2>
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: serviceBannerData?.reasonDescription,
              }}
            ></div>
          </Container>
          <ServiceSection
            textLeft={serviceBannerData?.reasonLeftText}
            textRight={serviceBannerData?.reasonRightText}
            imageLeft={serviceBannerData?.reasonLeftImage}
            imageRight={serviceBannerData?.reasonRightImage}
          />
          <ServiceSection
            textLeft={featuredTextLeft}
            textRight={featuredTextRight}
            imageLeft={featuredImageLeft}
            imageRight={featuredImageRight}
            ctaText={serviceBannerData?.reasonCtaText}
            ctaUrl={serviceBannerData?.reasonCtaUrl}
          />
        </Container>

        {/* Mortgage Advisor Section */}
        <Container className="my-12">
          <MortgageAdvisor advisorData={mortgageBenefitsData} />
        </Container>

        {/* Our Rates */}
        <OurRates
          title={`<span style="font-size: 32px; font-weight: semi-bold;">Current Mortgage Rates</span>
                  <p>If you are a first-time home buyer, then knowing about the rates will help you a lot. Here are our competitive rates:</p>`}
        />

        {/* Talk Section */}
        <Container className="mb-5">
          {serviceBannerData?.talk?.talkTitle && (
            <div
              className="my-20 p-6 talk-box"
              style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
            >
              <h2 className="text-center service-title">
                {serviceBannerData?.talk?.talkTitle}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.talk?.talkDescription,
                }}
                className="text-lg text-center"
              ></div>

              {/* Talk CTA */}
              {serviceBannerData?.talk?.talkCtaText && (
                <div className="tb-btn">
                  <Link href={serviceBannerData?.talk?.talkCtaUrl || "/"}>
                    <Button className="HeadBtn">
                      {serviceBannerData?.talk?.talkCtaText}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </Container>





        {/* <Container
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
            <Link href={"/contact-us"}>
              <Button className="HeadBtn">Explore Our Mortgage Options</Button>
            </Link>
          </div>
        </Container> */}

        {/* <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        /> */}

        {/* <OurLenders title={teamTitle} description={teamDescription} /> */}

        {/* FAQ Section */}
        {/* <AccordionSection advisorData={mortgageInterestData} />
        <div className="tb-btn">
          <Link href={"/contact-us"}>
            <Button className="HeadBtn">Calculate Your Mortgage</Button>
          </Link>
        </div> */}

        {/* Contact Section */}
        {/* <Container className="mb-5 mt-5">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-center"
          ></div>
          <div className="tb-btn">
            <Link href={"/contact-us"}>
              <Button className="HeadBtn">CONTACT US</Button>
            </Link>
          </div>
        </Container> */}
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
