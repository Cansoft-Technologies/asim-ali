import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  advisorData: any;
};
export default function HomeBuyerNewBC(props: MyProps) {
  const { advisorData } = props;
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [colGap, setColGap] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (
      advisorData?.advisorCards?.length === 5 &&
      typeof window !== "undefined" &&
      windowWidth > 1200
    ) {
      setColGap({ columnGap: "60px" });
    }
  }, [windowWidth, advisorData?.advisorCards?.length]);
  return (
    <section className="my-5">
      <Container>
        <div
          className="text-center"
          dangerouslySetInnerHTML={{
            __html: advisorData?.advisorTitle,
          }}
        ></div>
        <p
          className="text-center mx-4"
          dangerouslySetInnerHTML={{
            __html: advisorData?.advisorDescriptionTop,
          }}
        ></p>
        <div
          className={`row row-cols-1 row-cols-md-4 g-4 homebuyer-items-bc mt-5 `}
          style={colGap}
        >
          {advisorData?.advisorCards?.map((data, index) => {
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
