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




export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 6149}) {
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
  '<h2 style="font-size: 40px;">Our <span style="color: #f0b243;">Lenders </span></h2>\n' +
  "";
const teamDescription =
  `<p><span style="font-weight: 400;">To ensure you get the best mortgage solution possible, we've formed partnerships with over 100 lenders. This broad network allows us to offer multiple options to perfectly suit your needs and budget.
</span></p>\n` +
  "";
  const rateTitle = `
<h2>Our Rates</h2>
<p>Discover competitive and flexible rates tailored to fit your financial situation, ensuring you receive a deal that best supports your home-buying ambitions.
</p>

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
        <Header settings={settings} mainMenus={mainMenus} />
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
                      <Button className="HeadBtn">
                      Secure Your Space!
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
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                </Container>
                <MortgageAdvisor advisorData={mortgageBenefitsData}/>
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
                    <div className="tb-btn">
                    <Link href={"/apply-now"}>
                      <Button className="HeadBtn">
                      Start Your Financing Journey Today!
                      </Button>
                    </Link>
                  </div>
                  </Container>
        <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
        <ServiceSection
          textLeft={tipsLeftText}
          textRight={tipsRightText}
          imageLeft={tipsImageLeft}
          imageRight={tipsImageRight}
        />
        <>
    <section className="split_section mt-5 d-none d-md-block">
      <Container>
        <Row>
          <Col lg={6}>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-start service-title"
            ></div>
            <h3 className="advisor-title">
              {advisorData?.advisorDescriptionTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className=""
            ></div>
            <div className="split_image">
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                width="390"
                      height="400"
                alt={advisorData?.advisorImage?.altText}
                priority={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
              />
            </div>
          </Col>
          <Col lg={6}>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-0">
                  <h4 className="advisor-title">{data.title}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                    className="renovation-content-list"
                  ></div>
                </div>
              );
            })}
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionBottom,
              }}
              className="service-description"
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="split_section mt-5 d-block d-md-none ">
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
        <Col lg={6}>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-start service-title"
            ></div>
            <h3 className="advisor-title">
              {advisorData?.advisorDescriptionTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className=""
            ></div>
            <div className="split_image justify-content-sm-center">
              <Image
                src={advisorData?.advisorImage?.sourceUrl}
                width="390"
                      height="400"
                alt={advisorData?.advisorImage?.altText}
                priority={true}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                      quality={100}
              />
            </div>
          </Col>
        <Col lg={6}>
            {advisorData?.advisorCards?.map((data, item) => {
              return (
                <div key={item} className="split_text mb-0 text-center">
                  <h4 className="advisor-title">{data.title}</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: data.description,
                    }}
                    className="renovation-content-list"
                  ></div>
                </div>
              );
            })}
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionBottom,
              }}
              className="service-description"
            ></div>
          </Col>
        </Row>
      </Container>
    </section>
    </>
        <AccordionSection advisorData={mortgageInterestData}/>
        <Container className="mb-5 mt-5">
        <h2 className="text-center service-title">{contactData?.title}</h2>
        <div
            dangerouslySetInnerHTML={{
              __html: contactData?.description,
            }}
            className="text-lg text-center"
          ></div>
          <div className="tb-btn">
                    <Link href={"/contact-us"}>
                      <Button className="HeadBtn">
                      Contact Us
                      </Button>
                    </Link>
                  </div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}