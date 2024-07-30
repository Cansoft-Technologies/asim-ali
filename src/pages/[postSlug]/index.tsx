import { gql } from "@apollo/client";
import { Post } from "client";
import CustomHero from "components/CustomHero";
import { apolloClient } from "lib/apollo";
import dynamic from "next/dynamic";
import Head from "next/head";
import Moment from "react-moment";
const Footer = dynamic(() => import("../../components/Footer"));
const Header = dynamic(() => import("../../components/Header"));

export interface PostProps {
  post: Post | Post["preview"]["node"] | null | undefined;
  seo: any;
  settings: any;
  mainMenus: any;
}

export function PostComponent({ post, seo, settings, mainMenus }: PostProps) {
  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <link
          rel="canonical"
          href={
            seo?.canonicalUrl?.endsWith("/")
              ? seo?.canonicalUrl?.slice(0, -1)
              : seo?.canonicalUrl
          }
        />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:description" content={seo?.description} />
        <meta property="og:image" content={seo?.openGraph?.image?.url} />
      </Head>

      <Header settings={settings} mainMenus={mainMenus} />
      <>
        <CustomHero
          title={String(post?.title)}
          bgImage={String(post?.featuredImage?.node?.sourceUrl)}
        />
        <main className="content content-single">
          <div className="wrap">
            <h1>{post?.title}</h1>
            <span className="asim-post-meta">
              By {post?.author?.node?.name} |{" "}
              <Moment format="MMM D, YYYY">{post?.date}</Moment>
            </span>
            <div
              style={{ overflowX: "hidden" }}
              className="post-content"
              dangerouslySetInnerHTML={{ __html: String(post?.content) }}
            ></div>
          </div>
        </main>
      </>

      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}

export default function Page({ seo, settings, mainMenus, post }) {
  return (
    <PostComponent
      post={post}
      seo={seo}
      settings={settings}
      mainMenus={mainMenus}
    />
  );
}

export async function getStaticProps({ params }) {
  const id = params?.postSlug;
  const { data } = await apolloClient.query({
    query: gql`query{
        post(id: "${id}", idType: URI) {
          date
    content(format: RENDERED)
    featuredImage {
      node {
        altText
        sourceUrl
      }
    }
    author {
      node {
        name
      }
    }
    title(format: RENDERED)
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
  const seo = data?.post?.seo;
  const settings = data?.settingsOptions?.AsimOptions;
  const mainMenus = data?.menus?.nodes;
  const post = data?.post;

  if (
    post?.title === undefined ||
    seo?.title === undefined ||
    settings?.headerSettings?.uploadLogo?.sourceUrl === undefined ||
    mainMenus?.length === 0
  ) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    };
  }

  return {
    props: { seo, settings, mainMenus, post },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: gql`query{
      posts {
        nodes {
          uri
        }
      }
    }`,
  });
  const paths = data?.posts?.nodes?.map((post: { uri: any }) => ({
    params: { postSlug: post?.uri },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}
