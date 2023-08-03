import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
type MyProps = {
  serviceData: any;
};
export default function OurServices(props: MyProps) {
  const { serviceData } = props;
  return (
    <Container className="mt-5 mb-5">
      <div className="service-top-section">
        <div className="service-top-card">
          <div
            dangerouslySetInnerHTML={{
              __html: serviceData?.serviceTitle,
            }}
            className="text-start service-title text-center"
          ></div>
          <div
            dangerouslySetInnerHTML={{
              __html: serviceData?.serviceDescription,
            }}
            className="service-description"
          ></div>
        </div>
      </div>
      <div className="service-section mb-5">
        {serviceData?.serviceCards?.map((data, item) => {
          return (
            <div key={item} className="service-card">
              <div className="service-card-image">
                <Image
                  width={30}
                  height={30}
                  src={data?.cardImage?.sourceUrl}
                  alt={data?.cardImage?.altText}
                />
                <h3>{data.title}</h3>
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.description,
                }}
                className="service-card-text"
              ></div>
            </div>
          );
        })}
      </div>
      <div className="service-bottom-section">
      <div className="service-text-after">
      <p><FontAwesomeIcon icon={faQuoteLeft} /> What {""}<br/>We <span>Do </span><span><FontAwesomeIcon icon={faQuoteRight} /></span></p>
      </div>
      <Image
      className="service-image-after"
                  height={200}
                  width={300}
                  style={{ objectFit: "cover" }}
                  src={serviceData?.serviceImage?.sourceUrl}
                  alt={serviceData?.serviceImageAfter?.altText}
                />
      </div>
    </Container>
  );
}
