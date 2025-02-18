import Link from "next/link";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import styles from "scss/components/CalculatorSlider.module.scss";
import "react-multi-carousel/lib/styles.css";

type CalculatorItem = {
  title: string;
  link: string;
};

const CalculatorSlider = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  const calculators: CalculatorItem[] = [
    {
      title: "Mortgage Payment Calculator",
      link: "/mortgage-calculator",
    },
    // {
    //   title: "Mortgage Affordability Calculator",
    //   link: "/renewal-calculator",
    // },
    {
      title: "Mortgage Renewal Calculator",
      link: "/mortgage-renewal-calculator",
    },
    {
      title: "Mortgage Refinance Calculator",
      link: "/mortgage-refinance-calculator-bc",
    },{
      title: "Mortgage Down Payment Calculator",
      link: "/down-payment-calculator",
    },
    // {
    //   title: "Land Transfer Tax Calculator",
    //   link: "/down-payment-calculator",
    // },
    {
      title: "Reverse Mortgage Calculator",
      link: "/reverse-mortgage-calculator",
    },
  ];

  return (
    <Container className="slide-div">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        customTransition="all .5"
        transitionDuration={500}
        containerClass={styles.carouselContainer}
        itemClass={styles.carouselItem}
      >
        {calculators.map((calculator, index) => (
          <div key={index} className={styles.calculatorCard}>
            <div className={styles.cardContent}>
              <p className={styles.cardTitle}>{calculator.title}</p>
              {/* <p className={styles.cardSubtitle}>{calculator.subtitle}</p> */}
              <Link href={calculator.link} className={styles.cardLink}>
                Go to {calculator.title.split(" ")[1]} Calculator
              </Link>
            </div>
          </div>
        ))}
      </Carousel>
    </Container>
  );
};

export default CalculatorSlider;