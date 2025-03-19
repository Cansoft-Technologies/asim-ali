import { gql } from "@apollo/client"
import { apolloClient } from "lib/apollo"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Search, Plus } from "lucide-react"
import Moment from "react-moment"
import Header from "components/Header"
import Footer from "../components/Footer"



type MyProps = {
  blogData: any;
  metaData: any
  settings: any
  mainMenus: any
}

export function ResourcesPage (props: MyProps) {
  const { metaData, settings, mainMenus, blogData } = props

  const [resources, setResources] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("")
  const [allResources, setAllResources] = useState([])

  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(0)
  const size = 5

  const filters = [
    "Mortgage",
    "Down Payment",
    "Business",
    "Credit",
    "Amortization",
    "Mortgage Rates",
    "Calculator",
    "First Time Home Buyer",
    "Refinance",
    "Commercial Mortgage",
    "Home Equity", 
  ]

  const filterResources = (resources, term, filter) => {
    return resources.filter((resource) => {
      // Apply search term filter
      const matchesSearch =
        term === "" ||
        resource.title.toLowerCase().includes(term.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(term.toLowerCase()) ||
        resource.content.toLowerCase().includes(term.toLowerCase())

      // Apply category filter
      const matchesFilter =
        filter === "" || resource.tags?.nodes?.some((tag) => tag.name.toLowerCase() === filter.toLowerCase()) ||
        resource.title.toLowerCase().includes(filter.toLowerCase()) ||
        resource.excerpt.toLowerCase().includes(filter.toLowerCase()) ||
        resource.content.toLowerCase().includes(filter.toLowerCase())

      return matchesSearch && matchesFilter
    })
  }

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
                tags {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        `,
      })
      .then((result) => {
        const allPosts = result?.data?.posts?.nodes
        setAllResources(allPosts)

        // Apply search and filter
        const filteredPosts = filterResources(allPosts, searchTerm, activeFilter)
        const count = filteredPosts.length
        const pageNumber = Math.ceil(count / size)
        setPageCount(pageNumber)

        // Get current page items
        const startIndex = page * size
        const endIndex = startIndex + size
        setResources(filteredPosts.slice(startIndex, endIndex))
        setIsLoading(false)
      })
  }, [page, searchTerm, activeFilter])

  const handleFilterClick = (filter: string) => {
    setActiveFilter(activeFilter === filter ? "" : filter)
  }

  return (
    <>
      <Head>
              <title>{metaData?.title}</title>
              <meta name="description" content={metaData?.description} />
              <link
                rel="canonical"
                href={
                  metaData?.canonicalUrl?.endsWith("/")
                    ? metaData?.canonicalUrl?.slice(0, -1)
                    : metaData?.canonicalUrl
                }
              />
              <meta property="og:title" content="Alpine Credits Resources" />
              <meta property="og:description" content={metaData?.description} />
              <meta property="og:image" content={metaData?.openGraph?.image?.url} />
      </Head>
      <div className="bg-white min-h-screen">
      <Header settings={settings} mainMenus={mainMenus} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{blogData.blogBannerTitle}</h1>
            {/* <p className="text-lg text-gray-700 mb-8">
              Tools and tips from our team of experts to help you make the best decisions for your financial future.
            </p> */}

            <div className="relative w-3/4">
              <input
                type="text"
                placeholder="Search keyword..."
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    setPage(0) // Reset to first page on search
                  }
                }}
              />
              <button
                className="absolute right-3 top-6 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setPage(0)} // Reset to first page on search
              >
                <Search size={20} />
              </button>
            </div>
          </div>

          <div className="hidden md:block">
            <Image
              src={blogData?.blogBannerBackgroundImage?.sourceUrl}
              alt={blogData?.blogBannerBackgroundImage?.altText}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full h-[400px]"
            />
          </div>
        </div>

        <div className="mb-12">
          <p className="text-xl font-semibold mb-4">Filter by:</p>
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterClick(filter)}
                className={`px-4 py-2 rounded-md text-sm ${
                  activeFilter === filter ? "bg-[#002141] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {filter}
              </button>
            ))}
            {/* <button className="px-4 py-2 rounded-md text-sm bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
              <Plus size={16} className="inline mr-1" />
              More
            </button> */}
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-gray-800 border-r-transparent"></div>
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <Image
                    src={resource?.featuredImage?.node?.sourceUrl || "/placeholder.svg"}
                    alt={resource?.featuredImage?.node?.altText || resource?.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <Link
                  style={{ textDecoration: 'none' }}
                    href={`${resource.uri?.endsWith("/") ? resource.uri.slice(0, -1) : resource.uri}`}
                    className="no-underline"
                  >
                    <p className="text-xl font-bold text-gray-900 mb-2 hover:text-gray-700 no-underline">{resource?.title}</p>
                  </Link>
                  <p className="text-sm text-gray-500 mb-3">
                    By {resource?.author?.node?.name || "Alpine Credits"} |{" "}
                    <Moment format="MMM D, YYYY">{resource.date}</Moment>
                  </p>
                  <div
                    className="text-gray-700 mb-4 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: resource?.excerpt,
                    }}
                  ></div>
                  <Link
                  style={{ textDecoration: 'none' }}
                    href={`${resource.uri?.endsWith("/") ? resource.uri.slice(0, -1) : resource.uri}`}
                    className="inline-block px-4 py-2 bg-[#F0B254] text-white rounded hover:bg-[#002141] transition-colors no-underline"
                  >
                    Read <span className="font-medium">More</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && resources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No resources found matching your search criteria.</p>
            <button
              onClick={() => {
                setSearchTerm("")
                setActiveFilter("")
                setPage(0)
              }}
              className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        {pageCount > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className={`px-3 py-2 rounded ${
                page === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              &laquo;
            </button>

            {pageCount <= 7 ? (
              // Show all page numbers if there are 7 or fewer
              [...Array(pageCount).keys()].map((number) => (
                <button
                  key={number}
                  onClick={() => setPage(number)}
                  className={`px-4 py-2 rounded ${
                    number === page ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {number + 1}
                </button>
              ))
            ) : (
              // Show limited page numbers with ellipses for many pages
              <>
                {/* First page */}
                <button
                  onClick={() => setPage(0)}
                  className={`px-4 py-2 rounded ${
                    page === 0 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  1
                </button>

                {/* Ellipsis or second page */}
                {page > 2 ? (
                  <span className="px-4 py-2">...</span>
                ) : (
                  <button
                    onClick={() => setPage(1)}
                    className={`px-4 py-2 rounded ${
                      page === 1 ? "bg-[#002141] text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    2
                  </button>
                )}

                {/* Current page and surrounding pages */}
                {page !== 0 && page !== pageCount - 1 && page > 1 && (
                  <button className="px-4 py-2 rounded bg-gray-800 text-white">{page + 1}</button>
                )}

                {/* Ellipsis or second-to-last page */}
                {page < pageCount - 3 ? (
                  <span className="px-4 py-2">...</span>
                ) : (
                  <button
                    onClick={() => setPage(pageCount - 2)}
                    className={`px-4 py-2 rounded ${
                      page === pageCount - 2 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                  >
                    {pageCount - 1}
                  </button>
                )}

                {/* Last page */}
                <button
                  onClick={() => setPage(pageCount - 1)}
                  className={`px-4 py-2 rounded ${
                    page === pageCount - 1 ? "bg-gray-800 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  {pageCount}
                </button>
              </>
            )}

            <button
              onClick={() => setPage(Math.min(pageCount - 1, page + 1))}
              disabled={page === pageCount - 1}
              className={`px-3 py-2 rounded ${
                page === pageCount - 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              &raquo;
            </button>
          </div>
        )}
      </main>

      <Footer settings={settings} mainMenus={mainMenus} />
    </div>
    </>
  )
}


export default function Page(props: MyProps) {
  return <ResourcesPage 
    blogData={props.blogData}
    metaData={props.metaData}
    settings={props.settings}
    mainMenus={props.mainMenus}
  />
}


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
  })
  if (!data) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
  return {
    props: {
      blogData: data?.pages?.nodes[0]?.blog,
      metaData: data?.pages?.nodes[0]?.seo,
      settings: data?.settingsOptions?.AsimOptions,
      mainMenus: data?.menus?.nodes,
    },
    revalidate: 60,
  }
}