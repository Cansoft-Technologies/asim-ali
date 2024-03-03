import { Hero } from "components";
import Head from "next/head";

export default function Page(): JSX.Element {
  return (
    <>
      <Head>
        <>
          <title>Blocked For Legal Reasons</title>
          <meta name="robots" content="noindex,nofollow" />
        </>
      </Head>
      <main className="content content-page">
        <Hero usingFor="blocked" title={`Sorry! This Site is Restricted.`} />
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
