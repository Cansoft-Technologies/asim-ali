import { gql } from "@apollo/client"
import type { Post as OriginalPost } from "client"

type Post = OriginalPost & {
  postSlug?: {
    parentSlug?: string
  }
  preview?: {
    node?: {
      postSlug?: {
        parentSlug?: string
      }
    }
  }
}
import { apolloClient } from "lib/apollo"
import dynamic from "next/dynamic"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
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

interface TOCItem {
  id: string
  text: string | null
  level: number
}

export function PostComponent({ post, seo, settings, mainMenus, relatedPosts }: PostProps) {
  const [tableOfContents, setTableOfContents] = useState<TOCItem[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  interface TOCItem {
    id: string
    text: string
    level: number
    number: string
  }
  
  useEffect(() => {
    if (!contentRef.current) return
  
    // grab all H2, H3, H4 in the post content
    const headings = Array.from(
      contentRef.current.querySelectorAll<HTMLHeadingElement>("h2, h3, h4")
    )
  
    // counters for each level
    const counters = { 2: 0, 3: 0, 4: 0 }
  
    // build the TOC array with .number
    const toc: TOCItem[] = headings.map((heading, idx) => {
      // ensure an ID
      if (!heading.id) heading.id = `heading-${idx}`
  
      const level = parseInt(heading.tagName.substring(1), 10) as 2 | 3 | 4
      // increment the right counter, reset lower levels
      if (level === 2) {
        counters[2] += 1
        counters[3] = 0
        counters[4] = 0
      } else if (level === 3) {
        counters[3] += 1
        counters[4] = 0
      } else if (level === 4) {
        counters[4] += 1
      }
  
      // build the “1.”, “2.3.”, or “4.1.2.” string
      const number =
        level === 2
          ? `${counters[2]}.`
          : level === 3
          ? `${counters[2]}.${counters[3]}.`
          : `${counters[2]}.${counters[3]}.${counters[4]}.`
  
      return {
        id: heading.id,
        text: heading.textContent ?? "",
        level,
        number,
      }
    })
  
    setTableOfContents(toc)
  }, [post?.content])
  

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  function formatBreadcrumb(slug: string) {
    return slug
      .replace(/-/g, " ")    // replace dashes with spaces
      .replace(/\b\w/g, (l) => l.toUpperCase()); // capitalize first letter of each word
  }

  return (
    <>
      <Head>
        <title>{seo?.title}</title>
        <meta name="description" content={seo?.description} />
        <link rel="canonical" href={post?.postSlug?.parentSlug ? `https://asimali.ca/${post.postSlug.parentSlug}/${post?.slug}` : seo?.canonicalUrl?.replace(/\/$/, "")} />
        <meta property="og:title" content={seo?.title} />
        <meta property="og:description" content={seo?.description} />
        <meta property="og:image" content={seo?.openGraph?.image?.url} />
      </Head>

      <Header settings={settings} mainMenus={mainMenus} />

      {/* MAIN CONTENT */}
      <main className="bg-[#f9f5ff] min-h-screen py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

         {/* Breadcrumb */}
<div className="text-sm mb-6 flex items-start justify-start gap-2 flex-wrap">
  <Link href="/blog" style={{ textDecoration: "none" }}>
    <p className="text-[#12143A] hover:text-[#F0B254] uppercase">BLOG</p>
  </Link>
  <span>/</span>

  {/* If there is a parent slug, show it */}
  {post?.postSlug?.parentSlug && (
    <>
      <Link href={`/${post?.postSlug.parentSlug}`} style={{ textDecoration: "none" }}>
        <p className="text-[#12143A] hover:text-[#F0B254] uppercase">
          {formatBreadcrumb(post.postSlug.parentSlug)}
        </p>
      </Link>
      <span>/</span>
    </>
  )}

  {/* Current page title */}
  <p className="text-[#12143A] hover:text-[#F0B254] uppercase">{seo?.title}</p>
</div>

          {/* Banner */}
          <div className="relative mb-12 rounded-xl overflow-hidden h-[40vh]">
            <div
              className="absolute inset-0 bg-cover bg-center z-0"
              style={{
                backgroundImage: `url(${
                  post?.featuredImage?.node?.sourceUrl ||
                  "/placeholder.svg?height=800&width=1600"
                })`,
                filter: "blur(1px)",
              }}
            ></div>
            <div className="absolute inset-0 bg-gray-900/70 z-10"></div>
            <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
              <div>
                <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-white mb-4">{post?.title?.toString()}</h1>
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

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* TOC */}
            <aside className="lg:col-span-3">
  <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
    <p className="text-xl font-semibold mb-4">Table of Contents</p>
    <nav>
      <ul className="space-y-3 !list-none">
        {tableOfContents.map((h) => (
          <li
            key={h.id}
            className={
              h.level === 2 ? "ml-0" : h.level === 3 ? "ml-4" : "ml-8"
            }
          >
            <a
              href={`#${h.id}`}
              style={{ textDecoration: "none" }}
              onClick={(e) => handleSmoothScroll(e, h.id)}
            >
              <p className="text-gray-700 hover:text-[#F0B254] block transition-colors">
              <span className="font-medium mr-1">{h.number}</span>
              {h.text}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  </div>
</aside>


            {/* Main Article */}
            <article className="lg:col-span-6 bg-white p-8 rounded-lg shadow-sm">
              <div
                ref={contentRef}
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700"
                dangerouslySetInnerHTML={{ __html: String(post?.content) }}
              />
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-8">
              {/* Author */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-xl font-semibold">Author</p>
                <Link href="/author/asim-ali" style={{ textDecoration: "none" }} className="flex items-center">
                  <Image
                    src="https://asimaliprod.wpengine.com/wp-content/uploads/2024/05/asim-logo-1-1.png"
                    alt={post?.author?.node?.name || "Author"}
                    width={60}
                    height={60}
                    className="rounded-full mr-2"
                  />
                  <p className="font-semibold text-lg text-gray-900 hover:text-[#F0B254] mt-2">
                    {post?.author?.node?.name}
                  </p>
                </Link>
              </div>

              {/* Related Posts */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-xl font-semibold mb-4">Related Resources</p>
                <ul className="space-y-4">
                  {relatedPosts?.map((relatedPost, index) => (
                    <li key={index}>
                      <Link href={relatedPost?.postSlug?.parentSlug && relatedPost?.uri ? `${relatedPost.postSlug.parentSlug}${relatedPost.uri}` : relatedPost?.uri} style={{ textDecoration: "none" }}>
                        <p className="text-gray-700 hover:text-[#F0B254] font-medium block">
                          {relatedPost.title}
                        </p>
                        {relatedPost.excerpt && (
                          <p className="text-gray-500 text-sm">
                            {relatedPost.excerpt.replace(/<[^>]+>/g, "").substring(0, 100) + "..."}
                          </p>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer settings={settings} mainMenus={mainMenus} />
    </>
  )
}

export default function Page(props) {
  return <PostComponent {...props} />
}

export async function getStaticProps({ params }) {
  let slug = ""
  if (Array.isArray(params?.postSlug)) {
    slug = params.postSlug.join("/"); // e.g., 'parent/child'
  } else if (typeof params?.postSlug === "string") {
    slug = params.postSlug; // e.g., 'post-name'
  }


  const { data } = await apolloClient.query({
    query: gql`
      query GetPost($id: ID!) {
        post(id: $id, idType: URI) {
          date
          slug
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
            postSlug {
        parentSlug
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
                childItems(first: 150) {
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
    variables: { id: slug },
  })

  if (!data?.post) {
    return { notFound: true }
  }
  // 3. Validate if the URL structure matches parent/child properly
  const expectedSlug = data?.post.postSlug?.parentSlug
    ? `${data?.post.postSlug.parentSlug}/${slug.split("/").pop()}`
    : slug.split("/").pop(); // only child slug if no parent

  if (slug !== expectedSlug) {
    return { notFound: true };
  }

  let relatedPosts = []
  if (data?.post?.title) {
    const searchTerm = data.post.title.split(" ").slice(0, 3).join(" ")
    const relatedQuery = await apolloClient.query({
      query: gql`
        query RelatedPosts($search: String!, $excludeId: ID!) {
          posts(where: { search: $search, notIn: [$excludeId] }, first: 5) {
            nodes {
              title
              uri
              date
              excerpt
              postSlug {
                parentSlug
              }
            }
          }
        }
      `,
      variables: { search: searchTerm, excludeId: slug },
    })
    relatedPosts = relatedQuery?.data?.posts?.nodes || []
  }

  const seo = data?.post?.seo
  const settings = data?.settingsOptions?.AsimOptions
  const mainMenus = data?.menus?.nodes
  const post = data?.post

  if (!post?.title || !seo?.title || !settings?.headerSettings?.uploadLogo?.sourceUrl || !mainMenus?.length) {
    return { redirect: { destination: "/", permanent: true } }
  }

  return { props: { seo, settings, mainMenus, post, relatedPosts }, revalidate: 60 }
}

export async function getStaticPaths() {
  const { data } = await apolloClient.query({
    query: gql`
      query {
        posts(first: 1000) {
          nodes {
            uri
          }
        }
      }
    `,
  })

  const paths = data?.posts?.nodes?.map((post: { uri: string }) => {
    const cleanedSlug = post.uri.replace(/^\/|\/$/g, "") // Remove leading/trailing slashes
    const slugParts = cleanedSlug.split("/").filter(Boolean) // filter out any empty parts
    return {
      params: { postSlug: slugParts },
    }
  })

  return { paths, fallback: "blocking" }
}

