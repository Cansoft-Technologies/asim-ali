import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import React, { useEffect } from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css'

export default function MyApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js');
    }
  }, []);

  return (
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}



