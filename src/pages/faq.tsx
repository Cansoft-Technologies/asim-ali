import { gql } from "@apollo/client";
import Head from "next/head";
import { Fragment } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { apolloClient } from "../lib/apollo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { ChevronDownIcon, PlusCircle } from "lucide-react";
import { Button } from "components/ui/button";
import Image from "next/image";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 6990 }) {
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
            faq {
              headingText
              headingDescription
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
      headingTitle: data?.pages?.nodes[0]?.faq?.headingText,
      headingDescription: data?.pages?.nodes[0]?.faq?.headingDescription,
      faqData: data?.pages?.nodes[0]?.faq?.faqSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  headingTitle: any;
  headingDescription: any;
  faqData: any;
};

export default function faq(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    headingDescription,
    headingTitle,
    faqData,
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
              <Header settings={settings} menuData={mainMenus} />
      <main className="content">
        <section className="relative w-full md:min-h-[70dvh] min-h-screen flex flex-col justify-between text-white">
      {/* Background image with overlay */}
      <Image
                src="https://asimaliprod.wpengine.com/wp-content/uploads/2025/05/Aldergrove-East-Mortgage-Broker.webp?height=1080&width=1920"
                alt="Background"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
              {/* Overlay div to handle the blend mode */}
              <div 
                className="absolute inset-0 bg-[#12143AB2]/80" 
                aria-hidden="true"
              />
      {/* Content section */}
      <div className="container mx-auto px-6 md:px-12 relative z-10 flex-grow flex flex-col">
        <div className="flex-grow flex flex-col justify-center items-center text-center max-w-5xl mx-auto">
          <h1 className="!text-4xl font-oswald md:!text-5xl lg:!text-6xl xl:!text-7xl font-bold mb-6 leading-tight">
         {headingTitle}
          </h1>

          <div className="text-gray-200 md:text-lg text-sm" dangerouslySetInnerHTML={{__html: headingDescription}}></div>
        </div>
      </div>
    </section>
        <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-6 text-gray-200 text-center">{faqData?.faqTitle}</h2>
      <Accordion type="single" collapsible className="w-full mt-10">
        {faqData?.faqAccordion?.map((faq:any, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left hover:bg-gray-50 px-4 py-3 rounded-lg">
              <div className="flex items-center space-x-3">
                <PlusCircle className="h-5 w-5 shrink-0 text-gray-600 transition-transform duration-200" />
                <span className="font-medium text-gray-700">{faq.question}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 py-3 bg-gray-50 rounded-b-lg text-gray-600">
              <div className="text-gray-600 text:md md:text-lg xl:text-xl" dangerouslySetInnerHTML={{__html: faq?.answer}}></div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
      </main>
      <Footer settings={settings} menuData={mainMenus} />
    </>
  );
}
