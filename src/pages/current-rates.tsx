import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';
import { client, Page as PageType } from 'client';
import { Button } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';

const Current = () => {

    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;


    const [datas, setDatas] = useState([]);

      useEffect(() => {
        const client = new ApolloClient({
            uri: `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`,
            cache: new InMemoryCache(),
          });
        client
        .query({
          query: gql`query {
            pages(where: {title: "Current Rates"}) {
              nodes {
                CurrentRates {
                  bannerTitle
                  currentMortgageRate
                  currentPrimeRate
                  easyApplicationForm
                  easyApplicationSubtitle
                  easyApplicationTitle
                  mortgageLoanApplicationForm
                  paymentCalculatorTitle
                  tableBottomNotes
                  bannerBackgroundImage {
                    altText
                    sourceUrl
                  }
                  easyApplicationBackground {
                    altText
                    sourceUrl
                  }
                  paymentCalculatorLink {
                    url
                  }
                  tableRateInformation {
                    terms
                    bankRates
                    dominion
                  }
                }
              }
            }
          }`,
        })
        .then((result) => setDatas(result?.data?.pages?.nodes));
    }, []);
    


    return (
        <div className='currentRate'>
            {datas.map((data, index) => {
                return(
                    <div key={index}className="currentRate-container">
                    <Header />
                     <Head>
                         <title>
                        {data?.CurrentRates?.bannerTitle} - {generalSettings?.title}
                         </title>
                     </Head>
                     <main className="content">
                     <Hero
                         title={data?.CurrentRates?.bannerTitle}
                         bgImage={data?.CurrentRates?.bannerBackgroundImage?.sourceUrl}
                     />
     
                     <div className="container py-5">
                         <div className="row">
                             <div className="col-md-6">
                                 <div className="current-rate">
                                    {data?.CurrentRates?.currentMortgageRate == null ? "" : (
                                    <p>Current Variable Mortgage Rate is <b>{data?.CurrentRates?.currentMortgageRate}</b></p> 

                                    )}
                                {data?.CurrentRates?.currentPrimeRate == null ? "" : (
                                     <p>Current Prime Rate is <b>{data?.CurrentRates?.currentPrimeRate}</b></p>
                                )}
                                

                                 </div>
                             <table className="text-center table table-striped table-hover">
                             <thead className='table-dark'>
                                 <tr>
                                 <th scope="col">Terms</th>
                                 <th scope="col">Bank Rates</th>
                                 <th scope="col">Dominion</th>
                                 </tr>
                             </thead>
                             <tbody>
           {data?.CurrentRates?.tableRateInformation.map( (info, i)=> {
                                    return(
                                        <tr key={i}>
                                         <td>{info?.terms}</td>
                                         <td>{info?.bankRates}%</td>
                                         <td>{info?.dominion}%</td>
                                     </tr>
                                    )
                                } )}
                                     
                                     
                             </tbody>
     
                             </table>
                             <div dangerouslySetInnerHTML={{__html: data?.CurrentRates?.tableBottomNotes}} className="notes fst-italic">
                             </div>
                             </div>
                             <div dangerouslySetInnerHTML={{__html: data?.CurrentRates?.mortgageLoanApplicationForm}}  className="col-md-6"> 
                                 
                             </div>
                         </div>
                     </div>
                     <div style={{ 
                            backgroundImage: `url("${data?.CurrentRates?.easyApplicationBackground?.sourceUrl}")` 
                          }} className="easy-application">
                     {/* <div className="overlay"></div> */}
                            <h1>{data?.CurrentRates?.easyApplicationTitle}</h1>
                            <h2>{data?.CurrentRates?.easyApplicationSubtitle}</h2> 
                     
                        <div dangerouslySetInnerHTML={{__html: data?.CurrentRates?.easyApplicationForm}}   className="application-container"></div>
                     </div>
                     <div className="calculator-cta"> 
                         <h2>{data?.CurrentRates?.paymentCalculatorTitle}</h2>
                         <Link href={data?.CurrentRates?.paymentCalculatorLink?.url}>
                         <Button className="contactBtn">Mortgage Calculator</Button> 
                        </Link>
                     </div>
                     </main>
                     <Footer />  
                    </div>
                )
            }) }
           
        </div>
        
    );
};

export default Current;