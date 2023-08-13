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
  mail: string;
  phone: string;
  referred?: string;
  homeowner?: string;
  city?: string;
  province: string;
  mortgage?: string;
  property?: string;
  balance?: string;
  preferred?: string;
  message: string;
  amount?: string;
  contact?: string;
  about?: string;
}

export const ApplyNowEmail = ({
  fname,
  lname,
  mail,
  phone,
  referred,
  homeowner,
  city,
  province,
  mortgage,
  property,
  balance,
  amount,
  preferred,
  message,
  about,
  contact,
}: MyProps) => (
  <Html>
    <Head />
    <Preview>
      New Form Submission: {fname} {lname}
    </Preview>
    <Body style={main}>
        <Heading style={h1}>
        New Form Submission: {fname} {lname} 
        </Heading>

        <Text style={{ ...text, marginBottom: "14px" }}>Dear Asim Ali,</Text>
        <Text style={{ ...text, marginBottom: "14px" }}>
          A new form submission has been received with the following details:
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>
        <Text style={{...span}}>Name: </Text>{fname} {lname}
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>Email: {mail}</Text>
        {phone?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}><Text style={{...span}}>Phone:</Text> {phone}</Text>
        )}
        {contact?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>How Should We Contact You?:</Text> {contact}
          </Text>
        )}
        {about?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Please Contact Me About:</Text> {about}
          </Text>
        )}
        {referred?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Referred by:</Text> {referred}
          </Text>
        )}
        {homeowner?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Homeowner:</Text> {homeowner}
          </Text>
        )}
        {city?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}><Text style={{...span}}>City:</Text> {city}</Text>
        )}
        {province?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Province:</Text> {province}
          </Text>
        )}
        {mortgage?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Do You Have A Mortgage:</Text> {mortgage} $
          </Text>
        )}
        {property?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Property Value:</Text> {property} $
          </Text>
        )}
        {balance?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Current Mortgage Balance:</Text> {balance} $
          </Text>
        )}
        {amount?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Requested Loan Ammount:</Text> {amount} $
          </Text>
        )}
        {preferred?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <Text style={{...span}}>Preferred Contact Method:</Text> {preferred}
          </Text>
        )}
        <Text style={{ ...text, marginBottom: "14px" }}>
        <Text style={{...span}}>Message:</Text> {message}
        </Text>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Please review the provided information and take appropriate action as
          necessary.
        </Text>

        <Text style={footer}>
          Best regards,
        </Text>
        <Text style={footer}>
          {fname} {lname}
        </Text>
    </Body>
  </Html>
);

export default ApplyNowEmail;

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
