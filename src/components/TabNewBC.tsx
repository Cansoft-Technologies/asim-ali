import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Row, Tab, Tabs } from "react-bootstrap";
type MyProps = {
  tabData: any;
  buttonText?: any;
  buttonUrl?: any;
};
export default function TabNewBC(props: MyProps) {
  const { tabData, buttonText, buttonUrl } = props;
  const [key, setKey] = useState(null);
  return (
    <Container className="my-5">
      <div style={{ padding: "0 10px", maxWidth: "1100px", margin: "0 auto" }}>
        <div
          dangerouslySetInnerHTML={{
            __html: tabData?.tabHeading,
          }}
          className="text-lg text-center tab-head"
        ></div>
        <div
          dangerouslySetInnerHTML={{
            __html: tabData?.tabDescription,
          }}
          className={`${buttonText ? "" : "mb-5"} text-center`}
        ></div>
        {buttonText && (
          <div
            className="tab-btn-left mb-5"
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Link href={buttonUrl}>
              <Button className="HeadBtn">{buttonText}</Button>
            </Link>
          </div>
        )}
      </div>
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
                  title={<p className="location-tab-title">{tab.title}</p>}
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
      {/* <div className="tab-btn">
        <Link href={"/apply-now"}>
          <Button className="HeadBtn">
            Apply <span>Now</span>
          </Button>
        </Link>
      </div> */}
    </Container>
  );
}
