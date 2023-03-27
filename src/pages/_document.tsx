import Document, { Html, Head, Main, NextScript } from "next/document";


const MyDocument = () => {

    

  return (
    <Html lang="en-US">
        <Head>
            {/* 
            <meta name="description" content="description" />
            <meta property="og:title" content="title" />
            <meta property="og:description" content="description" />
            <meta property="og:image" content="imageUrl" /> */}
            <link
              rel="preconnect"
              href="https://fonts.googleapis.com/css2?family=Oswald:wght@500&display=swap"
              crossOrigin="anonymous"
            />

            <link rel="manifest" href="/manifest.json" />
            <link rel="apple-touch-icon" href="/logo.png"></link>

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#12143a" />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
  )
}

export default MyDocument