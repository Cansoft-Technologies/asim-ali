import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import userLogo from "../../public/images/user.png";

const CustomRightArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  return (
    <button
      aria-label="Right Arrow"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow-right "
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </button>
  );
};

const CustomLeftArrow = ({ onClick, ...rest }: any) => {
  const {
    onMove,
    carouselState: { currentSlide, deviceType },
  } = rest;
  // onMove means if dragging or swiping in progress.
  return (
    <button
      aria-label="Left Arrow"
      className="react-multiple-carousel__arrow react-multiple-carousel__arrow-left "
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </button>
  );
};

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
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

type MyProps = {
  reviews: any;
};

const ClientReviews = (props: MyProps) => {
  const { reviews } = props;
  const router = useRouter();
  
  return (
    <>
      {reviews?.reviewCard?.length > 1 && (
        <Container className="review mb-5">
          <h2 className="my-5 text-start service-title mt-5">
            {reviews?.reviewTitle?.split(" ")?.[0]} {reviews?.reviewTitle?.split(" ")?.[1]} {reviews?.reviewTitle?.split(" ")?.[2]} {" "}
            <span style={{ color: "#f0b254" }}>
              {reviews?.reviewTitle?.split(" ")?.[3]} {reviews?.reviewTitle?.split(" ")?.[4]}
            </span>
          </h2>
      <div
        dangerouslySetInnerHTML={{
          __html: reviews?.reviewDescription,
        }}
        className="service-description"
      ></div>
          <Carousel
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlay={true}
            infinite={true}
            responsive={responsive}
          >
            {reviews?.reviewCard?.map((review: any, index: number) => {
              return (
                // <div key={index}>
                <div key={index} className="review-box card ml-5">
                  <div className="card-body">
                    <div>
                      <q className="review-content">
                        {review?.reviewText?.length > 150
                          ? review?.reviewText?.slice(0, 150) + "..."
                          : review?.reviewText}
                      </q>
                    </div>
                    <div className="review-body">
                      <div className="review-img">
                        <Image
                          src={
                            review?.clientImage.src
                              ? review?.clientImage.src
                              : userLogo.src
                          }
                          
                          style={{ zIndex: 0 }}
                          alt="Logo"
                          width={30}
                          height={30}
                        />
                      </div>
                      <div className="review-name">
                        <p className="">{review?.author}</p>
                      </div>
                    </div>
                  </div>
                </div>
                // </div>
              );
            })}
          </Carousel>
          <br />
          {/* <div
        dangerouslySetInnerHTML={{
          __html: reviews?.reviewDescriptionBottom,
        }}
        className="service-description"
      ></div> */}
          <div className="review-button">
          <p
            className="review-text"
            onClick={() => router.push("/testimonials")}
          >
            {" "}
            View all <span>Reviews</span>
          </p>
          </div>
        </Container>
      )}
    </>
  );
};

export default ClientReviews;
