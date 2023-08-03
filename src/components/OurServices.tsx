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
      <div className="service-section">
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
      {/* <div className="service-bottom-section">
        <p className="service-text-after">Best Mortgage <span>Broker in Surrey</span></p>
      <Image
      className="service-image-after"
                  height={200}
                  width={300}
                  // style={{ height: "100%", width: "100%" }}
                  src={serviceData?.serviceImageAfter?.sourceUrl}
                  alt={serviceData?.serviceImageAfter?.altText}
                />
      </div> */}
    </Container>
  );
}
