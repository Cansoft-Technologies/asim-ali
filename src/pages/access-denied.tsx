import { Hero } from "components";
import Head from "next/head";

export default function Page(): JSX.Element {
  return (
    <>
      <Head>
        <>
          <title>Access Denied!!!</title>
          <meta name="robots" content="noindex,nofollow" />
        </>
      </Head>
      <main className="content content-page">
        <Hero usingFor="blocked" title={`Sorry! Access is Denied!`} />
        <div className="wrap">
          <div>
            <div>
              <p>
                Asimali.ca is restricted in your country for legal reasons and
                no longer available.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
