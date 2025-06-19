import { gql } from "@apollo/client";
import CTASection from "components/CTASection";
import ApprovalProcessSection from "components/homepage/approval-process-section";
import Footer from "components/homepage/footer";
import Header from "components/homepage/header";
import HeroSection from "components/homepage/hero-section";
import TalkToUsSection from "components/homepage/talk-to-us-section";
import ScheduleMeetingComponent from "components/ScheduleMeetingComponent";
import { apolloClient } from "lib/apollo";
import Head from "next/head";

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
        ApplyNow {
        heroSection {
          title
          description
          bannerImage {
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
        contactSection {
          title
          description
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
      heroSection: data?.pages?.nodes[0]?.ApplyNow?.heroSection,
      contactSection: data?.pages?.nodes[0]?.ApplyNow?.contactSection,
      approvalSection: data?.pages?.nodes[0]?.ApplyNow?.approvalSection,
      teamSection: data?.pages?.nodes[0]?.ApplyNow?.teamSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  heroSection: any;
  contactSection: any;
  approvalSection: any;
  teamSection: any;
};

function ApplyNow(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    heroSection,
    contactSection,
    teamSection,
    approvalSection
  } = props;

  return (
    <>
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
                  <ScheduleMeetingComponent heroSection={heroSection}/>
                  <TalkToUsSection teamSection={teamSection}/>
                  <ApprovalProcessSection approvalSection={approvalSection}/>
                  <CTASection contactSection={contactSection}/>
                  <Footer settings={settings} menuData={mainMenus}/>
                </main>
    </>
  );
}

export default ApplyNow;
