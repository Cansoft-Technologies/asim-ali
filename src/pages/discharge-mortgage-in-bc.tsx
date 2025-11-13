import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  Button,
  Col,
  Container,
  Row,
  Tab,
  Tabs,
} from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import MapSection from "components/MapSection";
import { se } from "date-fns/locale";
import { useState } from "react";
import TestimonialSliderRow from "components/TestimonialSliderRow";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4651 }) {
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
            dischargeMortgageBc {
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
              aboutCtaText
              aboutCtaUrl

              reasonTitle
              reasonDescription
              reasonCtaText
              reasonCtaUrl
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
              processTitle
              processDescription
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
              procecssCtaText
              processCtaUrl
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
              
              talkTitle
              talkDescription
              talkCtaText
              talkCtaUrl
              faqTitle
              faqDescription
              faqAccordion {
                question
                answer
              }
              faqCtaText
              faqCtaUrl
              author
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
      serviceBannerData: data?.pages?.nodes[0]?.dischargeMortgageBc,
      reasonTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonDescription,
      processTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.processTitle,
      processDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.processDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftImage,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.reasonLeftImageCopy,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.tabWhyChoose,
      talkTitle: data?.pages?.nodes[0]?.dischargeMortgageBc?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.dischargeMortgageBc?.talkDescription,
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
  processTitle: any;
  processDescription: any;
  reasonLeftText: any;
  reasonRightText: any;
  reasonLeftImage: any;
  reasonRightImage: any;
  reasonLeftTextCopy: any;
  reasonRightTextCopy: any;
  reasonLeftImageCopy: any;
  reasonRightImageCopy: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  talkTitle: any;
  talkDescription: any;
};

export default function DischargeMortgageBc(props: MyProps) {
  const [key, setKey] = useState(null);

  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    processTitle,
    processDescription,
    reasonDescription,
    reasonLeftText,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    reasonLeftTextCopy,
    reasonRightTextCopy,
    reasonLeftImageCopy,
    reasonRightImageCopy,
    tabWhyChooseData,
    talkTitle,
    talkDescription,
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

        {/* Service Section */}
        <Container className="mb-5 px-3 py-3">
          <h2 className="text-center">{processTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: processDescription,
            }}
          ></div>
          <ServiceSection
            textLeft={reasonLeftTextCopy}
            textRight={reasonRightTextCopy}
            imageLeft={reasonLeftImageCopy}
            imageRight={reasonRightImageCopy}
          />
          {/* CTA */}
          {serviceBannerData?.procecssCtaText && (
            <div className="tb-btn">
              <Link href={serviceBannerData?.processCtaUrl || "/"}>
                <Button className="HeadBtn">
                  {serviceBannerData?.procecssCtaText}
                </Button>
              </Link>
            </div>
          )}
        </Container>

        {/* Why Choose Us Section */}
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

        <Container className="mb-5">
          {/* Client Testimonial Section */}
          <TestimonialSliderRow />

          {/* Talk Section */}
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
                            <span className="location-tab-title">
                              {tab.question}
                            </span>
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

          {/* Author Information */}
          {serviceBannerData?.author && (
            <Row className="author-information my-24">
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.author,
                }}
              ></div>
            </Row>
          )}
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
