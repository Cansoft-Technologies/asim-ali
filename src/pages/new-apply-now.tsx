import { gql } from "@apollo/client";
import CTASection from "components/CTASection";
import ApprovalProcessSection from "components/homepage/approval-process-section";
import Footer from "components/homepage/footer";
import Header from "components/homepage/header";
import ScheduleMeetingComponent from "components/ScheduleMeetingComponent";
import { apolloClient } from "lib/apollo";
import Head from "next/head";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 2222 }) {
          nodes {
            ApplyNow {
              bannerTitle
              bannerBackgroundImage {
                altText
                sourceUrl
              }
              formBackgroundImage {
                altText
                sourceUrl
              }
              applyStepHeading
              applyStepSection{
                firstStepTitle
                firstStepDescription
                secondStepTitle
                secondStepDescription
                thirdStepTitle
                thirdStepDescription
              }
              applyNowContent
            }
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
      howApplyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  howApplyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

function ApplyNow(props: MyProps) {
  const { settings, mainMenus, howApplyData, metaData } = props;

  return (
    <>
      {howApplyData?.map((data, index) => {
        return (
          <div key={index}>
            <Head>
              {metaData?.map((meta,index) => {
                return (
                  <>
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
                    <meta name="robots" content="noindex"></meta>
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
            <main className="min-h-screen">
                  <Header settings={settings} menuData={mainMenus}/>
                  <ScheduleMeetingComponent />
                  <ApprovalProcessSection />
                  <CTASection />
                  <Footer settings={settings} menuData={mainMenus}/>
                </main>
          </div>
        );
      })}
    </>
  );
}

export default ApplyNow;
