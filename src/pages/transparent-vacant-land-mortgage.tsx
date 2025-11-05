import { gql } from "@apollo/client";
import { Hero } from "components";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import TestimonialSliderRow from "components/TestimonialSliderRow";
import MapSection from "components/MapSection";
import { useState } from "react";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 5000 }) {
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
            transparentVacantLandMortgage {
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
                expertsCtaText
                expertCtaUrl
              }

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

              faqTitle
              faqDescription
              faqAccordion {
                question
                answer
              }
              faqCtaText
              faqCtaUrl

              talkTitle
              talkDescription
              talkCtaText
              talkCtaUrl
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
      serviceBannerData: data?.pages?.nodes[0]?.transparentVacantLandMortgage,
      reasonTitle:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonLeftImage,
      loanTitle:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage
          ?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage
          ?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage
          ?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage
          ?.reasonLeftImageCopy,
      reasonLeftText2:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonLeftText2,
      reasonRightImage2:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonRightImage2,
      reasonRightText2:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonRightText2,
      reasonLeftImage2:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.reasonLeftImage2,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage
          ?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.commonConcerns,
      talkTitle:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.talkDescription,
      ratesTitle:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.transparentVacantLandMortgage?.ratesDescription,
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
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  reasonLeftText2: any;
  reasonRightText2: any;
  reasonLeftImage2: any;
  reasonRightImage2: any;
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

export default function NewTransparentVacantLandMortgage(props: MyProps) {
  const [key, setKey] = useState(null);

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
    reasonLeftTextCopy,
    reasonRightTextCopy,
    reasonLeftImageCopy,
    reasonRightImageCopy,
    reasonLeftText2,
    reasonRightText2,
    reasonLeftImage2,
    reasonRightImage2,
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
            buttonLeft={true}
            buttonText="GET APPROVED"
            buttonURL="/contact-us"
            button2Text="APPLY NOW"
            button2URL="/apply-now"
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

        {/* Reason Section */}
        <Container className="mb-5 px-3 py-3">
          <h2 className="text-center">{reasonTitle}</h2>
          <div
            className="text-center w-75 mx-auto"
            dangerouslySetInnerHTML={{
              __html: reasonDescription,
            }}
          ></div>

          {/* Reasons Content */}
          <div className="pt-12">
            <ServiceSection
              textLeft={reasonLeftText}
              textRight={reasonRightText}
              imageLeft={reasonLeftImage}
              imageRight={reasonRightImage}
              ctaText={serviceBannerData?.reasonCtaText}
              ctaUrl={serviceBannerData?.reasonCtaUrl}
            />
          </div>
        </Container>

        {/* Expert Help Section */}
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">
            {serviceBannerData?.expertsHelp?.expertsHelpTitle}
          </h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: serviceBannerData?.expertsHelp?.expertsHelpDescription,
            }}
          ></div>
        </Container>

        <ServiceSection
          textLeft={expertsHelpData?.helpLeftText}
          textRight={expertsHelpData?.helpRightText}
          imageLeft={expertsHelpData?.helpLeftImage}
          imageRight={expertsHelpData?.helpRightImage}
          ctaText={expertsHelpData?.expertsCtaText}
          ctaUrl={expertsHelpData?.expertCtaUrl}
        />

        {/* Why Choose Tab Section */}
        <Container className="mb-5 px-3 py-3">
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
        <Container>
          {serviceBannerData?.talkTitle && (
            <div
              className="my-20 p-6 talk-box"
              style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
            >
              <h2 className="text-center service-title">{talkTitle}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: talkDescription,
                }}
                className="text-lg text-center"
              ></div>

              {/* Talk CTA */}
              {serviceBannerData?.talkCtaText && (
                <div className="tb-btn">
                  <Link href={serviceBannerData?.talkCtaUrl || "/"}>
                    <Button className="HeadBtn">
                      {serviceBannerData?.talkCtaText}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* faq section start */}
          {serviceBannerData?.faqAccordion?.length > 0 && (
            <Container className="py-12">
              <h2 className="text-center">{serviceBannerData?.faqTitle}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.faqDescription,
                }}
                className="text-lg text-center"
              ></div>
              {/* question and answer */}
              {serviceBannerData?.faqAccordion?.length > 0 && (
                <Row className="renovation-tab-row">
                  <Tabs
                    id="controlled-tab-example"
                    activeKey={key == null ? 0 : key}
                    onSelect={(k) => setKey(k)}
                    className="mb-3 renovation"
                  >
                    {serviceBannerData?.faqAccordion?.map((tab, item) => {
                      return (
                        <Tab
                          key={item}
                          eventKey={item.toString()}
                          title={
                            <h3 className="location-tab-title">
                              {tab.question}
                            </h3>
                          }
                        >
                          <div
                            dangerouslySetInnerHTML={{
                              __html: tab.answer,
                            }}
                            className="renovation-content-list"
                          ></div>
                        </Tab>
                      );
                    })}
                  </Tabs>
                  {/* cta button */}
                </Row>
              )}
              {/* CTA */}
              {serviceBannerData?.faqCtaText && (
                <div className="tb-btn">
                  <Link href={serviceBannerData?.faqCtaUrl || "/"}>
                    <Button className="HeadBtn">
                      {serviceBannerData?.faqCtaText}
                    </Button>
                  </Link>
                </div>
              )}
            </Container>
          )}

          {/* Map Section */}
          <MapSection />
        </Container>

        {/* <Container
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
        </Container> */}

        {/* <HomeBuyerNewBC advisorData={borrowingProcessData} /> */}

        {/* <h2 className="text-center  ">{loanTitle}</h2>
        <hr
          style={{
            width: "350px",
            margin: "0 auto",
            border: "1.75px solid #F0B254",
            borderRadius: "10px",
          }}
          className="mb-5"
        /> */}
        {/* <ServiceSection
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
        /> */}

        {/* <AccordionNewBC homebuyerData={commonConcernsData} /> */}
        {/* <Container className="mb-5">
          <p className="text-center service-title">{talkTitle}</p>
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
        </Container> */}
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
