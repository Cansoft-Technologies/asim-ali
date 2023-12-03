const siteUrl = 'https://asimali.ca/';
module.exports = {
  siteUrl,
  generateRobotsTxt: true,
  sitemapSize: 7000,
  priority: 0.9,
  exclude: [
    '/new-mortgage-for-self-employed-in-bc', '/new-construction-financing', '/new-commercial-mortgage-in-vancouver', '/new-commercial-mortgage-in-bc', '/new-borrow-down-payment-in-bc','/server-sitemap.xml'
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
    ],
  },
  // (optional)
  // ...other options
  outDir: "./public",
};