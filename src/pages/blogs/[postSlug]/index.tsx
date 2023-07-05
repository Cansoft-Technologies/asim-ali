import { gql } from "@apollo/client";
import { getNextStaticProps, is404 } from "@faustjs/next";
import { Post, client } from "client";
import CustomFooter from "components/CustomFooter";
import CustomHeader from "components/CustomHeader";
import CustomHero from "components/CustomHero";
import { apolloClient } from "lib/apollo";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

export interface PostProps {
  post: Post | Post["preview"]["node"] | null | undefined;
}

export function PostComponent({ post }: PostProps) {
  const [metaData, setMetaData] = useState([]);

  useEffect(() => {
    apolloClient
      .query({
        query: gql`query{
        posts(where: {id: ${post?.postId}}) {
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
          }
        }
      }`,
      })
      .then((result) => setMetaData(result?.data?.posts?.nodes));
  }, [post]);

  return (
    <>
      <Head>
        {metaData?.map((meta) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
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
      <CustomHeader />

      <CustomHero
        title={post?.title()}
        bgImage={post?.featuredImage?.node?.sourceUrl()}
      />
      <main className="content content-single">
        <div className="wrap">
          <div dangerouslySetInnerHTML={{ __html: post?.content() ?? "" }} />
        </div>
      </main>

      <CustomFooter />
    </>
  );
}

export default function Page() {
  const { usePost } = client;
  const post = usePost();

  return <PostComponent post={post} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  return getNextStaticProps(context, {
    Page,
    client,
    notFound: await is404(context, { client }),
  });
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}
