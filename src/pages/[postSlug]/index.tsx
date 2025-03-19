import { gql } from "@apollo/client"
import type { Post } from "client"
import { apolloClient } from "lib/apollo"
import dynamic from "next/dynamic"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import Moment from "react-moment"

const Footer = dynamic(() => import("../../components/Footer"))
const Header = dynamic(() => import("../../components/Header"))

export interface PostProps {
  post: Post | Post["preview"]["node"] | null | undefined
  seo: any
  settings: any
  mainMenus: any
  relatedPosts: any[]
}

// Function to extract headings from HTML content
const extractTableOfContents = (content) => {
  if (!content) return []

  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = content

  // Find all heading elements
  const headings = tempDiv.querySelectorAll("h2, h3, h4")

  return Array.from(headings).map((heading, index) => {
    // Create an ID if one doesn't exist
    if (!heading.id) {
      heading.id = `heading-${index}`
    }

    return {
      id: heading.id,
      text: heading.textContent,
      level: Number.parseInt(heading.tagName.substring(1)),
    }
  })
}

export function PostComponent({ post, seo, settings, mainMenus, relatedPosts }: PostProps) {
  const [tableOfContents, setTableOfContents] = useState([])

  useEffect(() => {
    if (post?.content) {
      setTableOfContents(extractTableOfContents(post.content))
    }
  }, [post?.content])

  // Extract categories/tags for breadcrumbs
  // const categories = post?.categories?.nodes || []
  // const primaryCategory = categories[0]?.name || "BASICS"
  // const secondaryCategory = categories[1]?.name || "ON-PAGE SEO"

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <link
          rel="canonical"
          href={seo?.canonicalUrl?.endsWith("/") ? seo?.canonicalUrl?.slice(0, -1) : seo?.canonicalUrl}
        />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:description" content={seo?.description} />
        <meta property="og:image" content={seo?.openGraph?.image?.url} />
      </Head>

      <Header settings={settings} mainMenus={mainMenus} />

      <main className="bg-[#f9f5ff] min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <div className="text-sm mb-6 flex items-start justify-start gap-2">
            <Link href="/blog" style={{ textDecoration: 'none' }}>
            <p className="text-[#12143A] hover:text-[#F0B254] uppercase">BLOG</p>
            </Link>{" "}
            /{" "}
            <p>
            <p className="text-[#12143A] hover:text-[#F0B254] uppercase">{seo?.title}</p>
            </p>
          </div>

          {/* Title Section */}
          <div className="relative mb-12 rounded-xl overflow-hidden">
            {/* Background image with overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${post?.featuredImage?.node?.sourceUrl || "/placeholder.svg?height=800&width=1600"})`,
                filter: "blur(1px)",
              }}
            ></div>
            <div className="absolute inset-0 bg-gray-900/70 z-10"></div>

            {/* Content */}
            <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4">
                  {post?.title?.toString()}
                </h1>
              </div>
              <div>
                <p className="text-lg text-white/90 mb-6">{seo?.description}</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-white/90">
                    Written by <span className="font-semibold text-white">{post?.author?.node?.name}</span>
                  </p>
                  <p className="text-white/80">
                    Last Updated <Moment format="MMMM D, YYYY">{post?.date}</Moment>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Table of Contents - Left Sidebar */}
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                <p className="text-xl font-semibold mb-4">Table of Contents</p>
                <nav>
                  <ul className="space-y-3">
                    {tableOfContents.map((heading) => (
                      <li
                        key={heading.id}
                        className={`${heading.level === 2 ? "ml-0" : heading.level === 3 ? "ml-4" : "ml-6"}`}
                      >
                        <a
                          href={`#${heading.id}`}
                          style={{ textDecoration: 'none' }}
                          
                        >
                          <p className="text-gray-700 hover:text-[#F0B254] block transition-colors">{heading.text}</p>
                        </a>
                      </li>
                    ))}
                    {tableOfContents.length === 0 && (
                      <>
                        <li>
                          <a
                            href="#what-is-domain"
                            className="text-gray-700 hover:text-purple-600 block transition-colors"
                          >
                            What is a Domain Name?
                          </a>
                        </li>
                        <li>
                          <a
                            href="#why-matters"
                            className="text-gray-700 hover:text-purple-600 block transition-colors"
                          >
                            Why Choosing a Domain Name Matters for SEO
                          </a>
                        </li>
                        <li>
                          <a
                            href="#how-to-choose"
                            className="text-gray-700 hover:text-purple-600 block transition-colors"
                          >
                            How to Choose a Domain Name for SEO
                          </a>
                        </li>
                        <li>
                          <a href="#faqs" className="text-gray-700 hover:text-purple-600 block transition-colors">
                            Frequently Asked Questions (FAQs)
                          </a>
                        </li>
                        <li>
                          <a href="#optimize" className="text-gray-700 hover:text-purple-600 block transition-colors">
                            Optimize Your Domain Name for SEO
                          </a>
                        </li>
                      </>
                    )}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-6">
              <article className="bg-white p-8 rounded-lg shadow-sm">
                <div
                  className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700"
                  dangerouslySetInnerHTML={{ __html: String(post?.content) }}
                ></div>
              </article>
            </div>

            {/* Author and Related Posts - Right Sidebar */}
            <div className="lg:col-span-3">
              <div className="space-y-8">
                {/* Author Info */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-xl font-semibold">Author</p>
                  <Link href="/author/asim-ali" style={{ textDecoration: 'none' }} className="flex items-center no-underline hover:underline">
                    <div className="flex-shrink-0 mr-2">
                      <Image
                        src={"https://asimaliprod.wpengine.com/wp-content/uploads/2024/05/asim-logo-1-1.png"
                        }
                        alt={post?.author?.node?.name || "Author"}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-lg text-gray-900 hover:text-[#F0B254] mt-2">{post?.author?.node?.name}</p>
                    </div>
                  </Link>
                </div>

                {/* Related Posts */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <p className="text-xl font-semibold mb-4">Related Resources</p>
                  <ul className="space-y-4">
                    {relatedPosts?.map((relatedPost, index) => (
                      <li key={index}>
                        <Link
                        style={{ textDecoration: 'none' }}
                          href={relatedPost.uri}
                        >
                          <p className="text-gray-700 hover:text-[#12143A] font-medium block transition-colors">{relatedPost.title}</p>
                        </Link>
                      </li>
                    ))}
                    {(!relatedPosts || relatedPosts.length === 0) && (
                      <>
                        <li>
                          <Link
                          style={{ textDecoration: 'none' }}
                            href="#"
                            className="text-gray-700 hover:text-[#F0B254] font-medium block transition-colors"
                          >
                            100+ Best SEO Keywords for HVAC Companies
                          </Link>
                        </li>
                        <li>
                          <Link
                          style={{ textDecoration: 'none' }}
                            href="#"
                            className="text-gray-700 hover:text-[#F0B254] font-medium block transition-colors no-underline"
                          >
                            100+ Best SEO Keywords for Manufacturing Companies
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  )
}

export default function Page({ seo, settings, mainMenus, post, relatedPosts }) {
  return <PostComponent post={post} seo={seo} settings={settings} mainMenus={mainMenus} relatedPosts={relatedPosts} />
}

export async function getStaticProps({ params }) {
  const id = params?.postSlug
  const { data } = await apolloClient.query({
    query: gql`query{
        post(id: "${id}", idType: URI) {
          date
          content(format: RENDERED)
          featuredImage {
            node {
              altText
              sourceUrl
            }
          }
          author {
            node {
              name
              avatar {
                url
              }
            }
          }
          title(format: RENDERED)
          categories {
            nodes {
              name
              slug
            }
          }
          tags {
            nodes {
              name
              slug
            }
          }
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
        }
        settingsOptions {
          AsimOptions {
            headerSettings {
              uploadLogo {
                sourceUrl
                altText
              }
              uploadLogoMobile {
                sourceUrl
                altText
              }
            }
            generalSettings {
                schemaProductRating
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

        menus(where: {location: PRIMARY}) {
          nodes {
            name
            slug
            menuItems(first: 150){
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
      }`,
  })

  // Get related posts based on categories or tags
  let relatedPosts = []
  // const postCategories = data?.post?.categories?.nodes || []
  // const postTags = data?.post?.tags?.nodes || []


  // if (postCategories.length > 0 || postTags.length > 0) {
  //   const categoryIds = postCategories.map((cat) => cat.id); // Assuming 'id' is of type ID
  //   const tagIds = postTags.map((tag) => tag.id); // Assuming 'id' is of type ID
  
  //   // Construct the 'where' clause dynamically
  //   const whereClause: any = {
  //     notIn: [id],
  //   };
  //   if (categoryIds.length > 0) {
  //     whereClause.categoryIn = categoryIds;
  //   }
  
  //   const relatedQuery = await apolloClient.query({
  //     query: gql`
  //       query RelatedPosts($categoryIds: [ID!], $tagIds: [ID!], $excludeId: ID!) {
  //         posts(
  //           where: {
  //             ${categoryIds.length > 0 ? 'categoryIn: $categoryIds,' : ''}
  //             ${tagIds.length > 0 ? 'tagIn: $tagIds,' : ''}
  //             notIn: [$excludeId]
  //           },
  //           first: 5
  //         ) {
  //           nodes {
  //             title
  //             uri
  //             date
  //           }
  //         }
  //       }
  //     `,
  //     variables: {
  //       categoryIds: categoryIds.length > 0 ? categoryIds : undefined,
  //       tagIds: tagIds.length > 0 ? tagIds : undefined,
  //       excludeId: id,
  //     },
  //   });
  
  //   relatedPosts = relatedQuery?.data?.posts?.nodes || [];
  // }
  
  
  

  const seo = data?.post?.seo
  const settings = data?.settingsOptions?.AsimOptions
  const mainMenus = data?.menus?.nodes
  const post = data?.post

  if (
    post?.title === undefined ||
    seo?.title === undefined ||
    settings?.headerSettings?.uploadLogo?.sourceUrl === undefined ||
    mainMenus?.length === 0
  ) {
    return {
      redirect: {
        permanent: true,
        destination: "/",
      },
    }
  }

  return {
    props: { seo, settings, mainMenus, post, relatedPosts },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: gql`query{
      posts {
        nodes {
          uri
        }
      }
    }`,
  })
  const paths = data?.posts?.nodes?.map((post: { uri: any }) => ({
    params: { postSlug: post?.uri },
  }))
  return {
    paths,
    fallback: "blocking",
  }
}

