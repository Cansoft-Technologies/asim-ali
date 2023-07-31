import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
type MyProps = {
  serviceData: any;
};
export default function OurServices(props: MyProps) {
  const { serviceData } = props;
  return (
    <Container className="my-5">
      <h2 className="text-start service-title">{serviceData?.serviceTitle}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: serviceData?.serviceDescription,
        }}
        className="service-description"
      ></div>
      <div className="service-section">
        {serviceData?.serviceCards?.map((data, item) => {
          return (
            <div key={item} className="service-card">
              <div className="service-card-image">
                <Image
                  width={50}
                  height={40}
                  src={data?.cardImage?.sourceUrl}
                  alt={data?.cardImage?.altText}
                />
              </div>
              <div className="service-card-text">
                <p>{data?.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
