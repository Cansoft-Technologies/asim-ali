import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface MyProps {
  fname: string;
  lname: string;
}

export const AutoReply = ({
  fname,
  lname,
}: MyProps) => (
  <Html>
    <Head />
    <Preview>
    Thank you so much for contacting us on our website {fname}
    </Preview>
    <Body style={main}>
        <Heading style={h1}>
        Thank you so much for contacting us on our website {fname} 
        </Heading>

        <Text style={{ ...text, marginBottom: "14px" }}>Hello {fname} {lname},</Text>
        <Text style={{ ...text, marginBottom: "14px" }}>
        Thank you so much for contacting us on our website {fname}, we&apos;re looking forward to providing you with the mortgage advice and service all of our clients and referrals have come to expect. 
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>
        A little about our brokerage: We&apos;re a full-service mortgage broker, specializing in getting you the best rate and most suitable mortgage for your needs while making sure you understand the mortgage process as well as your actual mortgage. We do this so you can feel comfortable with your home financing. We also go over how to take advantage of mortgage options for you to pay less interest and become mortgage free sooner.
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>
        Do you have time for a chat or a meeting this week? We&apos;re generally available with a day or two notice. We work evenings and weekends as well - we know how important that is for people who work 9-5.
        </Text>

        <Text style={footer}>
          Best wishes,
        </Text>
        <Text style={footer}>
        Asim Ali Mortgage Team
        </Text>
    </Body>
  </Html>
);

export default AutoReply;

const main = {
  backgroundColor: "#ffffff",
};

const container = {
  paddingLeft: "12px",
  paddingRight: "12px",
  // width: "100%",
};

const h1 = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "24px",
  fontWeight: "bold",
  margin: "10px 0",
  padding: "0",
};

const link = {
  color: "#2754C5",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  textDecoration: "underline",
};

const text = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "14px",
  margin: "5px 0",
};
const span = {
  color: "#333",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "16px",
  fontWeight: "bold",
};

const footer = {
  color: "blueviolet",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  fontSize: "16px",
  lineHeight: "22px",
  marginTop: "12px",
  marginBottom: "24px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
};
