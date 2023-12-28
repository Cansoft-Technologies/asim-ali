import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MyProps {
  fname: string;
  lname: string;
}

const AutoReply = ({ fname, lname }: MyProps) => (
  <Html>
    <Head />
    <Preview>
      Thank you so much for contacting us on our website {fname} {lname}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Hr style={hr} />
          <Text style={heading}>
            Thank you so much for contacting us on our website {fname} {lname}
          </Text>
          <Text style={paragraph}>Dear {fname}</Text>
          <Text style={paragraph}>
            Thank you so much for contacting us on our website {fname},
            we&apos;re looking forward to providing you with the mortgage advice
            and service all of our clients and referrals have come to expect. 
          </Text>
        </Section>
        <Section style={paragraphList}>
          <Text style={paragraph}>
            A little about our brokerage: We&apos;re a full-service mortgage
            broker, specializing in getting you the best rate and most suitable
            mortgage for your needs while making sure you understand the
            mortgage process as well as your actual mortgage. We do this so you
            can feel comfortable with your home financing. We also go over how
            to take advantage of mortgage options for you to pay less interest
            and become mortgage free sooner.
          </Text>
        </Section>
        <Section style={paragraphContent}>
          <Text style={paragraph}>
            Do you have time for a chat or a meeting this week? We&apos;re
            generally available with a day or two notice. We work evenings and
            weekends as well - we know how important that is for people who work
            9-5.
          </Text>
          <Hr style={hr} />
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Best wishes,</Text>
          <Text style={{ ...paragraph, fontSize: "20px", ...headerBlue }}>
            Asim Ali Mortgage Team
          </Text>
        </Section>
        <Container style={footerContainer}>
          <Row style={{ ...footSecond, marginTop: 30 }}>
            <Column>
              <Img
                width="150"
                height="32"
                src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/logo.png"
              />
              <Text
                style={{ ...paragraph, color: "#12143A",fontSize: "16px", }}
              >
                Client Care Data Analyst
              </Text>
              <Row>
                <Link
                href="tel:+1 (604) 591 3590"
                style={{ ...footFirst}}
              >
                <Img
                style={{marginRight: "10px"}}
                  width="18"
                  height="18"
                  src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/iphone-se-50.png"
                />
                +1 (604) 591 3590
              </Link>
              </Row>
              <Row>
              <Column style={{ ...footFirst,marginTop: "10px" }}>
                  <Link href="mailto:admin@asimali.ca" style={footFirst}>
                    <Img
                    style={{marginRight: "10px"}}
                      width="18"
                      height="18"
                      src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/email-48.png"
                    />
                    admin@asimali.ca
                  </Link>
                  <Link href="https://asimali.ca" style={{ ...footFirst, marginLeft: "20px" }}>
                    <Img
                    style={{marginRight: "10px"}}
                      width="18"
                      height="18"
                      src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/web-24.png"
                    />
                    www.asimali.ca
                  </Link>
                </Column>
              </Row>
            </Column>
            <Column style={{ marginTop: "20px" }}>
              <Img
                style={{ display: "block", margin: "0 50px" }}
                width="50"
                height="50"
                src="http://asimaliprod.wpengine.com/wp-content/uploads/2022/11/favicon.png"
              />
              <Text style={{ ...paragraph, color: "#12143A",fontSize: "14px", }}>
                Asim Ali Mortgage Team
              </Text>
            </Column>
          </Row>
          <Section
            style={{ ...paragraphContent, paddingBottom: 30, marginTop: 30 }}
          >
            <Text
              style={{
                ...paragraph,
                fontSize: "12px",
                textAlign: "center",
                margin: 0,
                color: "#12143A",
                paddingBottom: 10,
              }}
            >
              © {new Date().getFullYear()} Asim Ali 7327 137 St Suite 311,
              Surrey, BC V3W 1A4, Canada
            </Text>
          </Section>
        </Container>
      </Container>
    </Body>
  </Html>
);
export default AutoReply;
const main = {
  backgroundColor: "#dbddde",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const sectionLogo = {
  padding: "0 40px",
};
const footFirst = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "5x",
  color: "#12143A",
  fontSize: "16px",
};
const footSecond = {
  padding: "20px",
  fontSize: "16px",
};

const headerBlue = {
  color: "#0F2650",
};

const container = {
  // margin: "30px auto",
  width: "100%",
  backgroundColor: "#fff",
  borderRadius: 5,
  overflow: "hidden",
};
const footerContainer = {
  width: "100%",
  backgroundImage:
    "url(http://asimaliprod.wpengine.com/wp-content/uploads/2023/03/mortgage-broker-surrey-7.webp)",
  overflow: "hidden",
};
const footComponent = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
};
const containerContact = {
  width: "90%",
  borderRadius: "5px",
  overflow: "hidden",
  paddingLeft: "20px",
};

const heading = {
  fontSize: "14px",
  lineHeight: "26px",
  fontWeight: "700",
  color: "#004dcf",
};

const paragraphContent = {
  padding: "0 40px",
};

const paragraphList = {
  paddingLeft: 40,
};

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
  color: "#3c4043",
};

const link = {
  ...paragraph,
  color: "#004dcf",
};

const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};
