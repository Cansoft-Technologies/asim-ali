import { CTA, Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

const Services = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;


    return (
        <div className='our-services'>
            <Header />
                <Head>
                    <title>
                    Services - {generalSettings?.title}
                    </title>
                </Head>
                <main className="content">
                <Hero
                    title="Our Services"
                    heading="Our"
                    description="Services"
                    bgImage=""
                />
                <Container className='my-5'>
                    <Carousel 
                        autoPlay={true}
                        infinite={true}
                        responsive={responsive}
                        >
                        <div className="slide-text">
                            <h4>BORROWED DOWN PAYMENT SERVICES</h4>
                        </div>
                        <div className="slide-text">
                            <h4>BORROWED DOWN PAYMENT SERVICES</h4>
                        </div>
                        <div className="slide-text">
                            <h4>BORROWED DOWN PAYMENT SERVICES</h4>
                        </div>
                        <div className="slide-text">
                            <h4>BORROWED DOWN PAYMENT SERVICES</h4>
                        </div>
                        <div className="slide-text">
                            <h4>BORROWED DOWN PAYMENT SERVICES</h4>
                        </div>
                       
                    </Carousel>
                    <Row className='refinance-text'>
                        <Col md={5}>
                            <h2>Refinancing <span>Services</span></h2>

                        </Col>
                        <Col md={7}>
                            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut Lorem ipsum dolor sit amet, consectetuer adipi- scing elit, sed diam nonummy nibh euismod tincidunt ut</p> 
                        </Col>
                    </Row>
                    <Row>
                        <Col> 
                            <div className="service-text"> 
                            <p>You might be working toward improving your credit score right now and that is great! You might now qualify for new mortgage products that could allow you to get a better discount. You might also simply want to stabilize your mortgage payments by switching to a fixed-rate mortgage instead of a variable rate. </p>
                            
                            <p>Refinancing is another great way to consolidate debt, to get capital to invest, for home improvement, and other major expenses. Are you interested in refinancing your mortgage? Contact Asim Ali and his team today!</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <CTA />
                </main>
                <Footer />
            
        </div>
    );
};

export default Services;