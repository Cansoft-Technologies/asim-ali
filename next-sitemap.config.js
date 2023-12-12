const siteUrl = "https://asimali.ca/";
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

module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: 0.9,
  exclude: [
    "/new-mortgage-for-self-employed-in-bc",
    "/new-construction-financing",
    "/new-commercial-mortgage-in-vancouver",
    "/new-commercial-mortgage-in-bc",
    "/new-borrow-down-payment-in-bc",
    "/new-dominion-lending-mortgage-rates",
    "/new-discharge-mortgage-in-bc",
    "/new-fixed-mortgage-rates-in-bc",
    "/new-mortgage-broker-in-burnaby",
    "/server-sitemap.xml",
    "/location-sitemap.xml",
    ...locationRoutes,
  ],
  robotsTxtOptions: {
    // policies: [
    //   { userAgent: "*", disallow: "/cgi-bin/" },
    //   { userAgent: "Googlebot", disallow: "" },
    //   { userAgent: "googlebot-image", disallow: "" },
    //   { userAgent: "googlebot-mobile", disallow: "" },
    //   { userAgent: "MSNBot", disallow: "" },
    //   { userAgent: "Slurp", disallow: "" },
    //   { userAgent: "Teoma", disallow: "" },
    //   { userAgent: "Gigabot", disallow: "" },
    //   { userAgent: "Robozilla", disallow: "" },
    //   { userAgent: "Nutch", disallow: "" },
    //   { userAgent: "ia_archiver", disallow: "" },
    //   { userAgent: "baiduspider", disallow: "" },
    //   { userAgent: "naverbot", disallow: "" },
    //   { userAgent: "yeti", disallow: "" },
    //   { userAgent: "yahoo-mmcrawler", disallow: "" },
    //   { userAgent: "psbot", disallow: "" },
    //   { userAgent: "yahoo-blogs/v3.9", disallow: "" },
    // ],
    additionalSitemaps: [
      `${siteUrl}sitemap.xml`,
      `${siteUrl}server-sitemap.xml`,
      `${siteUrl}location-sitemap.xml`,
    ],
  },
  // (optional)
  // ...other options
  // outDir: "./public",
};
