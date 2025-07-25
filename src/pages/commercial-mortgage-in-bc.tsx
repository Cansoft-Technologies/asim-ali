import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSectionNewBC from "components/ServiceSectionNewBC";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row, Button } from "react-bootstrap";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import ClientReviews from "components/ClientReviews";
import OurLenders from "components/OurLenders";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4223 }) {
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
            NewComBC {
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
              mortgageType
              mortgageDescription
              featuredTextLeft
              featuredTextRight
              featuredLeftText
              featuredImageRight {
                altText
                sourceUrl
              }
              featuredImageLeft {
                altText
                sourceUrl
              }
              featuredLeftImage {
                altText
                sourceUrl
              }
              mortgageServiceSection {
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
              benefitTitle
              benefitDescription
              tipsLeftText
              tipsRightText
              tipsTextLeft
              tipsImageRight {
                altText
                sourceUrl
              }
              tipsImageLeft {
                altText
                sourceUrl
              }
              tipsRightImage {
                altText
                sourceUrl
              }
              homebuyerSection {
                advisorTitle
                advisorDescription
                advisorImage {
                  sourceUrl
                  altText
                }
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
                tabDescription
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
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      advisorData: data?.pages?.nodes[0]?.NewComBC?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewComBC,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewComBC?.mortgageBenifits,
      mortgageInterestData: data?.pages?.nodes[0]?.NewComBC?.mortgageInterest,
      mortgageServiceData:
        data?.pages?.nodes[0]?.NewComBC?.mortgageServiceSection,
      mortgageType: data?.pages?.nodes[0]?.NewComBC?.mortgageType,
      mortgageDescription: data?.pages?.nodes[0]?.NewComBC?.mortgageDescription,
      featuredTextLeft: data?.pages?.nodes[0]?.NewComBC?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewComBC?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewComBC?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewComBC?.featuredTextRight,
      featuredLeftText: data?.pages?.nodes[0]?.NewComBC?.featuredLeftText,
      featuredLeftImage: data?.pages?.nodes[0]?.NewComBC?.featuredLeftImage,
      contactData: data?.pages?.nodes[0]?.NewComBC?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewComBC?.tabRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewComBC?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewComBC?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewComBC?.tipsDescription,
      benefitTitle: data?.pages?.nodes[0]?.NewComBC?.benefitTitle,
      reviewSection: data?.pages?.nodes[0]?.NewComBC?.reviewSection,
      benefitDescription: data?.pages?.nodes[0]?.NewComBC?.benefitDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewComBC?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewComBC?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewComBC?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewComBC?.tipsImageLeft,
      tipsTextLeft: data?.pages?.nodes[0]?.NewComBC?.tipsTextLeft,
      tipsRightImage: data?.pages?.nodes[0]?.NewComBC?.tipsRightImage,
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
  mortgageType: any;
  mortgageDescription: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  featuredLeftText: any;
  featuredLeftImage: any;
  mortgageServiceData: any;
  tipsImageRight: any;
  tipsTitle: any;
  tipsDescription: any;
  benefitTitle: any;
  benefitDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  tipsTextLeft: any;
  tipsRightImage: any;
  mortgageBenefitsData: any;
  homebuyerSectionData: any;
  serviceBannerData: any;
  reviewSection: any;
  advisorData: any;
  mortgageInterestData: any;
};

export default function NewCommercialMortgageBC(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    contactData,
    tabRenovationData,
    mortgageType,
    mortgageDescription,
    featuredTextLeft,
    featuredImageLeft,
    featuredImageRight,
    featuredTextRight,
    featuredLeftText,
    featuredLeftImage,
    mortgageServiceData,
    tipsImageRight,
    tipsLeftText,
    tipsRightText,
    tipsDescription,
    tipsTitle,
    tipsImageLeft,
    tipsTextLeft,
    tipsRightImage,
    homebuyerSectionData,
    serviceBannerData,
    advisorData,
    mortgageBenefitsData,
    benefitTitle,
    reviewSection,
    benefitDescription,
    mortgageInterestData,
  } = props;

  //   console.log(settings);
  const teamTitle =
    '<h2 style="font-size: 40px;">Lenders<span style="color: #f0b243;"> We Work with </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">We have collaborated with more than 300 lenders so that you can have more options at hand. Let’s take a look at some of the lenders we've worked with:
</span></p>\n` + "";

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
                  <Button className="HeadBtn">Secure Your Financing</Button>
                </Link>
              </div>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.aboutImage?.sourceUrl}
                alt={serviceBannerData?.aboutImage?.altText}
                width="390"
                height="400"
                sizes="100vw"
                style={{
                  width: "100%",
                  height: "auto",
                }}
                quality={100}
              />
            </Col>
          </Row>
        </Container>
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{benefitTitle}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: benefitDescription,
            }}
          ></div>
        </Container>
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        {/* Types of Mortgage */}
        <div className="tb-btn mb-4">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">Start Your Pre-Assessment Now</Button>
          </Link>
        </div>
        <Container
          className="mb-5 px-3 py-3"
          style={{ border: "1px solid #f0b254", borderRadius: "10px" }}
        >
          <h2 className="text-center">{mortgageType}</h2>
          <div
            className="text-center"
            dangerouslySetInnerHTML={{
              __html: mortgageDescription,
            }}
          ></div>
        </Container>
        <ServiceSectionNewBC
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
          leftText={featuredLeftText}
          leftImage={featuredLeftImage}
        />
        <div className="tb-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">Secure The Best Rates Today</Button>
          </Link>
        </div>
        <OurLenders title={teamTitle} description={teamDescription} />
        <TabNewBC tabData={tabRenovationData} />
        <div className="tb-btn">
          <Link href={"/current-rates"}>
            <Button className="HeadBtn">Check Our Current Rates </Button>
          </Link>
        </div>
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
        <ServiceSectionNewBC
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
          leftText={tipsTextLeft}
          leftImage={tipsRightImage}
        />
        <div className="tb-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">Partner With Our Expert Team</Button>
          </Link>
        </div>
        {/* <HomeBuyerNewBC advisorData={mortgageServiceData} /> */}
        {/* <AccordionNewBC homebuyerData={homebuyerSectionData} /> */}
        <ClientReviews reviews={reviewSection} />
        <Container className="mb-5 mt-5 px-3 py-3">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-start"
          ></div>
        </Container>
        <div className="tb-btn mb-6">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">
              Fund Your Next Business Project Now
            </Button>
          </Link>
        </div>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
