import React, { useState } from 'react'
import { Container, Row, Tab, Tabs } from 'react-bootstrap';
type MyProps = {
  tabData: any;
};
export default function FlexibilityTab(props: MyProps)
  {
    const { tabData } = props;
    const [key, setKey] = useState(null);
  return (
    <Container className="my-5">
      {tabData?.tabRenovation == null ? (
                  ""
                ) : (
                  <Row className="renovation-tab-row">
                    <Tabs
                      id="controlled-tab-example"
                      activeKey={key == null ? 1 : key}
                      onSelect={(k) => setKey(k)}
                      className="mb-3 renovation"
                    >
                      {tabData?.tabRenovation.map((tab, item) => {
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
    </Container>
  )
}
