import "faust.config";

import { FaustProvider } from "@faustjs/next";
import React, { useEffect } from "react";
import "scss/main.scss";

import { client } from "client";

import type { AppProps } from "next/app";

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Script from "next/script";
import { TRACKING_ID } from "./../../utils/variables";
import { useRouter } from "next/router";
import { pageview } from "lib/gtm";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
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
      <Script
        defer
        src={`https://www.googletagmanager.com/gtag/js?id=${TRACKING_ID}`}
        strategy="worker"
      />
      <Script id="google-analytics" strategy="worker">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${TRACKING_ID}');
        `}
      </Script>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}
