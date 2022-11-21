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



const blog = () => {

    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    const [blogs, setBlogs] = useState([]);
    const [pages, setPages] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: 'http://localhost:10004/graphql',
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`
          query{
            posts {
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
        .then((result) => setBlogs(result?.data?.posts?.nodes));


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
        .then((result) => setPages(result?.data?.pages?.nodes));


    }, []);
    
    
    const myLoader = ({ src, width, quality }) => {
      return `${src}?w=${width}&q=${quality || 75}`
    }
    return (
        <div>
            <Header />
           
                {pages.map((page, i) => {
                    return(
                        <div key={i}> 
                        <Head>
                    <title>
                        {console.log(page?.blog)}
                   {page?.blog.blogBannerTitle} - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                <Hero
                    title={page?.blog.blogBannerTitle}
                    bgImage={page?.blog?.blogBannerBackgroundImage?.sourceUrl}
                />

                <Container className="my-5 blog-container">
                    <div className="row row-cols-1 row-cols-md-3 g-4">


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
                            <Link href={blog.uri}><h5 className="card-title">{blog?.title}</h5>
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
                </Container>
             
                </main>

                        </div>
                    )
                })}

               
                
                <Footer />
        </div>
    );
};

export default blog;