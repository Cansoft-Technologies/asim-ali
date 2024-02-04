import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
import { TRACKING_ID } from "./../../utils/variables";
class MyDocument extends Document {
  static async getInitialProps(ctx : any) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
  return (
    <Html lang="en-US">
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/logo.png"></link>
        <link rel="dns-prefetch" href="https://asimaliprod.wpengine.com" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="google-site-verification" content="ArsOxUI8W_sRuQ8inukzs24Mjl5_sl-TfzJGoz3CBQI" />
        <meta name="theme-color" content="#ffffff" />
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
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}}

export default MyDocument