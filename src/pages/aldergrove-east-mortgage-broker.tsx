import { gql } from "@apollo/client";
import AccordionSection from "components/AccordionSection";
import LocationHero from "components/LocationHero";
import MortgageAdvisor from "components/MortgageAdvisor";
import OurLenders from "components/OurLenders";
import OurRates from "components/OurRates";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import ClientReviews from "components/ClientReviews";
import MapSection from "components/MapSection";
import TestimonialSliderRow from "components/TestimonialSliderRow";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 5979 }) {
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
              teamSection {
                teamTitle
                teamDescription
                hideSection
                teamImage {
                  sourceUrl
                  altText
                }
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
              reviewSection {
                reviewTitle
                reviewDescription
                reviewCard {
                  author
                  reviewText
                  clientImage {
                    sourceUrl
                    altText
                  }
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
                cta
              }
              homeContactSectionSecond {
                image {
                  sourceUrl
                  altText
                }
                ctaBtn
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
      reviewSection: data?.pages?.nodes[0]?.NewVancouver?.reviewSection,
      tipsImageRight: data?.pages?.nodes[0]?.NewVancouver?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewVancouver?.tipsImageLeft,
      reasonTitle: data?.pages?.nodes[0]?.NewVancouver?.reasonTitle,
      reasonDescription: data?.pages?.nodes[0]?.NewVancouver?.reasonDescription,
      reasonLeftText: data?.pages?.nodes[0]?.NewVancouver?.reasonLeftText,
      reasonRightImage: data?.pages?.nodes[0]?.NewVancouver?.reasonRightImage,
      reasonRightText: data?.pages?.nodes[0]?.NewVancouver?.reasonRightText,
      reasonLeftImage: data?.pages?.nodes[0]?.NewVancouver?.reasonLeftImage,
      homeContactSectionSecond:
        data?.pages?.nodes[0]?.NewVancouver?.homeContactSectionSecond,
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
  reviewSection: any;
  serviceBannerData: any;
  advisorData: any;
  mortgageInterestData: any;
  reasonTitle: any;
  reasonDescription: any;
  reasonLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  homeContactSectionSecond: any;
};

export default function Page(props: MyProps) {
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
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
    teamData,
    mortgageInterestData,
    reviewSection,
    reasonTitle,
    reasonDescription,
    reasonLeftText,
    reasonRightImage,
    reasonRightText,
    reasonLeftImage,
    homeContactSectionSecond,
  } = props;

  const rateTitle = `
<span style="font-size: 32px; font-weight: semi-bold;">Current Mortgage Rates
​​</span>

<p>If you are a first-time home buyer, then knowing about the rates will help you a lot. Here are our competitive rates:</p>

`;
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
                style={{ width: "100%", objectFit: "cover", height: "70vh" }}
              />
            </Col>
          </Row>
        </Container>

        {/* Tips Section */}
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
        </Container>

        <ServiceSection
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
        />

        {/* CTA btn */}
        <div className="tb-btn">
          {" "}
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">{contactData?.cta}</Button>
          </Link>
        </div>

        {/* Mortgage Advisor Section */}
        <Container className="mt-5 my-20">
          <MortgageAdvisor advisorData={mortgageBenefitsData} />
          {/* <div className="tb-btn mb-4">
            <Link href={"https://asimali.ca/current-rates"}>
              <Button className="HeadBtn">{advisorData?.cta}</Button>
            </Link>
          </div> */}
        </Container>

        {/* Our Rates Section */}
        <OurRates title={rateTitle} />
        <div className="tb-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">Craft Your Perfect Loan</Button>
          </Link>
        </div>

        {/* <OurLenders title={teamTitle} description={teamDescription} /> */}

        {/* Client Testimonials */}
        <Container className="mb-5 mt-5">
          <TestimonialSliderRow />
        </Container>

        <Container
          className="mb-5 px-3 py-3 my-5 mt-5"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{reasonTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: reasonDescription,
            }}
          ></div>
        </Container>
        <ServiceSection
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
          lctaText={serviceBannerData?.reasonCtaText}
          lctaUrl={serviceBannerData?.reasonCtaUrl}
        />

        {/* <ClientReviews reviews={reviewSection} /> */}

        {/* <AccordionSection advisorData={mortgageInterestData} /> */}
        <Container className="mb-5 mt-5">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <Row className="my-5">
            {homeContactSectionSecond?.image && (
              <Col md={5}>
                <Image
                  src={homeContactSectionSecond?.image?.sourceUrl}
                  alt={homeContactSectionSecond?.image?.altText}
                  width="600"
                  height="600"
                  style={{ width: "100%", objectFit: "cover", height: "100%" }}
                />
              </Col>
            )}
            <Col md={homeContactSectionSecond?.image ? 7 : 12}>
              <div className="d-flex flex-column h-100 px-md-4 px-0 justify-content-center">
                <div
                  dangerouslySetInnerHTML={{
                    __html: contactData?.description,
                  }}
                  className="mb-4 contact-description"
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.7",
                    color: "#333",
                  }}
                ></div>

                {homeContactSectionSecond?.ctaBtn && (
                  <div
                    className="tb-btn-left mt-4"
                    dangerouslySetInnerHTML={{
                      __html: homeContactSectionSecond?.ctaBtn,
                    }}
                  ></div>
                )}
              </div>
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                  .contact-description p {
                    margin-bottom: 1.25rem;
                  }
                  .contact-description p:last-child {
                    margin-bottom: 0;
                  }
                `,
                }}
              />
            </Col>
          </Row>

          {/* added map section here */}
          <MapSection />
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
