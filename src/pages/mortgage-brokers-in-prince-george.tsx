import { gql } from '@apollo/client';
import { Hero } from 'components';
import HomeBuyerSection from 'components/HomeBuyerSection';
import MortgageAdvisor from 'components/MortgageAdvisor';
import MortgageFeatured from 'components/MortgageFeatured';
import ServiceSection from 'components/ServiceSection';
import Head from 'next/head';
import Image from 'next/image';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { apolloClient } from "../lib/apollo";



export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 3787}) {
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
          jsonLd {
            raw
          }
        }
        NewPrince {
          serviceBannerTitle
              serviceBannerHeading
              serviceBannerDescription
              serviceBannerImage {
                altText
                sourceUrl
              }
              aboutText
              aboutImage {
                altText
                sourceUrl
              }
          featuredTextLeft
          featuredTextRight
          featuredImageRight {
            altText
            sourceUrl
          }
          featuredImageLeft {
            altText
            sourceUrl
          }
          mortgageServiceSection {
            advisorTitle
            advisorDescriptionTop
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          tipsTitle
          tipsDescription
          tipsLeftText
          tipsRightText
          tipsImageRight {
            altText
            sourceUrl
          }
          tipsImageLeft {
            altText
            sourceUrl
          }
          homebuyerSection {
            advisorTitle
            advisorCards{
              title
              description
              image{
                sourceUrl
                altText
              }
            }
          }
          advisorSection {
            advisorTitle
            advisorDescriptionTop
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          mortgageBenifits {
            advisorTitle
            advisorDescriptionTop
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          homeContactSection {
            title
            description
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
          uploadLogoMobile {
            sourceUrl
            altText
          }
        }
        generalSettings {
            schemaProductRating
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

    menus(where: {location: PRIMARY}) {
      nodes {
        name
        slug
        menuItems(first: 50){
          nodes {
            url
            target
            parentId
            label
            cssClasses
            description
            id
            childItems (first: 50) {
              nodes {
                uri
                label
              }
            }
          }
        }
      }
    }
}`,
  });
  if(!data){
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    }
  }
  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      advisorData: data?.pages?.nodes[0]?.NewPrince?.advisorSection,
      serviceBannerData: data?.pages?.nodes[0]?.NewPrince,
      mortgageBenefitsData: data?.pages?.nodes[0]?.NewPrince?.mortgageBenifits,
      mortgageServiceData: data?.pages?.nodes[0]?.NewPrince?.mortgageServiceSection,
      featuredTextLeft: data?.pages?.nodes[0]?.NewPrince?.featuredTextLeft,
      featuredImageLeft: data?.pages?.nodes[0]?.NewPrince?.featuredImageLeft,
      featuredImageRight: data?.pages?.nodes[0]?.NewPrince?.featuredImageRight,
      featuredTextRight: data?.pages?.nodes[0]?.NewPrince?.featuredTextRight,
      contactData: data?.pages?.nodes[0]?.NewPrince?.homeContactSection,
      homebuyerSectionData: data?.pages?.nodes[0]?.NewPrince?.homebuyerSection,
      tipsTitle: data?.pages?.nodes[0]?.NewPrince?.tipsTitle,
      tipsDescription: data?.pages?.nodes[0]?.NewPrince?.tipsDescription,
      tipsLeftText: data?.pages?.nodes[0]?.NewPrince?.tipsLeftText,
      tipsRightText: data?.pages?.nodes[0]?.NewPrince?.tipsRightText,
      tipsImageRight: data?.pages?.nodes[0]?.NewPrince?.tipsImageRight,
      tipsImageLeft: data?.pages?.nodes[0]?.NewPrince?.tipsImageLeft,
    },
    revalidate: 60
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  contactData: any;
  featuredTextLeft: any;
  featuredImageLeft: any;
  featuredImageRight: any;
  featuredTextRight: any;
  mortgageServiceData: any;
  tipsImageRight  : any;
  tipsTitle: any;
  tipsDescription: any;
  tipsLeftText: any;
  tipsRightText: any;
  tipsImageLeft: any;
  mortgageBenefitsData: any;
  homebuyerSectionData: any;
  serviceBannerData: any;
  advisorData: any;
};

export default function NewPrince(props: MyProps) {
  const { settings, mainMenus, metaData,contactData,featuredTextLeft,featuredImageLeft,featuredImageRight,featuredTextRight,mortgageServiceData,tipsImageRight, tipsLeftText, tipsRightText, tipsDescription, tipsTitle,tipsImageLeft,homebuyerSectionData, serviceBannerData,advisorData,mortgageBenefitsData} = props;

console.log(settings);
  return (
    <>
      <Head>
        {metaData?.map((meta) => {

          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl?.endsWith("/") ? meta?.seo?.canonicalUrl?.slice(0, -1) : meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
            </>
          )
        })}
      </Head>
        <Header settings={settings} mainMenus={mainMenus} />
      <main className="content">
        {serviceBannerData?.serviceBannerTitle == null ? (
                ""
              ) : (
                <Hero
                  title={serviceBannerData?.serviceBannerTitle}
                  heading={serviceBannerData?.serviceBannerHeading}
                  description={serviceBannerData?.serviceBannerDescription}
                  bgImage={serviceBannerData?.serviceBannerImage?.sourceUrl}
                />
              )}
              <Container className="mb-5">
              <Row className="coquitlam-grid my-5">
                  <Col md={7}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: serviceBannerData?.aboutText,
                      }}
                    ></div>
                  </Col>
                  <Col md={5}>
                    <Image
                      src={serviceBannerData?.aboutImage?.sourceUrl}
                      alt={serviceBannerData?.aboutImage?.altText}
                      width="390"
                      height="400"
                      priority={true}
                      style={{ width: "100%", objectFit: "cover" }}
                    />
                  </Col>
                </Row>
                </Container>
                <MortgageAdvisor advisorData={mortgageBenefitsData}/>
                    <ServiceSection textLeft={featuredTextLeft} textRight={featuredTextRight} imageLeft={featuredImageLeft} imageRight={featuredImageRight}/>
                    <Container className="mb-5 px-3 py-3" style={{border: "1px solid #f0b254", borderRadius: "10px"}}>
                    <h2 className="text-center">
                      {tipsTitle}
                    </h2>
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: tipsDescription,
                      }}
                    ></div>
                  </Container>
                      <ServiceSection textLeft={tipsLeftText} textRight={tipsRightText} imageLeft={tipsImageLeft} imageRight={tipsImageRight}/>
        <MortgageAdvisor advisorData={advisorData}/>
        <MortgageFeatured advisorData={mortgageServiceData}/>
        <HomeBuyerSection homebuyerData={homebuyerSectionData} />
        <Container className="mb-5">
        <h2 className="text-center service-title">{contactData?.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: contactData?.description,
        }}
        className="text-lg text-start"
      ></div>
        </Container>
      </main>
      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  );
}
