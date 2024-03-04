import "faust.config";

import { FaustProvider } from "@faustjs/next";
import { useEffect } from "react";
import "scss/main.scss";

import { client } from "client";

import App, { AppContext } from "next/app";

import type { AppProps } from "next/app";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { pageview } from "lib/gtm";
import { useRouter } from "next/router";
const blacklist_countries = [
  "PL", // Poland
];

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
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
