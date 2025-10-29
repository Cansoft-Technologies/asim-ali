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

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
 {
  pages(where: {id: 5979}) {
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
        aboutBtn
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
        reasonLeftCta
        reasonRightText
        reasonLeftImage {
          altText
          sourceUrl
        }
        reasonRightImage {
          altText
          sourceUrl
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
          cta
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
  menus(where: {location: PRIMARY}) {
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
      reasonLeftCta: data?.pages?.nodes[0]?.NewVancouver?.reasonLeftCta,
      reasonRightImage: data?.pages?.nodes[0]?.NewVancouver?.reasonRightImage,
      reasonRightText: data?.pages?.nodes[0]?.NewVancouver?.reasonRightText,
      reasonLeftImage: data?.pages?.nodes[0]?.NewVancouver?.reasonLeftImage,
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
  reasonLeftCta:any
  reasonRightImage: any;
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
    reasonLeftCta,
    reasonRightImage,
    reasonRightText,
    reasonLeftImage,
  } = props;



  const teamTitle =
    '<h2 style="font-size: 40px;">Why Our Clients <span style="color: #f0b243;"> Trust Us </span></h2>\n' +
    "";
  const teamDescription =
    `<p><span style="font-weight: 400;">We have collaborated with more than 300 lenders so that you can have more options at hand. Let’s take a look at some of the lenders we've worked with:
</span></p>\n` + "";
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
        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={7}>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.aboutText,
                }}
              ></div>
              <div className="tb-btn-left"
              dangerouslySetInnerHTML={{
                __html: serviceBannerData?.aboutBtn
              }}
              >
            
                
              </div>
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
      <div className="tb-btn"> <Link href={"/apply-now"}>
        <Button className="HeadBtn">{contactData?.cta}</Button>
          </Link>
        </div>

        <MortgageAdvisor advisorData={mortgageBenefitsData} />


        <div className="tb-btn mb-4">
          <Link href={"https://asimali.ca/current-rates"}>
            <Button className="HeadBtn">{advisorData?.cta}</Button>
          </Link>
        </div>

        <OurRates title={rateTitle} />
        <div className="tb-btn">
          <Link href={"/apply-now"}>
            <Button className="HeadBtn">Craft Your Perfect Loan</Button>
          </Link>
        </div>

        <OurLenders title={teamTitle} description={teamDescription} />

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
        />


        {reasonLeftCta && (
          <div 
            className="tb-btn"
            dangerouslySetInnerHTML={{
              __html: reasonLeftCta,
            }}
          ></div>
        )}

        {/* <ClientReviews reviews={reviewSection} /> */}


        {/* <AccordionSection advisorData={mortgageInterestData} /> */}
        <Container className="mb-5 mt-5">
          <h2 className="text-center service-title">{contactData?.title}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className=""
          ></div>

          {/* <div className="tb-btn">
            <Link href={"/apply-now"}>
              <Button className="HeadBtn">
              Request a Free Consultation
              </Button>
            </Link>
          </div> */}

        </Container>
        
        {/* added map section here */}

        <MapSection />

      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
