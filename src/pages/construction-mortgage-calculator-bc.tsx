import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import FeaturedSection from "components/FeaturedSection";
import ServiceSection from "components/ServiceSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "components/ui/card";
import { ca } from "date-fns/locale";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Calculator, RefreshCw, DollarSign, Percent, Clock, Home } from "lucide-react"
import ConstructionLoanCalculator from "components/contructionLoanCalculator";
export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 4096 }) {
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
            allCalculators {
              calculators {
                title
                description
                icon
                url
              }
            }
            newMortgagecalculator {
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
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
              homeContactSection {
                title
                description
              }
              homebuyerSection {
                advisorTitle
                advisorCards {
                  title
                  description
                  image {
                    sourceUrl
                    altText
                  }
                }
              }
              calculatorBannerTitle
              calculatorPageContent
              calculatorBannerImage {
                altText
                sourceUrl
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
      calculators: data?.pages?.nodes[0]?.allCalculators?.calculators,
      calculatorData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  calculatorData: any;
  calculators: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const ConstructionLoanCalc = (props: MyProps) => {
  const { settings, mainMenus, calculatorData, metaData, calculators } = props;

  return (
    <>
      {calculatorData?.map((data, index) => {
        return (
          <div key={index} className="our-locations">
            <Head>
              {metaData?.map((meta, index) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link
                      rel="canonical"
                      href="https://asimali.ca/mortgage-calculator"
                    />
                    <meta property="og:title" content={meta?.seo?.title} />
                    <meta
                      property="og:description"
                      content={meta?.seo?.description}
                    />
                    <meta name="robots" content="noindex"></meta>
                    <meta
                      property="og:image"
                      content={meta?.seo?.openGraph?.image?.url}
                    />
                  </>
                );
              })}
            </Head>
            <Header settings={settings} mainMenus={mainMenus} />
            <div>
              <main className="content">
                <ConstructionLoanCalculator/>
              </main>
            </div>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default ConstructionLoanCalc;
