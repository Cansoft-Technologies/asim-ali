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
  usingFor?: string;
}

const ApplyNowEmail = ({
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
  usingFor,
}: MyProps) => (
  <Html>
    <Head />
    <Preview>
    New Form Submission: {fname} {lname}
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={paragraphContent}>
          <Hr style={hr} />
          <Text style={heading}>
          New Form Submission: {fname} {lname}
          </Text>
          <Text style={paragraph}>Dear Asim Ali,</Text>
          <Text style={paragraph}>
          A new form submission has been received with the following details:
          </Text>
        </Section>
        <Section style={paragraphList}>
        <Text style={{ ...text, marginBottom: "10px" }}>
        <span style={{...span}}>Name: </span>{fname} {lname}
        </Text>
        <Text style={{ ...text, marginBottom: "10px" }}>
        <span style={{...span}}>Email: </span>{mail}
        </Text>
        
        {phone?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}><span style={{...span}}>Phone:</span> {phone}</Text>
        )}
        {contact?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>How Should We Contact You?:</span> {contact}
          </Text>
        )}
        {about?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Please Contact Me About:</span> {about}
          </Text>
        )}
        {referred?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Referred by:</span> {referred}
          </Text>
        )}
        {homeowner?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Homeowner:</span> {homeowner}
          </Text>
        )}
        {city?.length > 0 && (
          <span style={{ ...text, marginBottom: "10px" }}><Text style={{...span}}>City:</Text> {city}</span>
        )}
        {province?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Province:</span> {province}
          </Text>
        )}
        {mortgage?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Do You Have A Mortgage:</span> {mortgage} $
          </Text>
        )}
        {property?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Property Value:</span> {property} $
          </Text>
        )}
        {balance?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Current Mortgage Balance:</span> {balance} $
          </Text>
        )}
        {amount?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Requested Loan Ammount:</span> {amount} $
          </Text>
        )}
        {preferred?.length > 0 && (
          <Text style={{ ...text, marginBottom: "10px" }}>
            <span style={{...span}}>Preferred Contact Method:</span> {preferred}
          </Text>
        )}
        </Section>
        <Section style={paragraphContent}>
        <Text style={{ ...text, marginBottom: "14px" }}>
        <Text style={{...span}}>Message:</Text> {message}
        </Text>
        <Text style={{ ...text, marginBottom: "14px" }}>
          Please review the provided information and take appropriate action as
          necessary.
        </Text>
          <Hr style={hr} />
        </Section>

        <Section style={paragraphContent}>
          <Text style={paragraph}>Best regards,</Text>
          <Text style={{ ...paragraph, fontSize: "20px", ...headerBlue }}>
          {fname} {lname}
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
                {usingFor === 'apply-now' ? 'Client Care Data Analyst' : 'Your Ideal Mortgage Partner'}
              </Text>
              <Row>
                <Link
                href="tel:+1 (604) 591-3950"
                style={{ ...footFirst}}
              >
                <Img
                style={{marginRight: "10px"}}
                  width="18"
                  height="18"
                  src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/iphone-se-50.png"
                />
                +1 (604) 591-3950
              </Link>
              </Row>
              <Row style={{marginTop: "10px" }}>
                  <Link href={`mailto:${usingFor === 'apply-now' ? 'clientcare@asimali.ca' : 'clientcare@asimali.ca'}`} style={footFirst}>
                    <Img
                    style={{marginRight: "10px"}}
                      width="18"
                      height="18"
                      src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/email-48.png"
                    />
                   {usingFor === 'apply-now' ? 'clientcare@asimali.ca' : 'clientcare@asimali.ca'}
                  </Link>
              </Row>
              <Row style={{marginTop: "10px" }}>
              <Link href="https://asimali.ca" style={footFirst}>
                    <Img
                    style={{marginRight: "10px"}}
                      width="18"
                      height="18"
                      src="http://asimaliprod.wpengine.com/wp-content/uploads/2023/12/web-24.png"
                    />
                    www.asimali.ca
                  </Link>
              </Row>
            </Column>
            <Column style={{ marginTop: "20px" }}>
              <Img
                style={{ display: "block", margin: "0 50px", alignItems: "center" }}
                width="50"
                height="50"
                src="http://asimaliprod.wpengine.com/wp-content/uploads/2022/11/favicon.png"
              />
              <Text style={{ ...paragraph,textAlign: "center", color: "#12143A",fontSize: "14px", }}>
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
export default ApplyNowEmail;
const main = {
  backgroundColor: "#dbddde",
  width: "100%",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
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


const hr = {
  borderColor: "#e8eaed",
  margin: "20px 0",
};
