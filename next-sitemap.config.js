module.exports = {
  siteUrl: "https://asimali.ca/",
  changefreq: "daily",
  generateRobotsTxt: true,
  exclude: ['/new-mortgage-for-self-employed-in-bc', '/new-construction-financing', '/new-commercial-mortgage-in-vancouver', '/new-commercial-mortgage-in-bc', '/new-borrow-down-payment-in-bc'],
  sitemapSize: 7000,
  priority: 0.9,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
  outDir: "./public",
};
