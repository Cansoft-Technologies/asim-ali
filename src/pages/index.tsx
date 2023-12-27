import { gql } from "@apollo/client";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import { apolloClient } from "../lib/apollo";
import AutoReply from "emails_template/auto_reply";
const ContactSection = dynamic(() => import("components/ContactSection"));
const FlexibilityTab = dynamic(() => import("components/FlexibilityTab"));
const HomeBuyerSection = dynamic(() => import("components/HomeBuyerSection"));
const MortgageAdvisor = dynamic(() => import("components/MortgageAdvisor"));
const MortgageFeaturedHome = dynamic(
  () => import("components/MortgageFeaturedHome")
);
const ServiceSection = dynamic(() => import("components/ServiceSection"));
const Footer = dynamic(() => import("../components/Footer"));
const Header = dynamic(() => import("../components/Header"));
const Banner = dynamic(() => import("../components/Banner"));
const WeHelp = dynamic(() => import("../components/WeHelp"));
const Team = dynamic(() => import("components/Team"));
const Meeting = dynamic(() => import("components/Meeting"));
const SplitImageLeft = dynamic(() => import("../components/SplitImageLeft"));
const SplitImageRight = dynamic(() => import("../components/SplitImageRight"));
const MobileBanner = dynamic(() => import("components/MobileBanner"));

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 2856}) {
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
        HomePage {
          homeSliderSection {
            homeSlider {
              sliderTitle
              sliderSubtitle
              sliderDescription
              sliderImage {
                sourceUrl
              }
              mobileImage {
                sourceUrl
              }
              sliderButtonUrl {
                url
              }
            }
          }
          weHelpSection {
            helpTitle
            helpDescription
            hideSection
            helpImage {
              mediaItemUrl
            }
          }
         partnerLogoSection {
            hideSection
            partnerLogo {
              sourceUrl
              altText
            }
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
          approvalRenovation{
            tabHeading
            tabDetails{
              title
              description
            }
          }
          mortgageServiceSection {
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
          meetingSection {
            meetingTitle
            meetingDescription
            hideSection
            meetingImage {
              sourceUrl
              altText
            }
          }
          splitImageLeftSection {
            splitTitle
            splitDescription
            splitImage {
              altText
              sourceUrl
            }
            hideSection
            splitButton {
              url
              title
            }
          }
          splitImageRightSection {
            splitTitle
            splitDescription
            splitImage {
              altText
              sourceUrl
            }
            hideSection
            splitButton {
              url
              title
            }
          }
          advisorSection {
            advisorTitle
            advisorDescriptionBottom
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
          tabRenovation{
            tabHeading
            tabDetails{
              title
              description
            }
          }
          callToActionSection {
            hideSection
            actionTitle
            actionLink {
              url
              title
            }
            actionBackgroundImage {
              sourceUrl
            }
          }
          homeContactSection {
            title
            description
          }
          bottomPartnerLogoSection {
            altText
            sourceUrl
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
            childItems {
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

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes[0]?.HomePage?.homeSliderSection,
      msliders: data?.pages?.nodes[0]?.HomePage?.homeSliderSection,
      helps: data?.pages?.nodes[0]?.HomePage?.weHelpSection,
      teamData: data?.pages?.nodes[0]?.HomePage?.teamSection,
      meetings: data?.pages?.nodes[0]?.HomePage?.meetingSection,
      advisorData: data?.pages?.nodes[0]?.HomePage?.advisorSection,
      mortgageInterestData: data?.pages?.nodes[0]?.HomePage?.mortgageInterest,
      mortgageServiceData:
        data?.pages?.nodes[0]?.HomePage?.mortgageServiceSection,
      bottomPartnerLogoSection:
        data?.pages?.nodes[0]?.HomePage?.bottomPartnerLogoSection,
      splitImagesRight: data?.pages?.nodes[0]?.HomePage?.splitImageRightSection,
      splitImagesLeft: data?.pages?.nodes[0]?.HomePage?.splitImageLeftSection,
      featuredTextLeft: data?.pages?.nodes[0]?.HomePage?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.HomePage?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.HomePage?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.HomePage?.featuredTextRight,
      reviewData: data?.pages?.nodes[0]?.HomePage?.reviewSection,
      contactData: data?.pages?.nodes[0]?.HomePage?.homeContactSection,
      tabRenovationData: data?.pages?.nodes[0]?.HomePage?.tabRenovation,
      approvalRenovationData:
        data?.pages?.nodes[0]?.HomePage?.approvalRenovation,
      homebuyerSectionData: data?.pages?.nodes[0]?.HomePage?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.HomePage?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.HomePage?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.HomePage?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.HomePage?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.HomePage?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.HomePage?.tipsImageLeft,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  teamData: any;
  meetings: any;
  advisorData: any;
  splitImagesRight: any;
  splitImagesLeft: any;
  reviewData: any;
  contactData: any;
  tabRenovationData: any;
  approvalRenovationData: any;
  bottomPartnerLogoSection: any;
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
  mortgageInterestData: any;
  homebuyerSectionData: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    sliders,
    msliders,
    helps,
    teamData,
    meetings,
    advisorData,
    splitImagesRight,
    reviewData,
    contactData,
    tabRenovationData,
    approvalRenovationData,
    bottomPartnerLogoSection,
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
    splitImagesLeft,
    mortgageInterestData,
    homebuyerSectionData,
  } = props;
  const { ref: imgsRef, inView: load } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });
  const { ref: sectionRef, inView: loadOnView } = useInView({
    triggerOnce: true,
    fallbackInView: true,
  });

  return (
    <>
      <Head>
        {metaData?.map((meta) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
              <link
                rel="preload"
                href={msliders?.homeSlider[0].mobileImage?.sourceUrl}
                as="image"
              />
            </>
          );
        })}
      </Head>
      <main>
        <Header settings={settings} mainMenus={mainMenus} />
        <div className="desktop-banner">
          <Banner sliders={sliders} />
        </div>
        <div className="mobile-banner">
          <MobileBanner msliders={msliders} />
        </div>
        <Container ref={imgsRef}>
          {load && (
            <div className="ms-auto mt-5 footer-partner-logo">
              {bottomPartnerLogoSection?.map((singleLogo) => {
                return (
                  <div key={singleLogo.sourceUrl}>
                    <Image
                      src={singleLogo.sourceUrl}
                      width="350"
                      height="150"
                      alt={singleLogo.altText}
                      style={{ objectFit: "contain", width: "100%" }}
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          )}
        </Container>

        <WeHelp helps={helps} />
        <div ref={sectionRef}>
          {loadOnView && (
            <>
              <Team teams={teamData} />
              <ServiceSection
                textLeft={featuredTextLeft}
                textRight={featuredTextRight}
                imageLeft={featuredImageLeft}
                imageRight={featuredImageRight}
              />
              <Container className="apply-now-home">
                <div className="text-center mt-5 mb-5">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: approvalRenovationData?.tabHeading,
                    }}
                  ></div>
                </div>
                <div className="mt-5">
                  <Row className="apply-step">
                    <Col md={4}>
                      {approvalRenovationData?.tabDetails[0] == null ? (
                        ""
                      ) : (
                        <div className="apply">
                          <span>01</span>
                          <p className="title">
                            {approvalRenovationData?.tabDetails[0]?.title}
                          </p>
                          <div
                            className="desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                approvalRenovationData?.tabDetails[0]
                                  ?.description,
                            }}
                          ></div>
                          <div className="apply-border"></div>
                        </div>
                      )}
                    </Col>
                    <Col md={4}>
                      {(approvalRenovationData?.tabDetails[1] == null) ==
                      null ? (
                        ""
                      ) : (
                        <div className="approved">
                          <span>02</span>
                          <p className="title">
                            {approvalRenovationData?.tabDetails[1]?.title}
                          </p>
                          <div
                            className="desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                approvalRenovationData?.tabDetails[1]
                                  ?.description,
                            }}
                          ></div>
                        </div>
                      )}
                    </Col>
                    <Col md={4}>
                      {(approvalRenovationData?.tabDetails[2] == null) ==
                      null ? (
                        ""
                      ) : (
                        <div className="apply">
                          <span>03</span>
                          <p className="title">
                            {approvalRenovationData?.tabDetails[2]?.title}
                          </p>
                          <div
                            className="desc"
                            dangerouslySetInnerHTML={{
                              __html:
                                approvalRenovationData?.tabDetails[2]
                                  ?.description,
                            }}
                          ></div>
                          <div className="apply-border"></div>
                        </div>
                      )}
                    </Col>
                    {sliders?.homeSlider[0].sliderButtonUrl == null ? (
                      ""
                    ) : (
                      <Col
                        className="text-start mt-5 link-banner"
                        xs={12}
                        lg="12"
                      >
                        <Link href={sliders?.homeSlider[0].sliderButtonUrl.url}>
                          <Button className="apply-button">
                            Get <span>Approved</span>
                          </Button>
                        </Link>
                        <Link href="/apply-now">
                          <Button className="apply-button">
                            <span>Apply Now</span>
                          </Button>
                        </Link>
                      </Col>
                    )}
                  </Row>
                </div>
              </Container>
              <AutoReply fname='Pulok' lname='C'/>
              <Meeting meetings={meetings} />
              <MortgageAdvisor advisorData={advisorData} />
              <SplitImageRight splitImagesRight={splitImagesRight} />
              <MortgageFeaturedHome advisorData={mortgageInterestData} />
              <SplitImageLeft splitImagesLeft={splitImagesLeft} />
              <FlexibilityTab tabData={tabRenovationData} />
              <MortgageAdvisor advisorData={mortgageServiceData} />
              <Container
                className="mb-5 px-3 py-3"
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
                textLeft={tipsLeftText}
                textRight={tipsRightText}
                imageLeft={tipsImageLeft}
                imageRight={tipsImageRight}
              />
              <HomeBuyerSection homebuyerData={homebuyerSectionData} />
              <Container className="mb-5">
                <h2 className="text-center service-title">
                  {contactData?.title}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: contactData?.description,
                  }}
                  className="text-lg text-start"
                ></div>
              </Container>
              <Container className="mt-5">
                <div className="my-5">
                  <p className="text-center service-title">Contact Us</p>
                </div>
                <ContactSection />
              </Container>
            </>
          )}
        </div>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
