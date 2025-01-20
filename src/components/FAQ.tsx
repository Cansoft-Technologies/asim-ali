import React from "react";
import { Accordion, Container } from "react-bootstrap";
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { apolloClient } from "lib/apollo";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 14 }) {
          nodes {
            HomeLandingPage {
              faqSection {
                hideSection
                faqTitle
                faqSubitle
                faqImage {
                  altText
                  sourceUrl
                }
                faqAccordion {
                  question
                  answer
                }
              }
            }
          }
        }
      }
    `,
  });

  return {
    props: {
      faqsections: data?.pages?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  faqsections: any;
};

const FAQ = (props: MyProps) => {
  const { faqsections } = props;

  return (
    <>
          <Container>
              <div>
                <div
                  style={{
                    backgroundImage: `url("${faqsections?.faqImage?.sourceUrl}")`,
                  }}
                  className="faq_section"
                >
                  <div className="faq_text">
                    <h2>
                      <span className="faq-span">
                        {faqsections?.faqTitle}{" "}
                      </span>
                      <span
                        className="faq-span"
                        dangerouslySetInnerHTML={{
                          __html: faqsections?.faqSubitle,
                        }}
                      ></span>
                    </h2>
                  </div>
                </div>
                <div className="faq-accordion">
                  {faqsections?.faqAccordion == null ? (
                    ""
                  ) : (
                    <Accordion defaultActiveKey="0">
                      {faqsections?.faqAccordion?.map(
                        (qa, index) => {
                          return (
                            <Accordion.Item
                              key={index}
                              eventKey={index.toString()}
                            >
                              <Accordion.Header as="p">
                                {qa?.question}
                              </Accordion.Header>
                              <Accordion.Body
                                dangerouslySetInnerHTML={{ __html: qa.answer }}
                              ></Accordion.Body>
                            </Accordion.Item>
                          );
                        }
                      )}
                    </Accordion>
                  )}
                </div>
              </div>
          </Container>
    </>
  );
};

export default FAQ;
