import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import FeaturedSection from "components/FeaturedSection";
import ServiceSection from "components/ServiceSection";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { ca } from "date-fns/locale";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";
import {
  Calculator,
  RefreshCw,
  DollarSign,
  Percent,
  Clock,
  Home,
} from "lucide-react";
import ConstructionLoanCalculator from "components/contructionLoanCalculator";
import FeaturedSection2 from "components/FeaturedSection2";
export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 7302 }) {
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
            newMortgagecalculator {
              aboutText
              aboutImage {
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
                {data?.newMortgagecalculator?.calculatorBannerTitle == null ? (
                  ""
                ) : (
                  <Hero
                    title={data?.newMortgagecalculator?.calculatorBannerTitle}
                    bgImage={
                      data?.newMortgagecalculator?.calculatorBannerImage
                        ?.sourceUrl
                    }
                  />
                )}

                <Container className="my-5">
                  <ConstructionLoanCalculator />
                  <div className="tb-btn">
                    <Link href={"/apply-now"}>
                      <Button className="HeadBtn">
                        Map Your Financial Path to Home
                      </Button>
                    </Link>
                  </div>
                </Container>
                <Container className="my-5 py-2">
                  <Row className="coquitlam-grid my-5">
                    <Col md={7}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data?.newMortgagecalculator?.aboutText,
                        }}
                      ></div>
                      <div className="tb-btn-left">
                        <Link href={"/apply-now"}>
                          <Button className="HeadBtn">
                            Calculate Your Building Costs
                          </Button>
                        </Link>
                      </div>
                    </Col>
                    <Col md={5}>
                      <Image
                        src={data?.newMortgagecalculator?.aboutImage?.sourceUrl}
                        alt={data?.newMortgagecalculator?.aboutImage?.altText}
                        width="390"
                        height="400"
                        style={{ width: "100%", objectFit: "cover" }}
                      />
                    </Col>
                  </Row>
                </Container>
                <FeaturedSection2
                  featuredData={data?.newMortgagecalculator?.homebuyerSection}
                />
                <Container className="mb-5">
                  <h2 className="text-center service-title">
                    {data?.newMortgagecalculator?.homeContactSection?.title}
                  </h2>
                  <div
                    dangerouslySetInnerHTML={{
                      __html:
                        data?.newMortgagecalculator?.homeContactSection
                          ?.description,
                    }}
                    className="text-lg text-start"
                  ></div>
                </Container>
              </main>
            </div>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default ConstructionLoanCalc;
