import { gql } from "@apollo/client";
import emailjs from "@emailjs/browser";
import { Footer, Header, Hero } from "components";
import ContactSection from "components/ContactSection";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { useRef, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 1582 }) {
          nodes {
            HowToApply {
              bannerTitle
              bannerBackgroundImage {
                altText
                sourceUrl
              }
              fromTitle
              fromSubtitle
              formBackgroundImage {
                altText
                sourceUrl
              }
              firstBotton {
                url
                title
              }
              secondButton {
                url
                title
              }
              applyNowContent
            }
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
          }
        }

        settingsOptions {
          AsimOptions {
            headerSettings {
              uploadLogo {
                sourceUrl
                altText
              }
            }
            footerSettings {
              socialUrl {
                facebook
                tiktok
                linkedin
                instagram
              }              
              copyrightText
              footerLeftWidget {
                title
                phoneNumber
                emailAddress
              }
              footerLogoSection {
                logoText
                logoUpload {
                  altText
                  sourceUrl
                }
              }
              footerRightWidget {
                title
                address
              }
            }
          }
        }

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 150) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems (first: 150) {
                  nodes {
                    uri
                    label
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      howApplyData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  howApplyData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

function HowtoApply(props) {
  const { settings, mainMenus, howApplyData, metaData } = props;
  const form = useRef();
  const [success, setSuccess] = useState(null);

  return (
    <>
      {howApplyData?.map((data, index) => {
        const sendEmail = (e) => {
          e.preventDefault();
          emailjs
            .sendForm(
              "service_12yqpdo",
              "template_qa4pqev",
              form.current,
              "bKO8M-uo0olOYAj7Z"
            )
            .then(
              (result) => {
                setSuccess(result.text);
              },
              (error) => {
                console.log(error.text);
              }
            );
          e.target.reset();
        };
        return (
          <div key={index}>
            <Head>
              {metaData?.map((meta,index) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link
                      rel="canonical"
                      href={
                        meta?.seo?.canonicalUrl?.endsWith("/")
                          ? meta?.seo?.canonicalUrl?.slice(0, -1)
                          : meta?.seo?.canonicalUrl
                      }
                    />
                    <meta property="og:title" content={meta?.seo?.title} />
                    <meta
                      property="og:description"
                      content={meta?.seo?.description}
                    />
                    <meta
                      property="og:image"
                      content={meta?.seo?.openGraph?.image?.url}
                    />
                  </>
                );
              })}
            </Head>
            <main className="content">
              <Header settings={settings} menuData={mainMenus} />
              <Hero
                title={data?.HowToApply?.bannerTitle}
                // heading={data?.HowToApply?.bannerTitle}
                // description={data?.HowToApply?.bannerTitle}
                bgImage={data?.HowToApply?.bannerBackgroundImage?.sourceUrl}
              />
              <div className="text-center my-5">
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.HowToApply?.applyNowContent,
                  }}
                ></div>
                <div className="button-apply my-2">
                  <a href={data?.HowToApply?.firstBotton?.url}>
                    <Button className="mx-2" variant="primary" size="lg">
                      {data?.HowToApply?.firstBotton?.title}
                    </Button>
                  </a>
                  <a href={data?.HowToApply?.secondButton?.url}>
                    <Button variant="primary" size="lg">
                      {data?.HowToApply?.secondButton?.title}
                    </Button>
                  </a>
                </div>
              </div>

              <div
                style={{
                  backgroundImage: `url("${data?.HowToApply?.formBackgroundImage?.sourceUrl}")`,
                }}
                className="howto-application"
              >
                <div className="overlay"></div>
                <Container className="py-1">
                  <Row>
                    <Col md={12}>
                      <div className="easyapplication-title">
                        <p style={{ fontWeight: 500 }} className="apply-form-title">
                          {data?.HowToApply?.fromTitle}
                        </p>
                        <p>{data?.HowToApply?.fromSubtitle}</p>
                      </div>

                      
                      <ContactSection />
                    </Col>
                    <Col md={6}></Col>
                  </Row>
                </Container>
              </div>
            </main>
            <Footer settings={settings} menuData={mainMenus} />
          </div>
        );
      })}
    </>
  );
}

export default HowtoApply;
