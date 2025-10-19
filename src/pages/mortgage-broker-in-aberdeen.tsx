import { gql } from '@apollo/client';
import { Hero, Team } from 'components';
import AccordionSection from 'components/AccordionSection';
import FlexibilityTab from 'components/FlexibilityTab';
import MortgageAdvisor from 'components/MortgageAdvisor';
import ServiceSection from 'components/ServiceSection';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apolloClient } from "../lib/apollo";
import { Fragment } from 'react';
import Link from 'next/link';
import ContactSection from 'components/ContactSection';
import OurRates from 'components/OurRates';
import OurLenders from 'components/OurLenders';
import LocationHero from 'components/LocationHero';
import AberdeenOurRates from 'components/mortgage-broker-in-aberdeen/AberdeenOurRates';
import AberdeenMortgageAdvisor from 'components/mortgage-broker-in-aberdeen/AberdeenMortgageAdvisor';
import AberdeenAccordionSection from 'components/mortgage-broker-in-aberdeen/AberdeenAccordianSection';
import AberdeenServiceSection from 'components/mortgage-broker-in-aberdeen/AberdeenServiceSection';
import FeaturedTab from 'components/FeaturedTab';




export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 7452}) {
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
          tipsTitleTwo
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
            advisorDescriptionBottom
            
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

  // console.log("checking data",data)
  // const tipsTitleTwo = data?.pages?.nodes[0]?.NewVancouver?.tipsTitleTwo;

  
  console.log("checking data ",data)


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
      mortgageInterestDataHeader: data?.pages?.nodes[0]?.NewVancouver?.tipsTitleTwo,
      
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
  mortgageInterestDataHeader:any
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, metaData,contactData,tabRenovationData, featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,mortgageServiceData,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,serviceBannerData,advisorData,mortgageBenefitsData,teamData,mortgageInterestData ,mortgageInterestDataHeader} = props;

  const teamTitle =
  '<h2 style="font-size: 40px;">Client <span style="color: #f0b243;">Testimonial </span>: See What Our Happy Clients Say</h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">We make sure that all our clients get what they are looking for. Take a look at our client testimonial:</span></p>\n` +
  "";
  const rateTitle = `
<h2>Current Mortgage Rates</h2>
<p>Knowing about the current rates will <a href="/mortgage-payment-calculator"></a> help you select the best options for you. Here are the best current rates that you will have from our <strong>mortgage specialists</strong>:
</p>

  console.log("tips title two",tipsTitleTwo)


`;
  return (
    <>
      <Head>
        {/* No-index robot meta tags */}
        {/* <meta name="robots" content="noindex, nofollow" />
        */}

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
                null
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
                      Call Mortgage Broker in Aberdeen
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
                      
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                </Container>



        <Container className="mb-5 px-3 md:py-3 my-5" style={{ borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {tipsTitle}
                    </h2>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: tipsDescription,
                      }}
                    ></div>
                  </Container>

          <FeaturedTab 
          tabData={tabRenovationData}
          />


        <AberdeenServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}   header={mortgageInterestDataHeader}/>

                  

{/* Current Mortgage Rates */}
        <AberdeenOurRates title={rateTitle} />
          

          {/* testimonial section */}

        <OurLenders title={teamTitle} description={teamDescription} />


      


     

                        {/* {console.log("mortgageInterestDataHeader",mortgageInterestDataHeader)} */}

                        {/* {console.log("checking",mortgageInterestDataHeader )} */}

        <AberdeenAccordionSection  advisorData={mortgageInterestData}  />
       
       
{/* 
        <Container className="mb-5 mt-5">
        <h2 className="text-center service-title">{contactData?.title}</h2>
        <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-center"
          ></div>
        </Container> */}
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
