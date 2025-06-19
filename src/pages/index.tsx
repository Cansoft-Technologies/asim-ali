import { gql } from "@apollo/client";
import dynamic from "next/dynamic";

const AboutSection = dynamic(() => import("components/homepage/about-section"));
const ApprovalProcessSection = dynamic(
  () => import("components/homepage/approval-process-section")
);
const CalculatorToolsSection = dynamic(
  () => import("components/homepage/calculator-tools-section")
);
const Footer = dynamic(() => import("components/homepage/footer"));
const MortgageRatesSection = dynamic(
  () => import("components/homepage/mortgage-rates-section")
);
const RoleSection = dynamic(() => import("components/homepage/role-section"));
const ScheduleMeetingSection = dynamic(
  () => import("components/homepage/schedule-meeting-section")
);
const ServicesSection = dynamic(
  () => import("components/homepage/services-section")
);
const TalkToUsSection = dynamic(
  () => import("components/homepage/talk-to-us-section")
);
import HeroSection from "components/homepage/hero-section";
import Head from "next/head";
import { Fragment } from "react";
import { apolloClient } from "../lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 7182}) {
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
        HomeLandingPage {
        heroSection {
          title
          mortgageRatesLabel
          description
          bannerImage {
            altText
            sourceUrl
          }
        }
        aboutSection {
          description
          title
          rightTitle
          rightDescription
          leftTitle
          leftDescription
          leftImage {
            altText
            sourceUrl
          }
          rightImage {
            altText
            sourceUrl
          }
        }
        approvalSection {
          description
          title
          processes {
            description
            title
          }
        }
        partnerLogoSection {
          partnerLogo {
            altText
            sourceUrl
          }
        }
        ratesSection {
          title
          description
        }
        roleSection {
          title
          description
          roles {
            description
            title
            icon {
              altText
              sourceUrl
            }
          }
        }
        scheduleSection {
          description
          title
          visitDescription
          visitTitle
        }
        serviceSection {
          description
          title
          services {
            description
            title
            icon {
              altText
              sourceUrl
            }
          }
        }
        teamSection {
          description
          title
          image {
            altText
            sourceUrl
          }
          teamDescriptions {
            description
          }
        }
        toolsSection {
          description
          title
          tools {
            description
            link
            title
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
            logoUploadTwo {
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
      heroSection: data?.pages?.nodes[0]?.HomeLandingPage?.heroSection,
      aboutSection: data?.pages?.nodes[0]?.HomeLandingPage?.aboutSection,
      approvalSection: data?.pages?.nodes[0]?.HomeLandingPage?.approvalSection,
      partnerLogoSection:
        data?.pages?.nodes[0]?.HomeLandingPage?.partnerLogoSection,
      ratesSection: data?.pages?.nodes[0]?.HomeLandingPage?.ratesSection,
      roleSection: data?.pages?.nodes[0]?.HomeLandingPage?.roleSection,
      scheduleSection: data?.pages?.nodes[0]?.HomeLandingPage?.scheduleSection,
      serviceSection: data?.pages?.nodes[0]?.HomeLandingPage?.serviceSection,
      teamSection: data?.pages?.nodes[0]?.HomeLandingPage?.teamSection,
      toolsSection: data?.pages?.nodes[0]?.HomeLandingPage?.toolsSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  heroSection: any;
  aboutSection: any;
  approvalSection: any;
  partnerLogoSection: any;
  ratesSection: any;
  roleSection: any;
  scheduleSection: any;
  serviceSection: any;
  teamSection: any;
  toolsSection: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    heroSection,
    aboutSection,
    approvalSection,
    partnerLogoSection,
    ratesSection,
    roleSection,
    scheduleSection,
    serviceSection,
    teamSection,
    toolsSection,
  } = props;
  const schemaCode = settings?.generalSettings?.schemaProductRating;
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
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: schemaCode }}
                key="product-jsonld"
              />
            </Fragment>
          );
        })}
      </Head>
      <main className="min-h-screen">
        <HeroSection
          settings={settings}
          menuItems={mainMenus}
          heroSection={heroSection}
        />
        <AboutSection
          aboutSection={aboutSection}
          partnerLogo={partnerLogoSection}
        />
        <ServicesSection serviceSection={serviceSection} />
        <MortgageRatesSection ratesSection={ratesSection} />
        <RoleSection roleSection={roleSection} />
        <TalkToUsSection teamSection={teamSection} />
        <ApprovalProcessSection approvalSection={approvalSection} />
        <ScheduleMeetingSection scheduleSection={scheduleSection} />
        <CalculatorToolsSection toolsSection={toolsSection} />
        <Footer settings={settings} menuData={mainMenus} />
      </main>
    </>
  );
}
