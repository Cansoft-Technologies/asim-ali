import { gql } from "@apollo/client";
import CurrentRatesHero from "components/CurrentRatesHero";
import HistoricalMortgageRates from "components/HistoricalMortgage";
import Footer from "components/homepage/footer";
import MortgageRatesSection from "components/homepage/mortgage-rates-section";
import RoleSection from "components/homepage/role-section";
import TalkToUsSection from "components/homepage/talk-to-us-section";
import MortgageBrokerIntro from "components/MortgageBrokerIntro";
import ScheduleMeeting from "components/ScheduleMeeting";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { Fragment } from "react";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 301 }) {
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
            CurrentRates {
              heroSection {
                title
                description
                bannerImage {
                  altText
                  sourceUrl
                }
              }
              helpSection {
                description
                title
                helpImage {
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
      heroSection: data?.pages?.nodes[0]?.CurrentRates?.heroSection,
      ratesSection: data?.pages?.nodes[0]?.CurrentRates?.ratesSection,
      roleSection: data?.pages?.nodes[0]?.CurrentRates?.roleSection,
      scheduleSection: data?.pages?.nodes[0]?.CurrentRates?.scheduleSection,
      teamSection: data?.pages?.nodes[0]?.CurrentRates?.teamSection,
      helpSection: data?.pages?.nodes[0]?.CurrentRates?.helpSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  heroSection: any;
  ratesSection: any;
  roleSection: any;
  scheduleSection: any;
  teamSection: any;
  helpSection: any;
};

const CurrentRates = (props: MyProps) => {
  const {
    settings,
    mainMenus,
    metaData,
    heroSection,
    ratesSection,
    roleSection,
    scheduleSection,
    teamSection,
    helpSection,
  } = props;

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
            </Fragment>
          );
        })}
      </Head>
      <main className="min-h-screen">
        <CurrentRatesHero
          settings={settings}
          menuItems={mainMenus}
          heroSection={heroSection}
        />
        <MortgageRatesSection ratesSection={ratesSection} />
        <TalkToUsSection teamSection={teamSection} />
        <HistoricalMortgageRates />
        <MortgageBrokerIntro helpSection={helpSection} />
        <ScheduleMeeting scheduleSection={scheduleSection} />
        <RoleSection roleSection={roleSection} />
        <Footer settings={settings} menuData={mainMenus} />
      </main>
    </>
  );
};

export default CurrentRates;
