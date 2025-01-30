import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import styles from "scss/components/Banner.module.scss";
import "react-multi-carousel/lib/styles.css";

type MyProps = {
  title?: any;
  description?: any;
};

const OurLenders = (props: MyProps) => {
  const { title, description } = props;
  
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  const lenderImages = [
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/amba-1.png",
        altText: "amba 1",
      },
      linkUrl: "https://www.amba.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/b2b-01.png",
        altText: "b2b 01",
      },
      linkUrl: "https://b2bbank.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/bridge-water-logo.png",
        altText: "bridge water logo",
      },
      linkUrl: "https://bridgewaterbank.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/cmba.png",
        altText: "cmba",
      },
      linkUrl: "https://www.cmbabc.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/cmls.png",
        altText: "cmls",
      },
      linkUrl: "https://www.cmls.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/dlc-logo.png",
        altText: "dlc logo",
      },
      linkUrl: "https://dominionlending.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/EquitableBank-EN-Stacked-RGB-1.png",
        altText: "EquitableBank EN Stacked RGB 1",
      },
      linkUrl: "https://www.equitablebank.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/FCT-01.png",
        altText: "FCT 01",
      },
      linkUrl: "https://fct.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/First-National-01.png",
        altText: "First National 01",
      },
      linkUrl: "https://www.firstnational.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Fisgard-01.png",
        altText: "Fisgard 01",
      },
      linkUrl: "https://fisgard.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Home-Equity-01-1.png",
        altText: "Home Equity 01",
      },
      linkUrl: "https://www.homeequitybank.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Home-Trust-01.png",
        altText: "Home Trust 01",
      },
      linkUrl: "https://www.hometrust.ca/",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/lendwise.png",
        altText: "lendwise",
      },
      linkUrl: "https://www.merixfinancial.com/#main",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/icici-01.png",
        altText: "icici 01",
      },
      linkUrl: "https://www.icicibank.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/insureline-logo.png",
        altText: "insureline logo",
      },
      linkUrl: "https://insureline.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/manulife-logo.png",
        altText: "manulife logo",
      },
      linkUrl: "https://www.manulife.ca/personal.html",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/marathon-mortgage-logo.png",
        altText: "marathon mortgage logo",
      },
      linkUrl: "https://www.marathonmortgage.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/mcap-logo.png",
        altText: "mcap logo",
      },
      linkUrl: "https://www.mcap.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/merix-logo.png",
        altText: "merix logo",
      },
      linkUrl: "https://www.merixfinancial.com",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/mpc-logo-1.png",
        altText: "mpc logo 1",
      },
      linkUrl: "https://mortgageproscan.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/reca.png",
        altText: "reca",
      },
      linkUrl: "https://www.reca.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/rfa-logo.png",
        altText: "rfa logo",
      },
      linkUrl: "https://www.rfa.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/rmg-logo.png",
        altText: "rmg logo",
      },
      linkUrl: "https://www.rmgmortgages.ca",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/Scotiabank-logo.png",
        altText: "Scotiabank logo",
      },
      linkUrl: "https://www.scotiabank.com/ca/en/personal.html",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/td-logo.png",
        altText: "td logo",
      },
      linkUrl: "https://www.td.com/ca/en/personal-banking",
    },
    {
      __typename: "Page_Homepage_TeamSection_teamImages",
      image: {
        __typename: "MediaItem",
        sourceUrl:
          "https://asimaliprod.wpengine.com/wp-content/uploads/2024/04/wealthone.png",
        altText: "wealthone",
      },
      linkUrl: "https://www.wealthonebankofcanada.com",
    },
  ];
  return (
    <>
      <Container>
        <div>
            <div
              className="team_section my-5 mt-5"
              style={{
                backgroundImage: `url('https://asimaliprod.wpengine.com/wp-content/uploads/2023/03/mortgage-broker-surrey-7.webp')`,
                backgroundSize: "cover",
              }}
            >
              {
                title && description && (
                  <div className={styles.overlay}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: title,
                  }}
                ></div>
                <div
                  className={styles.description}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                ></div>
              {
                lenderImages && (
                  <Container className="my-5 slide-div">
                {lenderImages === null ? (
                  ""
                ) : (
                  <Carousel
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                  >
                    {lenderImages?.map((slide, i) => {
                      return (
                        <div key={i} className="slide-card">
                  <a href={slide?.linkUrl}>
                  <Image
                    src={slide?.image?.sourceUrl}
                    width="150"
                    height="150"
                    alt={slide?.image?.altText}
                    style={{ objectFit: "contain" }}
                    loading="lazy"
                    quality={100}
                  />
                  </a>
                </div>
                      );
                    })}
                  </Carousel>
                )}
                </Container>
                )
              }
              </div>
                )
              }
            </div>
        </div>
      </Container>
    </>
  );
};

export default OurLenders;
