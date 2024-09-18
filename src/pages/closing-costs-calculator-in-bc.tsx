import { gql } from '@apollo/client';
import { Hero, Team } from 'components';
import AccordionSection from 'components/AccordionSection';
import FlexibilityTab from 'components/FlexibilityTab';
import MortgageAdvisor from 'components/MortgageAdvisor';
import ServiceSection from 'components/ServiceSection';
import Head from 'next/head';
import Image from 'next/image';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
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
      pages(where: {id: 6150}) {
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

  const tableDescription = `<b>Closing costs are the various fees and expenses that homebuyers must pay before finalizing the purchase of a property.</b><span style="font-weight: 400;"> These costs go beyond the price of the home itself and can add up to a significant amount, often ranging from 1.5% to 4% of the property's purchase price.</span>

<i><span style="font-weight: 400;">For example, if you're buying a home in British Columbia for $500,000, your closing costs could be anywhere between $7,500 and $20,000.</span></i>

<span style="font-weight: 400;">Gathering all the information and going through the process can be a hassle. Contact Asim Ali and leave the rest to us!</span>`;
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
                <Container className="mb-5 px-3 py-3 my-5" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                    What Are Closing Costs? Know How You Can Save Money!
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: tableDescription,
                      }}
                    ></div>
                  </Container>
                  <Container>
                  <div className="info-table-container">
      <Table striped bordered hover className="info-table">
        <thead>
          <tr>
            <th>Information</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Information">Property Price</td>
            <td data-label="Description">The purchase price of the home</td>
          </tr>
          <tr>
            <td data-label="Information">Down Payment</td>
            <td data-label="Description">The amount you’re putting down upfront</td>
          </tr>
          <tr>
            <td data-label="Information">Mortgage Details</td>
            <td data-label="Description">The interest rate and term length of your mortgage</td>
          </tr>
          <tr>
            <td data-label="Information">Additional Costs</td>
            <td data-label="Description">Any other fees you expect to pay, such as legal fees, inspection fees, or title insurance</td>
          </tr>
        </tbody>
      </Table>
    </div>
                  </Container>
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
        <section className="my-5">
      <div className="service-row">
        <Container>
          <Row>
            <Col className="service-texts" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: tipsLeftText,
                }}
              ></div>
            </Col>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={tipsImageRight?.sourceUrl}
                  alt={tipsImageRight?.altText}
                  width="390"
                  height="400"
                  style={{ width: "100%", objectFit: "cover", height: "45vh" }}
                  quality={100}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <MortgageAdvisor advisorData={mortgageBenefitsData}/>
      <div className="service-row my-5">
        <Container>
          <Row className="">
            <Col className="service-texts mb-5" lg={6}>
              <div
                className="service-content"
                dangerouslySetInnerHTML={{
                  __html: tipsRightText,
                }}
              ></div>
            </Col>
            <Col className="service-texts" lg={6}>
              <div className="service-image">
                <Image
                  src={tipsImageLeft?.sourceUrl}
                  alt={tipsImageLeft?.altText}
                  width="390"
                  height="400"
                  style={{ width: "100%", objectFit: "cover", height: "45vh" }}
                  quality={100}
                />
              </div>
            </Col>
            
          </Row>
        </Container>
      </div>
    </section>
        <>
    <section className="split_section mt-5 d-none d-md-block">
      <Container>
      <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-center service-title"
            ></div>
            <h3 className="advisor-title text-center">
              {advisorData?.advisorDescriptionTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="text-center"
            ></div>
        <Row>
          <Col lg={6}>
            <div className="split_image mt-5">
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
                  <h3 className="advisor-title">{data.title}</h3>
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
      <Container>
      <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorTitle,
              }}
              className="text-center service-title"
            ></div>
            <h3 className="advisor-title text-center">
              {advisorData?.advisorDescriptionTitle}
            </h3>
            <div
              dangerouslySetInnerHTML={{
                __html: advisorData?.advisorDescriptionTop,
              }}
              className="text-center"
            ></div>
        <Row>
        <Col lg={6}>
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
                  <h3 className="advisor-title">{data.title}</h3>
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
