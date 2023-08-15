import Link from 'next/link';
import React, { useState } from 'react'
import { Button, Container, Row, Tab, Tabs } from 'react-bootstrap';
type MyProps = {
  tabData: any;
};
export default function FlexibilityTab(props: MyProps)
  {
    const { tabData } = props;
    const [key, setKey] = useState(null);
  return (
    <Container className="my-5">
      <div
        dangerouslySetInnerHTML={{
          __html: tabData?.tabHeading,
        }}
        className="text-lg text-center tab-head"
      ></div>
      {tabData?.tabDetails == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 0 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {tabData?.tabDetails?.map((tab, item) => {
                        return (
                          <Tab
                            key={item}
                            eventKey={item.toString()}
                            title={
                              <h3 className="location-tab-title">
                                {tab.title}
                              </h3>
                            }
                          >
                            <div
                              dangerouslySetInnerHTML={{
                                __html: tab.description,
                              }}
                              className="renovation-content-list"
                            ></div>
                          </Tab>
                        );
                      })}
                    </Tabs>
                  </Row>
                )}
                <div className="tab-btn">
                <Link
                          href={"/apply-now"}
                        >
                          <Button className="HeadBtn">
                            Apply <span>Now</span>
                          </Button>
                        </Link>
                </div>
    </Container>
  )
}
