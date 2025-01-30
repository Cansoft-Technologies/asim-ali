import { gql } from "@apollo/client";
import { FAQ, Team } from "components";
import CategoryTabs from "components/CatagoryTabs";
import ContactSection from "components/ContactSection";
import FeaturedTab from "components/FeaturedTab";
import LocationHero from "components/LocationHero";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import ClientReviews from "components/ClientReviews";
import OurLenders from "components/OurLenders";
import OurRates from "components/OurRates";

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
faqSection {
            hideSection
            faqTitle
            faqSubitle
            faqImage {
              altText
              sourceUrl
            }
            faqAccordion {
              question
              answer
            }
          }
          planSection {
            planTitle
            linkUrls {
              linkText
              url
            }
          }
          reviewSection {
            reviewTitle
            reviewDescription
            reviewCard{
              author
              reviewText
              clientImage{
                sourceUrl
                altText
              }
            }
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
        faqData: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.faqSection,
      planSection:
        data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.planSection,
      reviewSection: data?.pages?.nodes[0]?.mortgageBrokerBurnaby?.reviewSection,
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
  faqData: any;
  planSection: any;
  reviewSection: any;
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
    faqData,
    planSection,
    reviewSection,
  } = props;

  const teamTitle =
  '<h2 style="font-size: 40px;">Lenders <span style="color: #f0b243;">We Work With </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;"></span></p>\n` +
  "";
  const rateTitle = `
<h2>Current Mortgage Rates in Burnaby</h2>
<p></p>`;
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
                  <Button className="HeadBtn">Book Your Meeting With Our Mortgage Experts</Button>
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="200"
                
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
              <Button className="HeadBtn">Loan Options</Button>
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

        
        <FeaturedTab tabData={tabWhyChooseData} />
        <OurLenders title={teamTitle} description={teamDescription} />
        <ClientReviews reviews={reviewSection} />
        <FAQ faqsections={faqData} />
        <CategoryTabs planData={planSection} />
        <OurRates title={rateTitle} />
        <Container className="mt-5">
          <h2 className="text-center service-title">{talkTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
          <div className="mt-5">
            <ContactSection />
          </div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
