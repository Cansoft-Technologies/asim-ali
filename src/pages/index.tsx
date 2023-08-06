import dynamic from 'next/dynamic';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
const CTA = dynamic(() => import('../components/CTA'));
const Banner = dynamic(() => import('../components/Banner'));
const WeHelp = dynamic(() => import('../components/WeHelp'));
const Team = dynamic(() => import('components/Team'));
const Meeting = dynamic(() => import('components/Meeting'));
const PartnerLogo = dynamic(() => import('components/PartnerLogo'));
const SplitImageLeft = dynamic(() => import('../components/SplitImageLeft'));
const FAQ = dynamic(() => import('components/FAQ'));
const Gallery = dynamic(() => import('components/Gallery'));
const FlexabilitySlider = dynamic(() => import('components/FlexabilitySlider'));
const SplitImageRight = dynamic(() => import('../components/SplitImageRight'));
import { apolloClient } from "../lib/apollo";
import { gql } from '@apollo/client';
import ClientReviews from 'components/ClientReviews';
import MortgageAdvisor from 'components/MortgageAdvisor';
import { Container } from 'react-bootstrap';
import ContactSection from 'components/ContactSection';

const MobileBanner = dynamic(() => import('components/MobileBanner'));



export async function getStaticProps() {

  const { data } = await apolloClient.query({
    query: gql`query{
      pages(where: {id: 14}) {
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
        HomeLandingPage {
          homeSliderSection {
            homeSlider {
              sliderTitle
              sliderSubtitle
              sliderDescription
              sliderImage {
                sourceUrl
              }
              mobileImage {
                sourceUrl
              }
              sliderButtonUrl {
                url
              }
            }
          }
          weHelpSection {
            helpTitle
            helpDescription
            hideSection
            helpImage {
              mediaItemUrl
            }
          }
         partnerLogoSection {
            hideSection
            partnerLogo {
              sourceUrl
              altText
            }
          }
         teamSection {
            teamTitle
            teamDescription
            hideSection
            teamImage {
              sourceUrl
              altText
            }
          }
          meetingSection {
            meetingTitle
            meetingDescription
            hideSection
            meetingImage {
              sourceUrl
              altText
            }
          }
          splitImageLeftSection {
            splitTitle
            splitDescription
            splitImage {
              altText
              sourceUrl
            }
            hideSection
            splitButton {
              url
              title
            }
          }
          flexabilitySlider {
            sliderTitle
            sliderSubtitle
            sliderDescription
            sliderImage {
              altText
              sourceUrl
            }
            sliderButtonUrl {
              url
            }
          }
          splitImageRightSection {
            splitTitle
            splitDescription
            splitImage {
              altText
              sourceUrl
            }
            hideSection
            splitButton {
              url
              title
            }
          }
          gallery {
            hideSection
            galleryImage1 {
              altText
              sourceUrl
            }
            galleryImage2 {
              altText
              sourceUrl
            }
            galleryImage3 {
              altText
              sourceUrl
            }
            galleryImage4 {
              altText
              sourceUrl
            }
            galleryImage5 {
              altText
              sourceUrl
            }
          }
          advisorSection {
            advisorTitle
            advisorDescriptionBottom
            advisorImage {
              sourceUrl
              altText
            }
            advisorCards{
              title
              description
            }
          }
          faqSection {
            hideSection
            faqTitle
            faqSubitle
            faqImage {
              altText
              sourceUrl
            }
            faqAccordion {
              question
              answer
            }
          }
          callToActionSection {
            hideSection
            actionTitle
            actionLink {
              url
              title
            }
            actionBackgroundImage {
              sourceUrl
            }
          }
          homeContactSection {
            title
            description
          }
          reviewSection {
            reviewTitle
            reviewDescription
            reviewCard{
              author
              reviewText
              clientImage{
                sourceUrl
                altText
              }
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
}`,
  });

  return {
    props: {
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
      metaData: data?.pages?.nodes,
      sliders: data?.pages?.nodes,
      msliders: data?.pages?.nodes,
      helps: data?.pages?.nodes,
      logos: data?.pages?.nodes,
      teamData: data?.pages?.nodes[0]?.HomeLandingPage?.teamSection,
      meetings: data?.pages?.nodes[0]?.HomeLandingPage?.meetingSection,
      advisorData: data?.pages?.nodes[0]?.HomeLandingPage?.advisorSection,
      flexsliders: data?.pages?.nodes,
      splitImagesRight: data?.pages?.nodes,
      images: data?.pages?.nodes,
      reviewData: data?.pages?.nodes[0]?.HomeLandingPage?.reviewSection,
      contactData: data?.pages?.nodes[0]?.HomeLandingPage?.homeContactSection,
    },
    revalidate: 60
  };
}

type MyProps = {
  settings: any;
  mainMenus: any;
  metaData: any;
  sliders: any;
  msliders: any;
  helps: any;
  logos: any;
  teamData: any;
  meetings: any;
  advisorData: any;
  flexsliders: any;
  splitImagesRight: any;
  images: any;
  reviewData: any;
  contactData: any;
};
const schema = {
  "@context": "https://schema.org/",
  "@type": "Product",
  name: "Mortgage Brokers",
  image: [
    "https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/mortgage-broker-surrey-9.webp",
    "https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/home-banner.webp",
    "https://hy3nzzcq6pe8xlv2r634wluzm.js.wpenginepowered.com/wp-content/uploads/2023/03/mortgage-broker-surrey-8.webp",
  ],
  description:
    "Asim Ali and his team of the best mortgage brokers in Surrey will help you with the best mortgage rates available.",
  sku: "CAN1971SEO",
  mpn: "925872",
  brand: {
    "@type": "Brand",
    name: "Asim Ali",
  },
  review: {
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
    },
    author: {
      "@type": "Person",
      name: "Ghazala Sarwar",
    },
  },
  offers: {
    "@type": "Offer",
    url: "https://asimali.ca/",
    priceCurrency: "CAD",
    price: "499",
    priceValidUntil: "2020-12-31",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    bestRating: "5",
    ratingCount: "213",
  },
};

export default function Page(props: MyProps) {
  const { settings, mainMenus, metaData, sliders, msliders, helps, logos, teamData, meetings, advisorData, flexsliders, splitImagesRight, images, reviewData,contactData } = props;


  return (
    <>
      <Head>
        {metaData?.map((meta) => {

          return (
            <>
              <noscript>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        </noscript>
              {meta?.seo?.jsonLd?.raw}

              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link rel="canonical" href={meta?.seo?.canonicalUrl} />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta property="og:description" content={meta?.seo?.description} />
              <meta property="og:image" content={meta?.seo?.openGraph?.image?.url} />
            </>
          )
        })}
      </Head>
      <main className="content">
        <Header settings={settings} mainMenus={mainMenus} />
        <div className='desktop-banner'>
          <Banner sliders={sliders} />
        </div>
        <div className='mobile-banner'>
          <MobileBanner msliders={msliders} />
        </div>
        <WeHelp helps={helps} />
        <PartnerLogo logos={logos} />
        <Team teams={teamData} />
        <ContactSection />
        <Meeting meetings={meetings} />
        <MortgageAdvisor advisorData={advisorData}/>
        <FlexabilitySlider flexsliders={flexsliders} />
        <SplitImageRight splitImagesRight={splitImagesRight} />
        <Gallery images={images} />
        <ClientReviews reviews={reviewData} />
        <CTA />
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
