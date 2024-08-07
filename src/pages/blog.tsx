import { gql } from "@apollo/client";
import { apolloClient } from "lib/apollo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import Moment from "react-moment";
import { Footer, Header, Hero } from "../components";

export async function getStaticProps() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        pages(where: { id: 250 }) {
          nodes {
            seo {
              title
              description
              canonicalUrl
              focusKeywords
              openGraph {
                image {
                  url
                }
              }
            }
            blog {
              blogBannerTitle
              blogBannerBackgroundImage {
                altText
                sourceUrl
              }
            }
          }
        }
        settingsOptions {
          AsimOptions {
            headerSettings {
              uploadLogo {
                sourceUrl
                altText
              }
            }
            footerSettings {
              socialUrl {
                facebook
                tiktok
                linkedin
                instagram
              }              
              copyrightText
              footerLeftWidget {
                title
                phoneNumber
                emailAddress
              }
              footerLogoSection {
                logoText
                logoUpload {
                  altText
                  sourceUrl
                }
              }
              footerRightWidget {
                title
                address
              }
            }
          }
        }

        menus(where: { location: PRIMARY }) {
          nodes {
            name
            slug
            menuItems(first: 150) {
              nodes {
                url
                target
                parentId
                label
                cssClasses
                description
                id
                childItems (first: 150) {
                  nodes {
                    uri
                    label
                  }
                }
              }
            }
          }
        }
      }
    `,
  });
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {
      blogData: data?.pages?.nodes,
      metaData: data?.pages?.nodes,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  };
}

type MyProps = {
  blogData: any;
  metaData: any;
  settings: any;
  mainMenus: any;
};

const Blog = (props: MyProps) => {
  const { blogData, metaData, settings, mainMenus } = props;

  const [blogs, setBlogs] = useState([]);
  const [isLoading, seIsLoading] = useState(true);

  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const size = 6;

  useEffect(() => {
    apolloClient
      .query({
        query: gql`
          query {
            posts(where: { offsetPagination: { size: 10000 } }) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                excerpt
                content
                slug
                uri
                date
                author {
                  node {
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        const count = result?.data?.posts?.nodes.length;

        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
    const offset = size * page;
    apolloClient
      .query({
        query: gql`
          query{
            posts (where: {offsetPagination: {offset: ${offset},  size: ${size}}}) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
                    altText
                  }
                }
                excerpt
                content
                slug
                uri
                date
                author {
                  node {
                    name
                  }
                }
              }
            }
          }`,
      })
      .then((result) => {
        seIsLoading(false);
        setBlogs(result?.data?.posts?.nodes);
      });
  }, [page]);
  
  return (
    <div>
      <Head>
        {metaData?.map((meta,index) => {
          return (
            <>
              <title>{meta?.seo?.title}</title>
              <meta name="description" content={meta?.seo?.description} />
              <link
                rel="canonical"
                href={
                  meta?.seo?.canonicalUrl?.endsWith("/")
                    ? meta?.seo?.canonicalUrl?.slice(0, -1)
                    : meta?.seo?.canonicalUrl
                }
              />
              <meta property="og:title" content={meta?.seo?.title} />
              <meta
                property="og:description"
                content={meta?.seo?.description}
              />
              <meta
                property="og:image"
                content={meta?.seo?.openGraph?.image?.url}
              />
            </>
          );
        })}
      </Head>
      <Header settings={settings} mainMenus={mainMenus} />

      {blogData?.map((data, i) => {
        return (
          <div key={i}>
            <main className="content">
              <Hero
                title={data?.blog.blogBannerTitle}
                bgImage={data?.blog?.blogBannerBackgroundImage?.sourceUrl}
              />

              {isLoading && (
                <div className="text-center py-5">
                  <div className="spinner-border text-dark" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              )}

              <Container className="my-5 blog-container">
                <h1 className="my-3">{data?.blog.blogBannerTitle}</h1>
                <div className="row row-cols-1 row-cols-md-3 g-4 items">
                  {blogs?.map((blog, index) => {
                    return (
                      <div key={index} className="col">
                        <div className="card h-100">
                          <div className="blogImage">
                            <Image
                              src={blog?.featuredImage?.node?.sourceUrl}
                              alt={blog?.featuredImage?.node?.altText}
                              width="390"
                              height="400"
                              style={{ width: "100%", objectFit: "cover" }}
                            />
                          </div>
                          <div className="card-body">
                            <Link
                              href={`${
                                blog.uri.endsWith("/")
                                  ? blog.uri.slice(0, -1)
                                  : blog.uri
                              }`}
                            >
                              <h2 className="card-title">{blog?.title}</h2>
                            </Link>
                            <span>
                              By Asim Ali |{" "}
                              <Moment format="MMM D, YYYY">{blog.date}</Moment>
                            </span>
                            <p
                              className="blog-content"
                              dangerouslySetInnerHTML={{
                                __html: blog?.excerpt,
                              }}
                            ></p>
                          </div>
                          <div className="card-footers p-3">
                            <Link
                              href={`${
                                blog.uri.endsWith("/")
                                  ? blog.uri.slice(0, -1)
                                  : blog.uri
                              }`}
                            >
                              <Button className="readMoreBtn">
                                Read <span>More</span>
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pagination">
                  {[...Array(pageCount).keys()].map((number) => (
                    <Button
                      className={
                        number == page ? "contactBtn selected" : "contactBtn"
                      }
                      key={number}
                      onClick={() => setPage(number)}
                    >
                      {number + 1}
                    </Button>
                  ))}
                </div>
              </Container>
            </main>
          </div>
        );
      })}

      <Footer settings={settings} mainMenus={mainMenus} />
    </div>
  );
};

export default Blog;
