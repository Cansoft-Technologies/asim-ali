import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React, { useState, useEffect, useRef} from 'react';
import { client, Page as PageType } from 'client';
import { Button, Row, Col, Container  } from 'react-bootstrap';
import { gql } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Link from 'next/link';
import emailjs from '@emailjs/browser';


const Current = () => {

    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;


    const [datas, setDatas] = useState([]);
    const [success, setSuccess] = useState(null);

    const [success2, setSuccess2] = useState(null);


    const form = useRef();
    const form2 = useRef();


    const sendEmail = (e) => {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_s5qgd6k",
          "template_hvh5bop",
          form.current,
          "bKO8M-uo0olOYAj7Z"
        )
        .then(
          (result) => {
            setSuccess(result.text);
        
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
    };

    const sendEmail2 = (e) => {
      e.preventDefault();
      emailjs
        .sendForm(
          "service_s5qgd6k",
          "template_hvh5bop",
          form2.current,
          "bKO8M-uo0olOYAj7Z"
        )
        .then(
          (result) => {
            setSuccess2(result.text);
        
          },
          (error) => {
            console.log(error.text);
          }
        );
      e.target.reset();
    };


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
                  easyApplicationSubtitle
                  easyApplicationTitle
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
                             <div className="col-md-12">
                                 <div className="current-rate">
                                  <div className="current-container">
                                    {data?.CurrentRates?.currentMortgageRate == null ? "" : (
                                    <p>Current Variable Mortgage Rate is <b>{data?.CurrentRates?.currentMortgageRate}</b></p> 

                                    )}
                                {data?.CurrentRates?.currentPrimeRate == null ? "" : (
                                     <p>Current Prime Rate is <b>{data?.CurrentRates?.currentPrimeRate}</b></p>
                                )}
                                

                                
                             <table className="text-center table table-striped table-hover">
                             <thead className='table-light'>
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
                             </div>  
                             </div>

                             <div  className="col-md-12"> 
                             <div className="current-container"  >
                             <h3>Apply for a Mortgage Loan Now!</h3>
                              <form ref={form} onSubmit={sendEmail} >
                                <input placeholder="Full Name"  type="text" name="fullname" />
                                <input placeholder="Email"  type="email" name="email" />
                                <input placeholder="Phone"  type="text" name="phone" />
                                <input placeholder="Purchase Price"  type="text" name="price" />
                                <input value="Apply Now"  type="submit" className="contactBtn" />
                                {success && <div className="alert alert-success mt-4" role="alert">
                            Your message was sent Successfully
                        </div>}
                              </form>
                             </div>
                             </div>
                         </div>
                     </div>
                     
                     <div style={{ 
                            backgroundImage: `url("${data?.CurrentRates?.easyApplicationBackground?.sourceUrl}")` 
                          }} className="easy-application">
                    <div className="overlay"></div>
                    <Container className="py-1">
                        <Row>
                          <Col md={6}>
                        <div className="easyapplication-title">
                          <h2>{data?.CurrentRates?.easyApplicationTitle}</h2>
                          <p>{data?.CurrentRates?.easyApplicationSubtitle}</p> 
                        </div>
                     
                        <div className="application-container">
                        <form ref={form2} onSubmit={sendEmail2}>
                          <input placeholder="Full Name"  type="text" name="fullname" />
                          <input placeholder="Email"  type="email" name="email" />
                          <input placeholder="Phone"  type="text" name="phone" />
                          <input value="Send"  type="submit" className="contactBt" />
                          {success2 && <div className="alert alert-success mt-4" role="alert">
                            Your message was sent Successfully
                        </div>}
                        </form>

                        </div>
                          </Col>
                          <Col md={6}></Col>
                        </Row>
                        </Container>

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