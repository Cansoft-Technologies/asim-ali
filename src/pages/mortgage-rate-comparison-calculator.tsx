import { gql } from "@apollo/client";
import { Footer, Header } from "components";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Container } from "react-bootstrap";
import "react-multi-carousel/lib/styles.css";

import MortgageCompareCalculator from "components/MortgageCompareCalculator";
import { apolloClient } from "lib/apollo";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";
import Link from "next/link";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 6674 }) {
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
            Refinance {
              heroTitle
              heroDescription
              bannerTitle
              bannerHeading
              bannerDescription
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
              bannerImage {
                altText
                sourceUrl
              }
              productsTitle
              productsDescription
              productsRightText
              productsLeftText
              brokerTitle
              brokerDescription
              bottomBrokerTitle
              bottomBrokerDescription
              productsImage {
                altText
                sourceUrl
              }
              brokerImage {
                altText
                sourceUrl
              }

              brokerText
              renovation {
                title
                description
              }
              advisorData {
                advisorCards {
                  title
                  description
                }
                advisorTitle
                advisorDescriptionTop
                advisorImage {
                  altText
                  sourceUrl
                }
              }
              renovateImageFirst {
                altText
                sourceUrl
              }
              faqAccordion {
                question
                answer
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
      refinanceData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  refinanceData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Page = (props: MyProps) => {
  const { settings, mainMenus, refinanceData, metaData } = props;

  const [key, setKey] = useState(null);
  // Step data
  const steps = [
    {
      title: "Start with Mortgage 1",
      description:
        "You'll see Mortgage 1 at the top. The monthly payment you see is your first option. Use it to test different mortgage deals. You can just start by adding your real numbers into the calculator.",
    },
    {
      title: "Enter the Mortgage Amount ($)",
      description:
        "This is the total amount you want to borrow for your home. Type in the number that matches the price of your house or the part of the cost you need to borrow. It is basically the same for every mortgage rate comparison calculator.",
      example:
        "If the house costs $100,000 and you are borrowing all of it, then type 100000.",
    },
    {
      title: "Enter the Interest Rate (%)",
      description:
        "Here you will see the cost of borrowing money from the bank. It's normally shown as a percent, and it will be added to your loan every year.",
      example: "If your rate is 6%, then you have to type 6.",
    },
    {
      title: "Choose the Amortization (Years)",
      description:
        "Now you will see how long your plan will take to pay back the loan in full. Pick the number of years from the list. This step is helpful when using a mortgage rate comparison calculator in Canada.",
      example: "Choose 15 if you want to finish paying in 15 years.",
    },
    {
      title: "Select the Mortgage Term (Years)",
      description:
        "If you want to see your home mortgage interest rate comparison, then this step is important. Here you will see the length of your current deal. Now choose how many years your deal lasts before it renews.",
      example: "Pick 5 years if that's what the bank offers you now.",
    },
    {
      title: "Choose Payment Type",
      description:
        "This number will show how often you will make payments. You can pick monthly, biweekly, or weekly.",
      example: 'Pick "Monthly" if you want to pay once every month.',
    },
    {
      title: "Add Any Extra Fees",
      description:
        "Some loans include setup fees, legal costs, or other charges. Add them all up and type the number here.",
      example: "If you have no extra fees, just type 0.",
    },
    {
      title: "Check Your Monthly Payment",
      description:
        "Now look below. You will see your Equivalent Monthly Payment. This is the amount you'll have to pay each month.",
      example: "$843.86 per month.",
    },
    {
      title: "Check Your APR",
      description:
        "APR helps with your online mortgage rate comparison, as it shows the full cost. Here you will find the interest rate and the fees.",
      example: "APR = 6.090%",
      note: "The lower the APR, the better your deal is.",
    },
    {
      title: "Compare With Other Mortgages",
      description:
        "Now, scroll down, and you will see mortgages 2 and 3. Fill in the same info for each one. It will help you with the best mortgage rate comparison for different lenders or offers.",
      example: "Mortgage 2: $745.57/month\nMortgage 3: $675.21/month",
    },
    {
      title: 'Click "Calculate"',
      description:
        "After you've entered all the details, click the Calculate button. It will update the numbers with your choices. Now you'll see the monthly payment, APR, and full costs for each option.",
    },
    {
      title: "View Full Report",
      description:
        'The full report will help you do a better mortgage interest rate comparison. It will also help you understand how different rates might affect your payments. When you click the "View Report" button, here\'s what you will see:',
      example:
        "Payment schedule\nTotal cost over time\nInterest paid\nFees added",
    },
  ];

  return (
    <>
      {refinanceData?.map((data, index) => {
        return (
          <div key={index} className="Bc-Coquitlam">
            <Head>
              {metaData?.map((meta, index) => {
                return (
                  <>
                    <title>Save Money with Mortgage Rate Comparison Calculator BC - Asim Ali</title>
                    <meta name="description" content='Try Asim Ali’s mortgage rate comparison calculator in BC and compare home loan options instantly. Find the best rate for your budget with us!' />
                    <meta name="robots" content="noindex"></meta>
                    <link
                      rel="canonical"
                      href='https://asimali.ca/mortgage-rate-comparison-calculator'
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
              <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
                {/* Hero Section */}
                <header className="bg-[#1A1A3A] text-white py-16 px-4">
                  <div className="max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                      Your Guide to Using a Mortgage Rate Comparison Calculator
                      BC
                    </h1>
                    <p className="text-lg md:text-xl max-w-3xl">
                      If you want to find which mortgage will give you a great
                      value, then you&apos;d better start finding the best
                      calculator today! Use Asim Ali&apos;s mortgage rate
                      comparison calculator in BC and sort all your payments.
                      With the results, you will know which mortgage to get and
                      what you need to do next.
                    </p>
                    <div className="mt-8">
                      <Link href="/apply-now" className="flex items-center justify-center bg-yellow-500 hover:bg-[#f0b245] text-[#1A1A3A] py-1 px-6 rounded-lg transition-colors duration-300 flex items-center w-1/3">
                        <p className="text-center pt-3 text-[#1A1A3A]">Choose Smarter Mortgage</p>
                        <ArrowRight className="ml-2 h-5 w-5 text-[#1A1A3A]" />
                      </Link>
                    </div>
                  </div>
                </header>

                {/* Calculator Introduction Section */}
                <section className="mb-16 container mx-auto px-4 md:px-8">
                  <div className="flex items-center justify-center my-6">
                    <Calculator className="h-8 w-8 text-blue-600 mr-3" />
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 text-center">
                      Try Our Mortgage Rate Comparison Calculator for Quick
                      Answers
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 mb-8 text-center">
                    Try our mortgage interest rate comparison calculator and get
                    a clear view of our loans. Here&apos;s how to use Asim
                    Ali&apos;s calculator with a step-by-step guide:
                  </p>
                  <Container>
                    <MortgageCompareCalculator />
                  </Container>
                  {/* Steps Guide */}
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                    <ol className="space-y-6">
                      {steps.map((step, index) => (
                        <li
                          key={index}
                          className="border-b border-gray-100 pb-6 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start">
                            <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                              {index + 1}
                            </div>
                            <div className="ml-4">
                              <h3 className="font-bold text-lg text-blue-800 mb-2">
                                {step.title}
                              </h3>
                              <p className="text-gray-700">
                                {step.description}
                              </p>
                              {step.example && (
                                <div className="mt-3 bg-blue-50 p-3 rounded-md text-sm text-blue-800">
                                  <span className="font-semibold">
                                    Example:
                                  </span>{" "}
                                  {step.example}
                                </div>
                              )}
                              {step.note && (
                                <div className="mt-3 bg-yellow-50 p-3 rounded-md text-sm text-yellow-800">
                                  <span className="font-semibold">Note:</span>{" "}
                                  {step.note}
                                </div>
                              )}
                              {index === 8 && (
                                <Image
                                  src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/mortgage-rate-comparison-calculator-canada.webp"
                                  alt="Mortgage Rate Comparison Calculator"
                                  width={200}
                                  height={100}
                                  className="w-full h-auto rounded-lg"
                                />
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </section>

                {/* Chart Reading Section */}
                <section className="mb-16 container mx-auto px-4 md:px-8">
                  <div className="flex items-center mb-6">
                    <Link href="/apply-now" className="bg-[#1A1A3A] hover:bg-[#f0b245] text-white hover:!text-[#1A1A3A] py-3 px-8 rounded-lg transition-colors duration-300">
                    Plan Mortgage Wisely
                  </Link>
                  </div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-4">
                    Read Your Mortgage Calculator Results With the Chart
                  </h3>
                  <p className="text-lg text-gray-700 mb-6">
                    When you use the calculator, you will see a chart. This
                    chart helps you understand which one will give you the
                    lowest monthly cost. Here&apos;s how to read it:
                  </p>

                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                    <h4 className="font-bold text-lg text-blue-800 mb-3">
                      Equivalent Monthly Payments
                    </h4>
                    <p className="text-gray-700 mb-6">
                      This just means the amount of money you&apos;ll need to
                      pay every month for each option. Each bar on the chart
                      shows one mortgage. It will help you compare them. Here
                      you will get help to find the one with the lowest payment.
                    </p>

                    <h4 className="font-bold text-lg text-blue-800 mb-3">
                      What Do the Bars Mean?
                    </h4>
                    <p className="text-gray-700 mb-4">
                      Each bar will show how much you would pay every month. The
                      number will be shown in dollars. Here&apos;s how you will
                      see the chart:
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-center">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2" />
                        <span>Mortgage 1 is the first option you entered.</span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2" />
                        <span>
                          Mortgage 2 is the second option with different
                          numbers.
                        </span>
                      </li>
                      <li className="flex items-center">
                        <ChevronRight className="h-5 w-5 text-blue-600 mr-2" />
                        <span>
                          Mortgage 3 is another option for you to compare.
                        </span>
                      </li>
                    </ul>
                    <div className="bg-yellow-50 p-4 rounded-md text-sm text-yellow-800">
                      <span className="font-semibold">Note:</span> Cheaper
                      monthly payments don&apos;t always mean better. You need
                      to keep in mind the time, the interest over time, and the
                      extra fees. Don&apos;t choose only based on the chart.
                    </div>
                  </div>

                  {/* Sample Chart Visualization */}
                  <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
                    <Image
                      src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/06/mortgage-interest-rates-comparison.webp"
                      alt="Sample Mortgage Chart"
                      width={800}
                      height={400}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </section>

                {/* Call to Action */}
                <section className=" text-white p-8 text-center">
                  <Link href="/apply-now" className="bg-[#1A1A3A] hover:bg-[#f0b245] text-white hover:!text-[#1A1A3A] py-3 px-8 rounded-lg transition-colors duration-300">
                    Have Doubt? Compare and Choose Your Best Rate Today
                  </Link>
                </section>
              </div>
            </main>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Page;
