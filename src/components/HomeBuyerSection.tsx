import Image from "next/image";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  homebuyerData: any;
};
export default function HomeBuyerSection(props: MyProps) {
  const { homebuyerData } = props;
  console.log(homebuyerData);
  return (
    <section className="my-5">
      <Container>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: homebuyerData?.advisorTitle,
          }}
        ></div>
        <div className="row row-cols-1 row-cols-md-4 g-4 homebuyer-items mt-5">
          {homebuyerData?.advisorCards?.map((data, index) => {
            return (
              <div key={index} className="card text-center">
                <div className="card-index">
                  <p className="">{index + 1}</p>
                </div>
                  <h3 className="card-title">{data?.title}</h3>
                <div className="card-body text-center">
                  <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                    ></div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
