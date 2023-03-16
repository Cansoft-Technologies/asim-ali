import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { client, Page as PageType } from 'client';
import { Header, Footer, Hero, Pagination } from '../components';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { Button, Container } from 'react-bootstrap';
import Link from 'next/link';
import Moment from 'react-moment';



const Blog = () => {

    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    const [blogs, setBlogs] = useState([]);
    const [datas, setDatas] = useState([]);
    const [isLoading, seIsLoading] = useState(true);

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 6;

    

      useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`
          query{
            posts (where: {offsetPagination: {size: 10000 }}) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
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
        .then((result) => 

        {
          
        const count = result?.data?.posts?.nodes.length;
       
        const pageNumber = Math.ceil(count/size);
        setPageCount(pageNumber);

        

        }
        
        );
        const offset = size * page;
        client
        .query({
          query: gql`
          query{
            posts (where: {offsetPagination: {offset: ${offset},  size: ${size}}}) {
              nodes {
                title
                featuredImage {
                  node {
                    sourceUrl
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
        .then((result) =>  {
        seIsLoading(false);
        setBlogs(result?.data?.posts?.nodes);
       
        }
        
        );


        client
        .query({
          query: gql`query MyQuery {
            pages(where: {title: "blog"}) {
              nodes {
                blog {
                  blogBannerTitle
                  blogBannerBackgroundImage {
                    altText
                    sourceUrl
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setDatas(result?.data?.pages?.nodes));


    }, [page]);
    
    
    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <div>
            <Header />
           
                {datas.map((data, i) => {
                    return(
                        <div key={i}> 
                <Head>
                    <title>
                   {data?.blog.blogBannerTitle} - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                <Hero
                    title={data?.blog.blogBannerTitle}
                    bgImage={data?.blog?.blogBannerBackgroundImage?.sourceUrl}
                />

{ isLoading && 
<div className="text-center py-5">
<div className="spinner-border text-dark" role="status">
    <span className="visually-hidden">Loading...</span>
</div>
</div>   
}

                <Container className="my-5 blog-container">
                <h1 className="my-3">{data?.blog.blogBannerTitle}</h1>
                    <div className="row row-cols-1 row-cols-md-3 g-4 items">
                        {blogs.map((blog, index) => {
                            return(
                        <div key={index} className="col">
                            <div className="card h-100">
                           <div className="blogImage">
                           <Image 
                            loader={myLoader}
                            src={blog?.featuredImage?.node?.sourceUrl}
                            width="100%" 
                            height="65" 
                            layout="responsive" 
                            objectFit="contain"
                            alt={blog?.featuredImage?.node?.altText} />
                           </div>
                            <div className="card-body">
                            <Link href={blog.uri}><h2 className="card-title">{blog?.title}</h2>
                            </Link>
                                <span>

                                    <Moment format="MMM D, YYYY" >{blog.date}</Moment></span>
                                {/* <p dangerouslySetInnerHTML={{__html: blog?.content.textContent }}className="card-text my-3"></p> */}
                                <p className='blog-content'>{blog?.content.replace( /(<([^>]+)>)/ig, '')}</p>
                            </div>
                            <div className="card-footers p-3">
                                <Link href={blog.uri}>
                                    <Button className="readMoreBtn" >Read <span>More</span></Button>
                                </Link>
                            </div>
                            </div>
                        </div>
                        
                            )
                        })}
                        
                      
              
                    </div>
                    <div className="pagination">
                {
              [...Array(pageCount).keys()].map( (number) => <Button
              className={number == page ? "contactBtn selected": 'contactBtn'}
              key={number}
              onClick={() => setPage(number)}
              >{number + 1}
              </Button> )
          } 
                        </div>
                </Container>
             
                </main>

                        </div>
                    )
                })}

               
                
                <Footer />
        </div>
    );
};

export default Blog;