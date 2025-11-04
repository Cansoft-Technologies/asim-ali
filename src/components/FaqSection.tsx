import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Row, Tab, Tabs } from "react-bootstrap";

const FaqSection = ({ faqData }) => {
    const [key, setKey] = useState(null);
  return (
    <Container className="py-12">
      <h2 className="text-center">{faqData?.faqTitle}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: faqData?.faqDescription,
        }}
        className="text-lg text-center"
      ></div>
      {/* question and answer */}
      {faqData?.faqAccordion?.length > 0 && (
        <Row className="renovation-tab-row">
          <Tabs
            id="controlled-tab-example"
            activeKey={key == null ? 0 : key}
            onSelect={(k) => setKey(k)}
            className="mb-3 renovation"
          >
            {faqData?.faqAccordion?.map((tab, item) => {
              return (
                <Tab
                  key={item}
                  eventKey={item.toString()}
                  title={<h3 className="location-tab-title">{tab.question}</h3>}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: tab.answer,
                    }}
                    className="renovation-content-list"
                  ></div>
                </Tab>
              );
            })}
          </Tabs>
        </Row>
      )}
      {/* CTA */}
      {faqData?.faqCtaText && (
        <div className="tb-btn">
          <Link href={faqData?.faqCtaUrl || "/"}>
            <Button className="HeadBtn">{faqData?.faqCtaText}</Button>
          </Link>
        </div>
      )}
    </Container>
  );
};

export default FaqSection;
