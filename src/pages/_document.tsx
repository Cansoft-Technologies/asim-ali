import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { TRACKING_ID } from "./../../utils/variables";
class MyDocument extends Document {
  static async getInitialProps(ctx : any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
  //   const schema = { 
  //     "@context" : "http://schema.org",
  
  //     "@type" : "Organization", 
  
  //     address : {
  
  //         "@type": "PostalAddress",
  
  //          addressCountry: "CANADA",
  
  //         addressLocality: "Surrey", 
  
  //         addressRegion: "BC", 
  
  //         postalCode: "V3W 1A4", 
  
  //         streetAddress: "7327 137 St Suite 311"
  
  //         }, 
  
  //     name:"Expert Mortgage Broker for Tailored Financing Solutions",
  
  //     image:"https://asimali.ca/_next/image?url=https%3A%2F%2Fasimaliprod.wpengine.com%2Fwp-content%2Fuploads%2F2022%2F11%2Flogo.png&w=384&q=75",
  
  //     url:"https://asimali.ca",
  
  //     email:"clientcare@asimali.ca",
  
  //     telephone:"+1 604-591-3590",
      
  //     aggregateRating:{
  
  //         "@type":"AggregateRating",
  
  //         ratingValue:"4.8",
  
  //         reviewCount:"226"
  
  //         }
  // };
  return (
    <Html lang="en-US">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="google-site-verification" content="ArsOxUI8W_sRuQ8inukzs24Mjl5_sl-TfzJGoz3CBQI" />
        <meta name="theme-color" content="#ffffff" />
        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          key="product-jsonld"
        /> */}
      </Head>
      <body>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        strategy="beforeInteractive"
      />
      <Script id="google-analytics" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${TRACKING_ID}');
        `}
      </Script>
      <noscript
    dangerouslySetInnerHTML={{
      __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KQV4VW3G" height="0" width="0" style="display: none; visibility: hidden;" />`,
    }}
  />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}}

export default MyDocument