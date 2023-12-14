import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";

const locationRoutes = [
  "/mortgage-broker-in-abbotsford",
  "/mortgage-broker-in-coquitlam",
  "/mortgage-brokers-in-prince-george",
  "/mortgage-brokers-in-delta",
  "/mortgage-brokers-in-maple-ridge",
  "/mortgage-brokers-in-kamloops",
  "/mortgage-brokers-in-kelowna",
  "/langley-mortgage-broker",
  "/mortgage-broker-in-vancouver",
];
const excludeItems = [
  "/new-mortgage-for-self-employed-in-bc",
  "/new-construction-financing",
  "/new-commercial-mortgage-in-vancouver",
  "/new-commercial-mortgage-in-bc",
  "/new-borrow-down-payment-in-bc",
  "/new-dominion-lending-mortgage-rates",
  "/new-discharge-mortgage-in-bc",
  "/new-fixed-mortgage-rates-in-bc",
  "/new-mortgage-broker-in-burnaby",
  "/new-mortgage-broker-in-nanaimo",
  "/new-mortgage-broker-in-campbell-river",
  "/new-transparent-vacant-land-mortgage",
  "/posts-sitemap.xml",
  "/location-sitemap.xml",
  "/sitemap-0.xml",
  ...locationRoutes,
];

export default function PageSitemap() {
  return null;
}

export const getServerSideProps = async ({ res }) => {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(first: 100) {
          nodes {
            uri
          }
        }
      }
    `,
  });

  const postsSitemaps = data.pages.nodes
    .filter((item:any) => !excludeItems.includes(item.uri))
    .map((item:any) => ({
      loc: `https://asimali.ca${item.uri.toString()}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.9,
    }));

  const fields = [...postsSitemaps];

  if (!Array.isArray(fields)) {
    console.error("fields is not an array:", fields);
    return { notFound: true }; // Return a 404 page or an error page as needed.
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${fields
      .map(
        (field) => `
      <url>
        <loc>${field.loc}</loc>
        <lastmod>${field.lastmod}</lastmod>
        <changefreq>${field.changefreq}</changefreq>
        <priority>${field.priority}</priority>
      </url>
    `
      )
      .join("")}
    </urlset>`;

  res.setHeader("Content-Type", "text/xml; charset=utf-8");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=600, stale-while-revalidate=600"
  );
  res.write(sitemap);
  res.end();
  return { props: {} };
};
