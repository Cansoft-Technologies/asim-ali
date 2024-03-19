import Image from "next/image";
import Link from "next/link";
import { Button, Col, Container, Row } from "react-bootstrap";

type MyProps = {
  splitImagesRight: any;
};

const SplitImageRight = (props: MyProps) => {
  const { splitImagesRight } = props;

  return (
    <>
      <section className="split_section">
        <Container>
          <Row className="flex-row-reverse">
            <Col lg={8}>
              <div className="split_image">
                <Image
                  src={splitImagesRight?.splitImage?.sourceUrl}
                  fill
                  alt={splitImagesRight?.splitImage?.altText}
                  quality={100}
                />
              </div>
            </Col>
            <Col lg={4}>
              <div className="split_text">
                <h2
                  dangerouslySetInnerHTML={{
                    __html: splitImagesRight?.splitTitle,
                  }}
                ></h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html: splitImagesRight?.splitDescription,
                  }}
                ></div>
                {splitImagesRight?.splitButton == null ? (
                  ""
                ) : (
                  <Link
                    href={`${
                      splitImagesRight?.splitButton?.url?.endsWith("/")
                        ? splitImagesRight?.splitButton?.url?.slice(0, -1)
                        : splitImagesRight?.splitButton?.url
                    }`}
                  >
                    <Button className="SplitBtn">
                      Get <span>Approved</span>
                    </Button>
                  </Link>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default SplitImageRight;
