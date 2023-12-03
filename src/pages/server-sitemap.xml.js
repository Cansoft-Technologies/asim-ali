import { gql } from "@apollo/client";
import { getServerSideSitemap } from "next-sitemap";
import { apolloClient } from "lib/apollo";

export const getServerSideProps = async (ctx) => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        posts(first: 100) {
          nodes {
            uri
          }
        }
      }
      `,});

  const postsSitemaps = data?.posts?.nodes?.map((item) => ({
    loc: `https://asimali.ca${item?.uri?.toString()}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: 0.9,
  }));


  const fields = [
    ...postsSitemaps,
  ];
  return getServerSideSitemap(ctx, fields);
};

export default function Site() {}