"use client";
import { gql } from "@apollo/client";
import HeroSection from "components/homepage/hero-section";
import dynamic from "next/dynamic";
import Head from "next/head";
import { apolloClient } from "../lib/apollo";

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

export async function getStaticProps() {
  try {
    const { data } = await apolloClient.query({
      query: gql`
        query {
          pages(where: { id: 7182 }) {
            nodes {
              seo {
                title
                description
                canonicalUrl
                openGraph {
                  image {
                    url
                  }
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

    if (!data) {
      return { notFound: true };
    }

    const homePage = data.pages?.nodes?.[0]?.HomeLandingPage || {};
    const seoData = data.pages?.nodes?.[0]?.seo || {};

    return {
      props: {
        settings: data.settingsOptions?.AsimOptions || {},
        mainMenus: data.menus?.nodes || [],
        metaData: seoData,
        heroSection: homePage.heroSection || {},
        aboutSection: homePage.aboutSection || {},
        approvalSection: homePage.approvalSection || {},
        partnerLogoSection: homePage.partnerLogoSection || {},
        ratesSection: homePage.ratesSection || {},
        roleSection: homePage.roleSection || {},
        scheduleSection: homePage.scheduleSection || {},
        serviceSection: homePage.serviceSection || {},
        teamSection: homePage.teamSection || {},
        toolsSection: homePage.toolsSection || {},
      },
      revalidate: 60,
    };
  } catch (error) {
    console.error("GraphQL Fetch Error:", error);
    return { notFound: true };
  }
}

type PageProps = Awaited<ReturnType<typeof getStaticProps>>["props"];

export default function HomePage({
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
}: PageProps) {
  return (
    <>
      <Head>
        <title>{metaData?.title || "Asim Ali Mortgage"}</title>
        {metaData?.description && (
          <meta name="description" content={metaData.description} />
        )}
        {metaData?.canonicalUrl && (
          <link
            rel="canonical"
            href={metaData.canonicalUrl.replace(/\/$/, "")}
          />
        )}
        {metaData?.openGraph?.image?.url && (
          <meta property="og:image" content={metaData.openGraph.image.url} />
        )}
        {/*  Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3XYCPEHD2P"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-3XYCPEHD2P');
    `,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KQV4VW3G');`,
          }}
        />
        {/* End Google Tag Manager */}
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        {settings?.generalSettings?.schemaProductRating && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: settings.generalSettings.schemaProductRating,
            }}
          />
        )}
      </Head>

      <main className="min-h-screen">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KQV4VW3G"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
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
