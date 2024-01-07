import { gql } from "@apollo/client";
import { getNextStaticProps, is404 } from "@faustjs/next";
import { Post, client } from "client";
const Footer = dynamic(() => import("../../components/Footer"));
import CustomFooter from "components/CustomFooter";
const Header = dynamic(() => import("../../components/Header"));
import CustomHeader from "components/CustomHeader";
import CustomHero from "components/CustomHero";
import { apolloClient } from "lib/apollo";
import { GetStaticPropsContext } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";
import Moment from "react-moment";
export interface PostProps {
  post: Post | Post["preview"]["node"] | null | undefined;
  seo: any;
  settings: any;
  mainMenus: any;
}

export function PostComponent({ post, seo, settings, mainMenus }: PostProps) {
  const [metaData, setMetaData] = useState([]);
  // const [settings, setSettings] = useState();
  // const [mainMenus, setMainMenus] = useState();

  // useEffect(() => {
  //   apolloClient
  //     .query({
  //       query: gql`query{
  //       posts(where: {id: ${post?.postId}}) {
  //         nodes {
  //           seo {
  //             title
  //             description
  //             canonicalUrl
  //             focusKeywords
  //             openGraph {
  //               image {
  //                 url
  //               }
  //             }
  //           }

  //         }
  //       }
  //       settingsOptions {
  //         AsimOptions {
  //           headerSettings {
  //             uploadLogo {
  //               sourceUrl
  //               altText
  //             }
  //             uploadLogoMobile {
  //               sourceUrl
  //               altText
  //             }
  //           }
  //           generalSettings {
  //               schemaProductRating
  //           }
  //           footerSettings {
  //             socialUrl {
  //               facebook
  //               tiktok
  //               linkedin
  //               instagram
  //             }
  //             copyrightText
  //             footerLeftWidget {
  //               title
  //               phoneNumber
  //               emailAddress
  //             }
  //             footerLogoSection {
  //               logoText
  //               logoUpload {
  //                 altText
  //                 sourceUrl
  //               }
  //             }
  //             footerRightWidget {
  //               title
  //               address
  //             }
  //           }
  //         }
  //       }

  //       menus(where: {location: PRIMARY}) {
  //         nodes {
  //           name
  //           slug
  //           menuItems(first: 50){
  //             nodes {
  //               url
  //               target
  //               parentId
  //               label
  //               cssClasses
  //               description
  //               id
  //               childItems (first: 50) {
  //                 nodes {
  //                   uri
  //                   label
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }`,
  //     })
  //     .then((result) => {
  //       setMetaData(result?.data?.posts?.nodes);

  //     });
  // }, [post]);

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <link rel="canonical" href={seo?.canonicalUrl} />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:description" content={seo?.description} />
        <meta property="og:image" content={seo?.openGraph?.image?.url} />
      </Head>
      {/* <CustomHeader /> */}
      <Header settings={settings} mainMenus={mainMenus} />

      <CustomHero
        title={post?.title()}
        bgImage={post?.featuredImage?.node?.sourceUrl()}
      />
      <main className="content content-single">
        <div className="wrap">
          <h1>{post?.title()}</h1>
          <span className="asim-post-meta">
            By Asim Ali | <Moment format="MMM D, YYYY">{post.date}</Moment>
          </span>
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? "" }} />
        </div>
      </main>

      {/* <CustomFooter /> */}
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}

export default function Page({ seo, settings, mainMenus }) {
  const { usePost } = client;
  const post = usePost();

  return (
    <PostComponent
      post={post}
      seo={seo}
      settings={settings}
      mainMenus={mainMenus}
    />
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params.postSlug;
  const { data } = await apolloClient.query({
    query: gql`query{
        post(id: "${id}", idType: URI) {
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

        menus(where: {location: PRIMARY}) {
          nodes {
            name
            slug
            menuItems(first: 50){
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems (first: 50) {
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
  const seo = data?.post?.seo;
  const settings = data?.settingsOptions?.AsimOptions;
  const mainMenus = data?.menus?.nodes;

  console.log("seo", seo);

  return {
    props: { seo, settings, mainMenus },
  };

  // return getNextStaticProps(context, {
  //   seo,
  //   settings,
  //   mainMenus,
  //   client,
  //   notFound: await is404(context, { client }),
  // });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
