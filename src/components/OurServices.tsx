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
      <div className="service-top-section">
      <div className="service-top-card">
      <h2 className="text-start service-title text-center">{serviceData?.serviceTitle}</h2>
        <div
        dangerouslySetInnerHTML={{
          __html: serviceData?.serviceDescription,
        }}
        className="service-description"
      ></div>
      </div>
      </div>
      <div className="service-section">
        {serviceData?.serviceCards?.map((data, item) => {
          return (
            <div key={item} className="service-card">
              <h3>{data.title}</h3>
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
