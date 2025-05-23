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
  "/mortgage-broker-in-burnaby",
  "/mortgage-broker-in-nanaimo",
  "/mortgage-broker-in-campbell-river",
  "/trusted-mortgage-broker-in-chilliwack",
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
  "/new-trusted-mortgage-broker-in-chilliwack",
  "/our-locations",
  "/new-readvanceable-mortgage-bc",
  "/new-fthbi-calculator-bc",
  "/posts-sitemap.xml",
  "/new-homepage",
  "/new-apply-now",
  "/new-current-rates",
  "/new-contact-us",
  "/location-sitemap.xml",
  "/sitemap-0.xml",
  ...locationRoutes,
];
const data = [
  "/aaa-mortgage-in-bc",
  "/apply-now",
  "/b-lender-bc-mortgage",
  "/blog",
  "/borrow-down-payment-services",
  "/commercial-mortgage-in-bc",
  "/commercial-mortgage-in-surrey",
  "/commercial-mortgage-in-vancouver",
  "/construction-financing",
  "/contact-us",
  "/current-rates",
  "/financing-for-business-in-bc",
  "/how-it-works",
  "/mortgage-calculator",
  "/mortgage-for-self-employed",
  "/mortgage-refinance-calculator-bc",
  "/our-services",
  "/private-lenders-bc",
  "/testimonials",
  "/our-locations",
  "/uninsured-mortgage-solutions",
  "/fixed-mortgage-rates-in-bc",
  "/discharge-mortgage-in-bc",
  "/dominion-lending-mortgage-rates",
  "/transparent-vacant-land-mortgage",
  "/fthbi-calculator-bc",
  "/readvanceable-mortgage-bc",
];

export default function PageSitemap() {
  return null;
}

export const getServerSideProps = async ({ res }) => {
  const postsSitemaps = data
    ?.filter((item: any) => !excludeItems.includes(item))
    .map((item: any) => ({
      loc: `https://asimali.ca${item?.toString()}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.9,
    }));

  const fields = [
    {
      loc: "https://asimali.ca",
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 0.9,
    },
    ...postsSitemaps,
  ];
  // console.log(fields);

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
