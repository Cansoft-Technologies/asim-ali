import { gql } from "@apollo/client";
import { Hero } from "components";
import { Button } from "components/ui/button";
import AccordionNewBC from "components/AccordionNewBC";
import BorrowingPayment from "components/BorrowingPayment";
import HomeBuyerNewBC from "components/HomeBuyerNewBC";
import ServiceSection from "components/ServiceSection";
import TabNewBC from "components/TabNewBC";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import Link from "next/link";
import TestimonialSlider from "components/homepage/testimonial-slider";
import TestimonialSliderRow from "components/TestimonialSliderRow";
const CTA = dynamic(() => import("../components/CTA"));
const Banner = dynamic(() => import("../components/Banner"));
const WeHelp = dynamic(() => import("../components/WeHelp"));
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const PartnerLogo = dynamic(() => import("components/PartnerLogo"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
const FAQ = dynamic(() => import("components/FAQ"));
const Gallery = dynamic(() => import("components/Gallery"));
const FlexabilitySlider = dynamic(() => import("components/FlexabilitySlider"));

const MobileBanner = dynamic(() => import("components/MobileBanner"));
const locations = [
  {
    name: "Abbotsford",
    top: 75,
    left: 25,
    url: "/mortgage-broker-in-abbotsford",
  },
  {
    name: "Aberdeen",
    top: 40,
    left: 30,
    url: "/mortgage-broker-in-aberdeen",
  },
  {
    name: "Aldergrove East",
    top: 78,
    left: 28,
    url: "/aldergrove-east-mortgage-broker",
  },
  { name: "Burnaby", top: 65, left: 20, url: "/mortgage-broker-in-burnaby" },
  {
    name: "Campbell River",
    top: 30,
    left: 15,
    url: "/mortgage-broker-in-campbell-river",
  },
  {
    name: "Chilliwack",
    top: 72,
    left: 35,
    url: "/trusted-mortgage-broker-in-chilliwack",
  },
  {
    name: "Coquitlam",
    top: 62,
    left: 22,
    url: "/mortgage-broker-in-coquitlam",
  },
  { name: "Delta", top: 70, left: 18, url: "/mortgage-brokers-in-delta" },
  { name: "Hope", top: 68, left: 45, url: "/hope-mortgage-broker" },
  {
    name: "Kamloops",
    top: 45,
    left: 50,
    url: "/mortgage-brokers-in-kamloops",
  },
  { name: "Kelowna", top: 55, left: 60, url: "/mortgage-brokers-in-kelowna" },
  { name: "Langley", top: 75, left: 22, url: "/langley-mortgage-broker" },
  { name: "Nanaimo", top: 45, left: 10, url: "/mortgage-broker-in-nanaimo" },
  {
    name: "Prince George",
    top: 15,
    left: 55,
    url: "/mortgage-brokers-in-prince-george",
  },
  {
    name: "White Rock",
    top: 80,
    left: 20,
    url: "/mortgage-broker-in-white-rock",
  },
  {
    name: "Vancouver",
    top: 65,
    left: 15,
    url: "/mortgage-broker-in-vancouver",
  },
];
export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4314 }) {
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
            newBorrowDownBc {
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
                advisorCards {
                  title
                  description
                }
              }
              borrowingPayment {
                borrowingTitle
                borrowingTitle2
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
              tabWhyChoose {
                tabHeading
                tabDescription
                tabDetails {
                  title
                  description
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

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      serviceBannerData: data?.pages?.nodes[0]?.newBorrowDownBc,
      reasonTitle: data?.pages?.nodes[0]?.newBorrowDownBc?.reasonTitle,
      reasonDescription:
        data?.pages?.nodes[0]?.newBorrowDownBc?.reasonDescription,
      reasonLeftText: data?.pages?.nodes[0]?.newBorrowDownBc?.reasonLeftText,
      reasonRightImage:
        data?.pages?.nodes[0]?.newBorrowDownBc?.reasonRightImage,
      reasonRightText: data?.pages?.nodes[0]?.newBorrowDownBc?.reasonRightText,
      reasonLeftImage: data?.pages?.nodes[0]?.newBorrowDownBc?.reasonLeftImage,
      borrowingPaymentData:
        data?.pages?.nodes[0]?.newBorrowDownBc?.borrowingPayment,
      expertsHelpData: data?.pages?.nodes[0]?.newBorrowDownBc?.expertsHelp,
      tabWhyChooseData: data?.pages?.nodes[0]?.newBorrowDownBc?.tabWhyChoose,
      borrowingProcessData:
        data?.pages?.nodes[0]?.newBorrowDownBc?.processBorrowing,
      qualifyingTitle: data?.pages?.nodes[0]?.newBorrowDownBc?.qualifyingTitle,
      qualifyingDescription:
        data?.pages?.nodes[0]?.newBorrowDownBc?.qualifyingDescription,
      commonConcernsData:
        data?.pages?.nodes[0]?.newBorrowDownBc?.commonConcerns,
      talkTitle: data?.pages?.nodes[0]?.newBorrowDownBc?.talkTitle,
      talkDescription: data?.pages?.nodes[0]?.newBorrowDownBc?.talkDescription,
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
  borrowingPaymentData: any;
  expertsHelpData: any;
  tabWhyChooseData: any;
  borrowingProcessData: any;
  qualifyingTitle: any;
  qualifyingDescription: any;
  commonConcernsData: any;
  talkTitle: any;
  talkDescription: any;
};

export default function BorrowDownPaymentInBC(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    serviceBannerData,
    reasonTitle,
    reasonDescription,
    reasonLeftText,
    reasonRightText,
    reasonLeftImage,
    reasonRightImage,
    borrowingPaymentData,
    expertsHelpData,
    tabWhyChooseData,
    borrowingProcessData,
    qualifyingTitle,
    qualifyingDescription,
    commonConcernsData,
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
          />
        )}
        <Container className="mb-5">
          <Row className="coquitlam-grid mt-4">
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
        <Container>
          <h2 className="headering-title text-center">{reasonTitle}</h2>
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

        {/* <BorrowingPayment borrowingPaymentData={borrowingPaymentData} /> */}

        <ServiceSection
          textLeft={expertsHelpData?.helpLeftText}
          textRight={expertsHelpData?.helpRightText}
          imageLeft={expertsHelpData?.helpLeftImage}
          imageRight={expertsHelpData?.helpRightImage}
        />
        <div className=" w-full">
          <TestimonialSliderRow />
        </div>
        <Container>
          <div>
            <div
              className="text-center"
              dangerouslySetInnerHTML={{
                __html: borrowingProcessData?.advisorTitle,
              }}
            ></div>
            <p
              className="text-left my-2"
              dangerouslySetInnerHTML={{
                __html: borrowingProcessData.advisorDescriptionTop,
              }}
            ></p>
          </div>
        </Container>

        <AccordionNewBC homebuyerData={commonConcernsData} />

        <Container className="mb-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center items-start border-1 border-black mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5220.829340331075!2d-122.843247!3d49.1357508!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5485d162fec05fd5%3A0x44d696e4c0940576!2sMortgage%20Broker%20Surrey%20-%20Asim%20Ali!5e0!3m2!1sen!2sbd!4v1749630202672!5m2!1sen!2sbd"
                title="Asim Ali"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
            <div className="flex flex-col justify-center items-start mt-12">
              <div className="mt-12">
                <div className="text-xl md:text-2xl xl:text-4xl font-bold mb-4 font-oswald">
                  {"Visit our Head office in Surrey"}
                </div>
                <p
                  className="text-gray-600 mb-6"
                  dangerouslySetInnerHTML={{
                    __html: `Connect with the best mortgage broker in Surrey. Get expert
                advice, competitive rates, and customized solutions. Contact us
                now.`,
                  }}
                ></p>

                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <Link href={location?.url} key={location?.name}>
                      <Button
                        variant="outline"
                        className="border-gray-300 hover:bg-[#0a1e3b] hover:text-white text-[#0a1e3b] py-2 px-4 rounded-none"
                      >
                        {location?.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container className="mb-5">
          <div
            dangerouslySetInnerHTML={{
              __html: talkDescription,
            }}
            className="text-lg text-center"
          ></div>
        </Container>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
