import { gql } from "@apollo/client";
import ExperienceRoleSection from "components/ExperienceRoleSection";
import ScheduleMeetingForm from "components/ScheduleMeetingForm";
import TestimonialSliderRow from "components/TestimonialSliderRow";
import Footer from "components/homepage/footer";
import Header from "components/homepage/header";
import RoleSection from "components/homepage/role-section";
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
        contactPage {
        heroSection {
          title
          description
          bannerImage {
            altText
            sourceUrl
          }
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
      heroSection: data?.pages?.nodes[0]?.contactPage?.heroSection,
      roleSection: data?.pages?.nodes[0]?.contactPage?.roleSection,
    },
    revalidate: 60,
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  heroSection: any;
  roleSection: any;
};

export default function Page(props: MyProps) {
  const {
    settings,
    mainMenus,
    metaData,
    heroSection,
    roleSection,
  } = props;

  return (
    <>
            <Head>
              {metaData?.map((meta, index) => {
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
              <ScheduleMeetingForm heroSection={heroSection} />
              <ExperienceRoleSection roleSection={roleSection}/>
              <div className="relative bg-[#f8f5f0] w-full">
            <TestimonialSliderRow />
            </div>
              <Footer settings={settings} menuData={mainMenus}/>
            </main>
    </>
  );
}
