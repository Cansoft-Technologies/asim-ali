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
              headingContent
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
      headingContent: data?.pages?.nodes[0]?.allCalculators?.headingContent,
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
  headingContent: any;
  calculators: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const AllCalculator = (props: MyProps) => {
  const { settings, mainMenus, calculatorData, headingContent, metaData, calculators } = props;
  console.log(headingContent);
const getIconByTitle = (title: string) => {
  switch (title) {
    case "Mortgage Payment Calculator":
      return <Calculator className="h-6 w-6" />;
    case "Reverse Mortgage Calculator":
      return <RefreshCw className="h-6 w-6" />;
    case "Down Payment Calculator":
      return <DollarSign className="h-6 w-6" />;
    case "FTHBI Calculator":
      return <Home className="h-6 w-6" />;
    case "Renewal Mortgage Calculator":
      return <Clock className="h-6 w-6" />;
    case "Refinance Calculator":
      return <Percent className="h-6 w-6" />;
    default:
      return <Calculator className="h-6 w-6" />; // Fallback icon
  }
};

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
                    <meta
                      property="og:image"
                      content={meta?.seo?.openGraph?.image?.url}
                    />
                  </>
                );
              })}
            </Head>
            <Header settings={settings} menuData={mainMenus} />
            <div>
              <main className="content">
                <div className="my-10 text-center" dangerouslySetInnerHTML={{__html: headingContent}}></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 container mx-auto md:py-10 md:mt-10 mt-0 py-5">
  {calculators.map((calculator: any, index: number) => (
    <Card
      key={index}
      className="flex flex-col justify-between bg-[#12143A] backdrop-blur-sm border-none overflow-hidden hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px] min-h-[380px]"
    >
      <div>
        <CardHeader className="pb-2">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-[#f0b254] text-[#12143A]">
              {getIconByTitle(calculator?.title)}
            </div>
            <CardTitle className="text-[#f0b254]"><h2 className="">{calculator.title}</h2></CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-white/80 min-h-[120px]">
            <div dangerouslySetInnerHTML={{ __html: calculator.description }} />
          </CardDescription>
        </CardContent>
      </div>

      <CardFooter className="mt-auto">
        <Link href={calculator?.url} className="w-full">
          <Button className="w-full !bg-[#f0b254] text-white hover:!bg-[#12143A] hover:!border-[#f0b254] hover:text-[#f0b254] transition-all duration-300">
            Use Calculator
          </Button>
        </Link>
      </CardFooter>
    </Card>
  ))}
</div>

              </main>
            </div>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default AllCalculator;
