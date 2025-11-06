import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import BorrowingPayment from "components/BorrowingPayment";
import TestimonialSliderRow from "components/TestimonialSliderRow";
import FaqSection from "components/FaqSection";
import MapSection from "components/MapSection";
import OurRates from "components/OurRates";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4720 }) {
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
            newConstructionFinancing {
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

              processBorrowing {
                advisorTitle
                advisorDescriptionTop
                advisorCards {
                  title
                  description
                }
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
                helpCtaText
                helpCtaUrl
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
                tabCtaText
                tabCtaUrl
              }
              loanTitle

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

              talk {
                talkTitle
                talkDescription
                talkCtaText
                talkCtaUrl
              }
              faq {
                faqTitle
                faqDescription
                faqAccordion {
                  question
                  answer
                }
                faqCtaText
                faqCtaUrl
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
      serviceBannerData: data?.pages?.nodes[0]?.newConstructionFinancing,
      reasonTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.loanTitle,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.newConstructionFinancing?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.commonConcerns,
      ratesTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.ratesDescription,
      faqData: data?.pages?.nodes[0]?.newConstructionFinancing?.faq,
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
  reasonLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  loanTitle: any;
  borrowingPaymentData: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  ratesTitle: any;
  ratesDescription: any;
  faqData: any;
};

export default function NewFixedMortgageRatesBC(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    loanTitle,
    reasonDescription,
    reasonLeftText,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    borrowingPaymentData,
    expertsHelpData,
    tabWhyChooseData,
    borrowingProcessData,
    qualifyingTitle,
    qualifyingDescription,
    commonConcernsData,
    ratesTitle,
    ratesDescription,
    faqData,
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
      <Header settings={settings} menuData={mainMenus} />
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

        {/* About Section */}
        <Container className="my-24">
          <Row className="coquitlam-grid my-5">
            <Col md={7}>
              <Row>
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
              </Row>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="400"
                height="400"
                style={{
                  width: "100%",
                  objectFit: "cover",
                  height: "auto",
                }}
                quality={100}
              />
            </Col>
          </Row>
        </Container>

        {/* Our Rates Section */}
        <OurRates title={rateTitle} />

        {/* Borrowing Payment Section */}
        <Container className="my-24">
          <BorrowingPayment borrowingPaymentData={borrowingPaymentData} />
        </Container>

        {/* Reason Section */}
        <Container className="my-24">
          <Container
            className="mb-5 p-3"
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
        </Container>

        {/* Experts Help Section */}
        {/* <Container className="my-24">
          <Container
            className="mb-5 p-3"
            style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
          >
            <h2 className="text-center">{expertsHelpData?.expertsHelpTitle}</h2>
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: expertsHelpData?.expertsHelpDescription,
              }}
            ></div>
          </Container>
          <ServiceSection
            textLeft={expertsHelpData?.helpLeftText}
            textRight={expertsHelpData?.helpRightText}
            imageLeft={expertsHelpData?.helpLeftImage}
            imageRight={expertsHelpData?.helpRightImage}
            ctaText={expertsHelpData?.helpCtaText}
            ctaUrl={expertsHelpData?.helpCtaUrl}
          />
        </Container> */}

        {/* Rates Section */}
        <Container className="my-24">
          <Container
            className="mb-5 p-3"
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
          </Container>
        </Container>

        {/* Why Choose Us Section */}
        <Container className="my-24">
          <TabNewBC tabData={tabWhyChooseData} />

          {/* CTA */}
          {serviceBannerData?.tabWhyChoose?.tabCtaText && (
            <div className="tb-btn">
              <Link href={serviceBannerData?.tabWhyChoose?.tabCtaUrl || "/"}>
                <Button className="HeadBtn">
                  {serviceBannerData?.tabWhyChoose?.tabCtaText}
                </Button>
              </Link>
            </div>
          )}
        </Container>

        {/* Client Testimonial Section */}
        <Container className="mb-5">
          <TestimonialSliderRow />
        </Container>

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

        <Container>
          {/* faq section start */}
          <FaqSection faqData={faqData} />

          {/* Map Section */}
          <MapSection />
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
