import { gql } from "@apollo/client";
import { Hero } from "components";
import AccordionNewBC from "components/AccordionNewBC";
import BorrowingPayment from "components/BorrowingPayment";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import Head from "next/head";
import Image from "next/image";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 4380}) {
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
        newConstructionFinancing {
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
          processBorrowing {
            advisorTitle
            advisorDescriptionTop
            advisorCards{
              title
              description
            }
          }
          borrowingPayment{
            borrowingTitle
            borrowingDescriptionTop
            borrowingRightDescription
            borrowingImage {
              sourceUrl
              altText
            }
          }
          expertsHelp{
            expertsHelpTitle
            expertsHelpDescription
            helpLeftText
            helpRightText
            helpLeftImage{
                sourceUrl
                altText
            }
            helpRightImage{
                sourceUrl
                altText
            }    
          }
          ratesTitle
          ratesDescription
          
          tabWhyChoose{
            tabHeading
            tabDescription
            tabDetails{
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

          qualifyingTitle
          qualifyingDescription
          commonConcerns {
            advisorTitle
            advisorDescription
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
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

    menus(where: {location: PRIMARY}) {
      nodes {
        name
        slug
        menuItems(first: 50){
          nodes {
            url
            target
            parentId
            label
            cssClasses
            description
            id
            childItems (first: 50) {
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
      serviceBannerData: data?.pages?.nodes[0]?.newConstructionFinancing,
      reasonTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonDescription,
      reasonLeftText:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightImage,
      reasonRightText:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightText,
      reasonLeftImage:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftImage,
      loanTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.loanTitle,
      reasonLeftTextCopy:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftTextCopy,
      reasonRightImageCopy:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightImageCopy,
      reasonRightTextCopy:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonRightTextCopy,
      reasonLeftImageCopy:
        data?.pages?.nodes[0]?.newConstructionFinancing?.reasonLeftImageCopy,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.borrowingPayment,

      expertsHelpData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.expertsHelp,
      tabWhyChooseData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.processBorrowing,
      qualifyingTitle:
        data?.pages?.nodes[0]?.newConstructionFinancing?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.newConstructionFinancing?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.talkTitle,
      talkDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.talkDescription,
      ratesTitle: data?.pages?.nodes[0]?.newConstructionFinancing?.ratesTitle,
      ratesDescription:
        data?.pages?.nodes[0]?.newConstructionFinancing?.ratesDescription,
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

export default function NewConstructionFinancing(props: MyProps) {
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
        {metaData?.map((meta,index) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
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
                priority={true}
                style={{ width: "100%", objectFit: "cover" }}
              />
            </Col>
          </Row>
        </Container>
        <Container
          className="mb-5 px-3 py-3"
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

        <BorrowingPayment borrowingPaymentData={borrowingPaymentData} />
        <Container className="mt-5" style={{ border: '1px solid #dee2e6', borderRadius: '5px', padding: '15px' }}>
        <Table striped bordered hover>
      <thead>
        <tr>
          <th>Draw Stage</th>
          <th>Required Building Completion</th>
          <th>Construction Stage</th>
          <th>% of Total Mortgage Amount Advanced</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1st Draw (Optional)</td>
          <td><strong>15% complete</strong></td>
          <td>Excavation and foundation complete</td>
          <td>15%</td>
        </tr>
        <tr>
        <td>2nd Draw</td>
        <td><strong>40% complete</strong></td>
        <td>Rooftop is on, the building is weather-protected (i.e. airtight, access secured)</td>
        <td>25%</td>
        </tr>
        <tr>
        <td>3rd Draw</td>
        <td><strong>65% complete</strong></td>
        <td>Plumbing and wiring is started, plaster/ drywall is complete, furnace installed, exterior wall cladding complete, etc.</td>
          <td>20%</td>
        </tr>
        <tr>
        <td>4th Draw</td>
        <td><strong>65% complete</strong></td>
        <td>Kitchen cupboards installed, bathroom completed, doors have been hung, etc.</td>
          <td>20%</td>
        </tr>
        <tr>
        <td>5th Draw</td>
        <td><strong>100% complete</strong></td>
        <td>Ready for occupancy with seasonal and exterior work completed</td>
        <td>15%</td>
        </tr>
      </tbody>
    </Table>
        </Container>
    <Container>
    <div className="mt-4 row">
                <Col lg={10} className="offset-lg-1 px-0">
                  <Alert variant="info">
                    <div className="meeting_text">
                      <p className="">
                        Please Note: Rates you see may change, and the rate you
                        get from any bank or lender, or whether you’re approved
                        or not, depends on your situation. The rates you see are
                        just estimates and might not be exact. It’s best to talk
                        to us for the most accurate info and to find out if you
                        qualify.
                      </p>
                    </div>
                  </Alert>
                </Col>
              </div>
    </Container>

        {/* <Container>
          <Row
            className="mortgage-broker text-center"
            style={{ marginTop: "80px" }}
          >
            <Col>
              <h2 className="headering-title">
                {expertsHelpData?.expertsHelpTitle}
              </h2>
              <p className="service-content">
                {expertsHelpData?.expertsHelpDescription}
              </p>
            </Col>
          </Row>
        </Container> */}
        <ServiceSection
          textLeft={expertsHelpData?.helpLeftText}
          textRight={expertsHelpData?.helpRightText}
          imageLeft={expertsHelpData?.helpLeftImage}
          imageRight={expertsHelpData?.helpRightImage}
        />
        <AccordionNewBC homebuyerData={commonConcernsData} />

        <Container
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
        </Container>

        <ServiceSection
          textLeft={reasonLeftText}
          textRight={reasonRightText}
          imageLeft={reasonLeftImage}
          imageRight={reasonRightImage}
        />

        {/* <TabNewBC tabData={tabWhyChooseData} />
        <HomeBuyerNewBC advisorData={borrowingProcessData} /> */}

        {/* <h2 className="text-center  ">{loanTitle}</h2>
        <hr
          style={{
            width: "350px",
            margin: "0 auto",
            border: "1.75px solid #F0B254",
            borderRadius: "10px",
          }}
          className="mb-5"
        />
        <ServiceSection
          textLeft={reasonLeftTextCopy}
          textRight={reasonRightTextCopy}
          imageLeft={reasonLeftImageCopy}
          imageRight={reasonRightImageCopy}
        /> */}
        <Container className="mb-5">
          <h2 className="text-center service-title">{talkTitle}</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
