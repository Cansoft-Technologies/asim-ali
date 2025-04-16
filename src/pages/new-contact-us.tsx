import { gql } from "@apollo/client";
import {
  faEnvelope,
  faMapMarker,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactSection from "components/ContactSection";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import { Hero } from "../components";
import ExperienceRoleSection from "components/ExperienceRoleSection";
import ScheduleMeetingForm from "components/ScheduleMeetingForm";
import Header from "components/homepage/header";
import Footer from "components/homepage/footer";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 245 }) {
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
            contactPage {
              contactBannerTitle
              contactBannerHeading
              contactBannerDescription
              phoneNumber
              eMail
              address
              addressMap
              contactBannerBackgroundImage {
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
      contactData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  contactData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, contactData, metaData } = props;

  return (
    <>
      {contactData?.map((contact, index) => {
        return (
          <div key={index}>
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
              <Header />
              <ScheduleMeetingForm />
              <ExperienceRoleSection />
              <Footer />
            </main>
          </div>
        );
      })}
    </>
  );
}
