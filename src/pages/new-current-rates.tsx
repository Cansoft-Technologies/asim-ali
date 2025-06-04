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
            }

            CurrentRates {
              bannerTitle
              currentMortgageRate
              currentPrimeRate
              easyApplicationSubtitle
              easyApplicationTitle
              paymentCalculatorTitle
              tableBottomNotes
              bannerBackgroundImage {
                altText
                sourceUrl
              }
              easyApplicationBackground {
                altText
                sourceUrl
              }
              paymentCalculatorLink {
                url
              }
              tableRateInformation {
                terms
                bankRates
                dominion
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
      currentData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  currentData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const CurrentRates = (props: MyProps) => {
  const { settings, mainMenus, currentData, metaData } = props;

  return (
    <>
      <Head>
        {metaData?.map((meta, index) => {
          return (
            <Fragment key={index}>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
              <meta name="robots" content="noindex"></meta>
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
      <CurrentRatesHero settings={settings} menuItems={mainMenus}/>
      <MortgageRatesSection />
      <TalkToUsSection />
      <HistoricalMortgageRates />
      <MortgageBrokerIntro />
      <ScheduleMeeting />
      <RoleSection />
      <Footer settings={settings} menuData={mainMenus}/>
    </main>
    </>
  );
};

export default CurrentRates;
