import { gql } from '@apollo/client';
import AccordionSection from 'components/AccordionSection';
import LocationHero from 'components/LocationHero';
import MortgageAdvisor from 'components/MortgageAdvisor';
import OurLenders from 'components/OurLenders';
import OurRates from 'components/OurRates';
import ServiceSection from 'components/ServiceSection';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apolloClient } from "../lib/apollo";




export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
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
            advisorCards{
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
      teamData: data?.pages?.nodes[0]?.NewVancouver?.teamSection,
      advisorData: data?.pages?.nodes[0]?.NewVancouver?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewVancouver,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewVancouver?.mortgageBenifits,
      mortgageInterestData: data?.pages?.nodes[0]?.NewVancouver?.mortgageInterest,
      featuredTextLeft: data?.pages?.nodes[0]?.NewVancouver?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewVancouver?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewVancouver?.featuredImageRight,
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
    revalidate: 60
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
  tipsImageRight  : any;
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
  const { settings, mainMenus, metaData,contactData,tabRenovationData, featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,mortgageServiceData,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,serviceBannerData,advisorData,mortgageBenefitsData,teamData,mortgageInterestData } = props;

  const teamTitle =
  '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Mortgage Lenders </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">We partner with a vast network of over 100 lenders, each offering diverse mortgage products and services. This wide selection enables us to match you with the perfect lender, considering your specific financial situation and goals. Our extensive connections include major banks, credit unions, and specialty finance companies, ensuring we have the flexibility to find the most advantageous rates and terms for you.
</span></p>\n` +
  "";
  const rateTitle = `
<h2>Our Current Mortgage Rates Aldergrove East, BC​</h2>
<p>Discover competitive rates designed to fit your budget and financial goals.</p>

`;
  return (
    <>
      <Head>
        {metaData?.map((meta,index) => {

          return (
            <Fragment key={index}>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
            </Fragment>
          )
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
                    <div className="tb-btn-left">
                    <Link href={"/apply-now"}>
                      <Button className="HeadBtn">
                      Apply for Yours!
                      </Button>
                    </Link>
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
                <OurRates title={rateTitle} />
        <Container className="mb-5 px-3 py-3 my-5" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {tipsTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: tipsDescription,
                      }}
                    ></div>
                  </Container>
        <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
        <MortgageAdvisor advisorData={mortgageBenefitsData}/>
        <OurLenders title={teamTitle} description={teamDescription} />
        <AccordionSection advisorData={mortgageInterestData}/>
        <Container className="mb-5 mt-5">
        <p className="text-center service-title">{contactData?.title}</p>
        <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-center"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
