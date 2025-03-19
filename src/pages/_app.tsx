import "faust.config";
import '../../styles/globals.scss'
import { FaustProvider } from "@faustjs/next";
import { useEffect } from "react";
import "scss/main.scss";
import { SSRProvider } from 'react-bootstrap';
import { client } from "client";

import App, { AppContext } from "next/app";

import type { AppProps } from "next/app";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useReportWebVitals } from 'next/web-vitals'
import { gtmPageView, pageview } from "lib/gtm";
import { useRouter } from "next/router";
import Script from "next/script";
const blacklist_countries = [
  "PL", // Poland
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useReportWebVitals((metric) => {
    // console.log(metric)
  })
  useEffect(() => {
    const props = {
      page_title: pageProps.slug || null,
    };
    gtmPageView(props);
  }, [pageProps]);

  function get_country_code(api_url: string) {
    fetch(api_url, { method: "GET" })
      .then((response) => response.json()) // Getting ip info as json
      .then((result) => {
        if (blacklist_countries.includes(result.country)) {
          // If my ip country code is in blacklist
          router.push('/access-denied') // Access denied error
        }
        if (!blacklist_countries.includes(result.country) && router.pathname === '/access-denied') {
          // If my ip country code is in blacklist
          router.push('/') // redirect to homepage
        }
      })
      .catch((error) => console.log("error", error));
  }
  get_country_code("https://get.geojs.io/v1/ip/country.json");
  useEffect(() => {
    const handleRouteChange = (url: any) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  return (
    <SSRProvider>
    <>
      <FaustProvider client={client} pageProps={pageProps}>
      <Script id="gtm" strategy="lazyOnload">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-KQV4VW3G');
      `}
    </Script>
    {/* Clarity Tracking Script */}
    <Script
        id="clarity-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "o530f5nvx2");
          `,
        }}
      />
        <Component {...pageProps} />
      </FaustProvider>
    </>
    </SSRProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  if (appContext.ctx.res?.statusCode === 404) {
    appContext.ctx.res.writeHead(301, { Location: "/" });
    appContext.ctx.res.end();
  }
  return { ...appProps };
};
