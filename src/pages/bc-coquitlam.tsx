import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';      
import Image from 'next/image';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const BcCoquitlam = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;
    return (
        <div className='Bc-Coquitlam'>
        <Header />
            <Head>
                <title>
                B.C. Coquitlam - {generalSettings?.title}
                </title>
            </Head>
            <main className="content">
            <Hero
                title="B.C. Coquitlam"
                heading="B.C. Coquitlam"
                description="B.C. Coquitlam"
                bgImage=""
            />
            <Container className='my-5'>
                <Row className='refinance-text my-5'>
                    <Col md={5}>
                        <h2>B.C <span>Coquitlam</span></h2>
                    </Col>
                    <Col md={7}>
                        <p>At Asim Ali Mortgage, we pride ourselves on providing a stream- lined mortgage process for consumers. Our expert mortgage broker in Coquitlam has supported hundreds of families across Canada with finance and we’re ready to do the same for you.Let us help set you on the path to homeownership today!</p> 
                    </Col>
                </Row>
                <Row className='coquitlam-grid my-5'>
                    <Col md={7}>
                        <h2>The Best Mortgage Broker in Coquitlam: <span>Asim Ali</span></h2>
                        <p>A Mortgage Broker in Coquitlam is a registered mortgage specialist. We have access to a variety of creditors and mortgage rates. You hire someone to act on your behalf by hiring a mortgage broker in Coquitlam such as myself. It’s strongly suggested that you deal with a reputable mortgage broker in Co- quitlam, since brokers will provide solutions from all over the world, and the bank is only limited to its products, which helps them save significant money directly for customers like yourself.</p>
                        <p>The gaps between a broker and your bank will be affected. It would be ideal if you became more aware of other options. It wouldn’t be a terrible idea to go through some of the fundamental categories where they are very distinct in order to grasp the distinctions between brokers and banking companies completely:</p>

                    </Col>
                    <Col md={5}>
                    <Image 
                        src="/images/conquitlam-grid.png"
                        alt=""
                        width="100%" 
                        height="120" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                </Row>
                <Row className='application-slider'>
                <Carousel 
                    autoPlay={true}
                    infinite={true}
                    responsive={responsive}
                    >
                        <div className="application-slide text-center">
                            <h4>Application Potential</h4>
                            <p>There are also a few methods for connecting a bank and a landlord in the real estate business. Both work with you to develop the proposal, but our mortgage broker in Coquitlam will be more hands-on with you.</p>
                        </div>
                        <div className="application-slide text-center">
                            <h4>Application Potential</h4>
                            <p>There are also a few methods for connecting a bank and a landlord in the real estate business. Both work with you to develop the proposal, but our mortgage broker in Coquitlam will be more hands-on with you.</p>
                        </div>
                        <div className="application-slide text-center">
                            <h4>Application Potential</h4>
                            <p>There are also a few methods for connecting a bank and a landlord in the real estate business. Both work with you to develop the proposal, but our mortgage broker in Coquitlam will be more hands-on with you.</p>
                        </div>
                    </Carousel>
                </Row>
                <Row className="product-service">
                    <Col md={12}>
                        <h2 className='text-center'>Mortgage products and services you can trust:</h2>
                    </Col>
                    <Col md={3}>
                        <h2>Rates:</h2>
                        <p>Even though our prices are already competitive, we still want to give you the best rate possible. See how our latest pricing stacks up against the competition below.</p>
                        <h2>Mortgage Refinancing:</h2>
                        <p>Even though our prices are already competitive, we still want to give you the best rate possible. See how our latest pricing stacks up against the competition below.</p>
                    </Col>
                    <Col md={6}>
                        <Image 
                        src="/images/conquitlam-grid.png"
                        alt=""
                        width="190" 
                        height="200" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                    </Col>
                    <Col md={3}>
                        <h2>Ready to buy your first new home:</h2>
                        <p>Even though our prices are already competitive, we still want to give you the best rate possible. See how our latest pricing stacks up against the competition below.</p>
                        <h2>Mortgage Renewals:</h2>
                        <p>Even though our prices are already competitive, we still want to give you the best rate possible. See how our latest pricing stacks up against the competition below.</p>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <h2>01</h2>
                        <h2>Apply Online</h2>
                    </Col> 
                    <Col md={4}>
                    <h2>01</h2>
                        <h2>Apply Online</h2>
                        <p>We streamline the mortgage process so you can focus on what’s important: your new home. We’ll take care of the red tape and get you Approved promptly, with clear and transparent conditions.</p> 
                    </Col> 
                    <Col md={4}>
                        <h2>01</h2>
                        <h2>Apply Online</h2>
                    </Col> 
                </Row>
                <Row>
                    <Col>
                        <h2>Work with the best Mortgage Broker Coquitlam</h2> 
                        <p>Refinancing, Renewing, or Need Some Additional Advice From Your Mortgage Broker in Coquitlam? Were you aware that most lenders don’t ever give borrowers the right rate renovation form to sign at the renewal time? But worse, statistics show that most borrower signs these uncompetitive forms of mortgage renewal with no advice whatsoever! Borrowers leave cash on the table.</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h2>Mortgage Renovation Form</h2>
                        <h3>Refinancing</h3>
                        <h2>Pre-Approval</h2>
                    </Col>
                    <Col>
                        <p>On the other hand, refinancing is even more complicated and takes an integrated approach to find the best refinancing option.</p>
                        <b><i>You may be involved in refinancing for several reasons:</i></b>
                        <ul>
                            <li>Buy a car</li>
                            <li>Consolidate debt</li>
                            <li>Finance renovations</li>
                            <li>Get a home equity line of credit (HELOC).</li>
                            <li>Borrow more and buy an investment</li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <h2>Why Work With A Mortgage Broker In Coquitlam?</h2>
                    <p>Two forms to get a mortgage are usually available in Canada: a bank or a certified mortgage broker in Coquitlam.</p>
                    <a href="#">Read More &#8964;</a>
                    </Col>
                </Row>
               
            </Container>
            <CTA />
            </main>
            <Footer />
        
    </div>
    );
};

export default BcCoquitlam;