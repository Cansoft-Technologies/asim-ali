import 'faust.config';
import { FaustProvider } from '@faustjs/next';
import React from 'react';
import 'scss/main.scss';
import { client } from 'client';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cache } from 'next-page-cache';


export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <FaustProvider client={client} pageProps={pageProps}>
        <Component {...pageProps} />
      </FaustProvider>
    </>
  );
}



