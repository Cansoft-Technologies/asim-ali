const { withFaust } = require("@faustjs/next");
const runtimeCaching = require("next-pwa/cache");
const prod = process.env.NODE_ENV === "production";
/**
 * @type {import('next').NextConfig}
 **/

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: prod ? false : true,
  skipWaiting: true,
  runtimeCaching,
});

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});
function oldPageRedirectRules() {
  return inValidUrls.map((url) => {
    return {
      source: `${url}`,
      destination: `/`,
      permanent: true,
    };
  });
}
module.exports = withBundleAnalyzer(
  withFaust(
    withPWA({
      optimizeImages: true,
      images: {
        domains: ["localhost", "asimaliprod.wpengine.com"],
        optimized: true,
        allowFutureImage: true,
      },
      async redirects() {
        return [
          {
            source: "/b-lender-mortgage-bc",
            destination: "/b-lender-bc-mortgage",
            permanent: true,
          },
          {
            source: "/refinance-your-mortgage-in-vancouver",
            destination: "/",
            permanent: true,
          },
          {
            source: "/best-mortgage-rates-in-vancouver",
            destination: "/",
            permanent: true,
          },
          {
            source: "/vancouver-empty-home-tax",
            destination: "/",
            permanent: true,
          },
          {
            source: "/vancity-mortgage-calculator",
            destination: "/",
            permanent: true,
          },
          {
            source: "/mortgage-fund-canada",
            destination: "/",
            permanent: true,
          },
          {
            source: "/our-locations",
            destination: "/",
            permanent: false,
          },
          {
            source: "/what-we-do",
            destination: "/",
            permanent: false,
          },
          {
            source: "/borrow-down-bc",
            destination: "/borrow-down-payment-services",
            permanent: true,
          },
          {
            source: "/blogs",
            destination: "/blog",
            permanent: true,
          },
          ...oldPageRedirectRules(),
        ];
      },
      async headers() {
        return [
          {
            source: "/:all*(svg|jpg|png|webp|jpeg)",
            locale: false,
            headers: [
              {
                key: "Cache-Control",
                value: "public, max-age=9999999999, must-revalidate",
              },
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=31536000; includeSubDomains; preload',
              },
            ],
          },
        ];
      },
      eslint: {
        ignoreDuringBuilds: true,
      },
    })
  )
);
const inValidUrls = [
  "/home/",
  "/new-financing-for-business",
  "/refinance-your-mortgage-in-vancouver",
  "/mortgage-brokers-in-abbotsford",
  "/new-mortgage-broker-in-abbotsford",
  "/new-mrtgage-broker-in-kamloops",
  "/wp-content/uploads/2023/03/asimalidev2.webp",
  "/new-commercial-mortgage-in-coquitlam",
  "/mortgages/current-rates",
  "/portfolio",
  "/category/uncategorized/page/4",
  "/posts/private-mortgage-lenders-rates",
  "/portfolio/",
  "/wp-content/uploads/2023/08/commercial-mortgage-broker-in-Surrey.webp",
  "/category/uncategorized/page/7",
  "/category/uncategorized/page/2",
  "/fr/current-rates",
  "/wp-content/uploads/2023/06/first-time-home-buyer-mortgage-programs-maple-ridge.webp",
  "/new-home",
  "/contact-a-mortgage-broker/feed",
  "/posts/b-lender-mortgage-bc",
  "/new-home",
  "/author/seoteam",
  "/tools/current-rates",
  "/posts/loans-for-low-income",
  "/specialist-mortgage-advisor/feed",
  "/testimonials/tidio",
  "/posts/business-loans-for-bad-credit",
  "/posts/big-bank-blog",
  "/wp-content/uploads/2023/06/delta-mortgage-services-1024x683.webp",
  "/wp-content/uploads/2023/06/surrey-bc-mortgage-broker.webp",
  "/new-mortgage-broker-in-maple-ridge",
  "/new-commercial-mortgage-in-bc",
  "/new-mortgage-broker-in-kelowna",
  "/new-kamloops/",
  "/new-mortgage-calculator",
  "/new-mortgage-broker-in-prince-george",
  "/posts/vancouver-empty-home-tax",
  "/com-mortgage-surrey-draft",
  "/new-uninsured-mortgage-solutions",
  "/new-aaa-mortgage-in-bc",
  "/new-delta",
  "/new-construction-financing",
  "/new-com-coquitlam",
  "/new-mortgage-broker-in-delta",
"/category/uncategorized/after/YXJyYXljb25uZWN0aW9uOjE2MzI=",
"/pre-approval-blog",
"/cdn-cgi/l/email-protection",
"/category/uncategorized/after/YXJyYXljb25uZWN0aW9uOjE2MjM=",
"/category/uncategorized/page/3",
"/tag/mortgage/",
"/m",
];
