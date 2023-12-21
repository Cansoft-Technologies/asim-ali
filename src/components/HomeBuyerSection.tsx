import React, { useState } from "react";
import { Container } from "react-bootstrap";

type MyProps = {
  homebuyerData: any;
};
export default function HomeBuyerSection(props: MyProps) {
  const { homebuyerData } = props;
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sliceDescription = (description: string, maxLength: number): string => {
    // return `${description.slice(0, maxLength)}...`;
    const words = description.split(" ");
    if (words.length <= maxLength) {
      return description;
    } else {
      const slicedWords = words.slice(0, maxLength).join(" ");
      return `${slicedWords}...`;
    }
  };
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
              <div
                onMouseOver={() => setHoveredIndex(index)}
                onMouseOut={() => setHoveredIndex(null)}
                key={index}
                className="card text-center"
              >
                <div className="card-index">
                  <p className="">{index + 1}</p>
                </div>
                <h3 className="card-title">{data?.title}</h3>
                <div className="card-body card-pc text-center">
                  {index === hoveredIndex ? (
                    <div
                      className="text-center"
                      dangerouslySetInnerHTML={{
                        __html: data?.description,
                      }}
                    ></div>
                  ) : (
                    <div>
                      <div
                        className="text-center"
                        dangerouslySetInnerHTML={{
                          __html: sliceDescription(data?.description, 20),
                        }}
                      ></div>
                    </div>
                  )}
                </div>
                <div className="card-body card-mobile text-center">
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
