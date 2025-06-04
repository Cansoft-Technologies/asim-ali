import { gql } from "@apollo/client";
import { Footer, Header, Hero } from "components";
import BCLocationsMockMap from "components/BCLocationMock";
import OurLocationsMap from "components/our-locations-map";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 555 }) {
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
            locations {
              locationsBannerTitle
              locationsBannerHeading
              locationsBannerDescription
              locationMap
              locationsBannerImage {
                sourceUrl
              }
              locationHead
              locationDescription
              contactTitle
              contactDescription
              secondLocationList {
                locationLink {
                  url
                  title
                }
                locationImage {
                  altText
                  sourceUrl
                }
              }
              firstLocationList {
                locationImage {
                  altText
                  sourceUrl
                }
                locationLink {
                  url
                  title
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
  if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  return {
    props: {
      locationData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  locationData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Locations = (props: MyProps) => {
  const { settings, mainMenus, locationData, metaData } = props;


  return (
    <>
      {locationData.map((data, index) => {
        return (
          <div key={index}>
            <Head>
              {metaData.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
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
            <main>
              <BCLocationsMockMap locationHead={data?.locations?.locationHead} locationDescription={data?.locations?.locationDescription} contactTitle={data?.locations?.contactTitle} contactDescription={data?.locations?.contactDescription}
              />
            </main>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Locations;
