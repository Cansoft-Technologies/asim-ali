import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

type MyProps = {
  splitImagesLeft: any;
};

const SplitImageLeft = (props: MyProps) => {
  const { splitImagesLeft } = props;

  return (
    <>
      <section className="split_section my-5 ">
        <Container>
          <Row>
            <Col lg={8}>
              <div className="split_image">
                <Image
                  src={splitImagesLeft?.splitImage?.sourceUrl}
                  fill
                  alt={splitImagesLeft?.splitImage?.altText}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="split_text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: splitImagesLeft?.splitTitle,
                  }}
                ></div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: splitImagesLeft?.splitDescription,
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SplitImageLeft;
