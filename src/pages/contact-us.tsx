import { gql } from "@apollo/client";
import {
  faEnvelope,
  faMapMarker,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Footer, Header } from "components";
import ContactSection from "components/ContactSection";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import { Col, Container, Row } from "react-bootstrap";
import { Hero } from "../components";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 245 }) {
          nodes {
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
            contactPage {
              contactBannerTitle
              contactBannerHeading
              contactBannerDescription
              phoneNumber
              eMail
              address
              addressMap
              contactBannerBackgroundImage {
                altText
                sourceUrl
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
            menuItems(first: 50) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems {
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

  return {
    props: {
      contactData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  contactData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Contact = (props: MyProps) => {
  const { settings, mainMenus, contactData, metaData } = props;

  return (
    <>
      {contactData?.map((contact, index) => {
        return (
          <div key={index}>
            <Head>
              {metaData?.map((meta) => {
                return (
                  <>
                    <title>{meta?.seo?.title}</title>
                    <meta name="description" content={meta?.seo?.description} />
                    <link rel="canonical" href={meta?.seo?.canonicalUrl} />
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
            <Header settings={settings} mainMenus={mainMenus} />

            <main className="content">
              <Hero
                title={contact?.contactPage?.contactBannerTitle}
                heading={contact?.contactPage?.contactBannerHeading}
                description={contact?.contactPage?.contactBannerDescription}
                bgImage={
                  contact?.contactPage?.contactBannerBackgroundImage?.sourceUrl
                }
              />
              <div className="contact-page mt-5">
                <Container>
                  <Row>
                    {contact?.contactPage?.address == null &&
                    contact?.contactPage?.eMail == null &&
                    contact?.contactPage?.phoneNumber == null ? (
                      ""
                    ) : (
                      <Col xs={12} lg="4">
                        <h1>Get in Touch</h1>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faMapMarker} />
                          </div>
                          <h2>Address</h2>
                          <p>{contact?.contactPage?.address}</p>
                        </div>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faPhone} />
                          </div>
                          <h2>Call Us</h2>
                          <a href={`tel: ${contact?.contactPage?.phoneNumber}`}>
                            {contact?.contactPage?.phoneNumber}
                          </a>
                        </div>

                        <div className="contact-item">
                          <div className="contact-icon">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </div>
                          <h2>E-mail</h2>
                          <a href={`mailto:${contact?.contactPage?.eMail}`}>
                            {contact?.contactPage?.eMail}
                          </a>
                        </div>
                      </Col>
                    )}

                    <Col xs={12} lg="8">
                      <ContactSection/>
                    </Col>
                  </Row>
                </Container>
                <div
                  dangerouslySetInnerHTML={{
                    __html: contact?.contactPage?.addressMap,
                  }}
                  className="mt-5"
                ></div>
              </div>
            </main>
            <Footer settings={settings} mainMenus={mainMenus} />
          </div>
        );
      })}
    </>
  );
};

export default Contact;
