import { gql } from "@apollo/client";
import { Hero } from "components";
import FlexibilityTab from "components/FlexibilityTab";
import HomeBuyerSection from "components/HomeBuyerSection";
import MortgageAdvisor from "components/MortgageAdvisor";
import ServiceSection from "components/ServiceSection";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row, Table } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3814}) {
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
        NewUninsured {
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
              shortText
              shortImage {
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
          serviceRightText
          serviceLeftText
          serviceImageRight {
            altText
            sourceUrl
          }
          serviceImageLeft {
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
          homebuyerSection {
            advisorTitle
            advisorCards{
              title
              description
              image{
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
            advisorCards{
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
            advisorCards{
              title
              description
            }
          }
          tabRenovation{
            tabHeading
            tabDetails{
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

    menus(where: {location: PRIMARY}) {
      nodes {
        name
        slug
        menuItems(first: 150){
          nodes {
            url
            target
            parentId
            label
            cssClasses
            description
            id
            childItems (first: 150) {
              nodes {
                uri
                label
              }
            }
          }
        }
      }
    }
}`,
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
      serviceLeftText: data?.pages?.nodes[0]?.NewUninsured?.serviceLeftText,
      serviceRightText: data?.pages?.nodes[0]?.NewUninsured?.serviceRightText,
      serviceImageLeft: data?.pages?.nodes[0]?.NewUninsured?.serviceImageLeft,
      serviceImageRight: data?.pages?.nodes[0]?.NewUninsured?.serviceImageRight,
      advisorData: data?.pages?.nodes[0]?.NewUninsured?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewUninsured,
      mortgageBenefitsData:
        data?.pages?.nodes[0]?.NewUninsured?.mortgageBenifits,
      featuredTextLeft: data?.pages?.nodes[0]?.NewUninsured?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewUninsured?.featuredImageLeft,
      featuredImageRight:
        data?.pages?.nodes[0]?.NewUninsured?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewUninsured?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewUninsured?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.NewUninsured?.tabRenovation,
      homebuyerSectionData:
        data?.pages?.nodes[0]?.NewUninsured?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewUninsured?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewUninsured?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewUninsured?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewUninsured?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewUninsured?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewUninsured?.tipsImageLeft,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  serviceLeftText: any;
  serviceRightText: any;
  serviceImageLeft: any;
  serviceImageRight: any;
  mainMenus: any;
  metaData: any;
  contactData: any;
  tabRenovationData: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
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

export default function NewUninsured(props: MyProps) {
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
    serviceLeftText,
    serviceRightText,
    serviceImageLeft,
    serviceImageRight,
  } = props;

  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {
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
        <MortgageAdvisor advisorData={mortgageBenefitsData} />
        <Container className="mb-5">
          <Row className="coquitlam-grid my-5">
            <Col md={7}>
              <div
                dangerouslySetInnerHTML={{
                  __html: serviceBannerData?.shortText,
                }}
              ></div>
            </Col>
            <Col md={5}>
              <Image
                src={serviceBannerData?.shortImage?.sourceUrl}
                alt={serviceBannerData?.shortImage?.altText}
                width="390"
                height="400"
                
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
        <ServiceSection
          textLeft={featuredTextLeft}
          textRight={featuredTextRight}
          imageLeft={featuredImageLeft}
          imageRight={featuredImageRight}
        />
        <FlexibilityTab tabData={tabRenovationData} />
        <MortgageAdvisor advisorData={advisorData} />
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
        <Container
          className="mb-5 py-3 my-5"
          style={{ border: "1px solid #000000", borderRadius: "10px" }}
        >
          <div style={{ border: '1px solid #dee2e6', borderRadius: '5px', marginBottom: '15px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Criteria</th>
              <th>Insured Mortgages</th>
              <th>Uninsured Mortgages</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Insurance Coverage</td>
              <td>Backed by government or private insurance.</td>
              <td>No mortgage insurance.</td>
            </tr>
            <tr>
              <td>Down Payment</td>
              <td>Lower down payment requirements (e.g., 5% in Canada).</td>
              <td>Requires a larger down payment (typically 20% or more).</td>
            </tr>
            <tr>
              <td>Interest Rates</td>
              <td>Generally lower due to insurance coverage.</td>
              <td>Slightly higher due to increased lender risk.</td>
            </tr>
            <tr>
              <td>Eligibility Criteria</td>
              <td>More lenient for credit scores and down payments.</td>
              <td>Stricter requirements for credit and income stability.</td>
            </tr>
            <tr>
              <td>Loan Limits</td>
              <td>Limited by government or insurer guidelines.</td>
              <td>No specific loan limits.</td>
            </tr>
            <tr>
              <td>Cost of Insurance</td>
              <td>Premiums are added to monthly payments.</td>
              <td>No insurance costs.</td>
            </tr>
            <tr>
              <td>Property Type</td>
              <td>Restrictions on property types (e.g., primary residence).</td>
              <td>More flexibility in financing different property types.</td>
            </tr>
          </tbody>
        </Table>
      </div>
        </Container>

        {/* <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        /> */}
        {/* <ServiceSection
          textLeft={serviceLeftText}
          textRight={serviceRightText}
          imageLeft={serviceImageLeft}
          imageRight={serviceImageRight}
        /> */}
        
        <HomeBuyerSection homebuyerData={homebuyerSectionData} />
        <Container className="mb-5">
          <p className="text-center service-title">{contactData?.title}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-start"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
