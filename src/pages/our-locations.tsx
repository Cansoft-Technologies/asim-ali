import { Footer, Header, Hero } from 'components';
import Head from 'next/head';
import React from 'react';
import { client } from 'client';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'next/image';


const Locations = () => {
    const { useQuery } = client;
    const generalSettings = useQuery().generalSettings;

    return (
        <div className='our-locations'>
        <Header />
            <Head>
                <title>
                Locations - {generalSettings?.title}
                </title>
            </Head>
            <main className="content">
            <Hero
                title="Our Locations"
                heading="Our"
                description="Locations"
                bgImage=""
            />
            <Container className='my-5'>
            
                <Row className='location-heading'>
                    <Col>
                        <h2>Our <span>Locations</span></h2>
                    </Col>
                </Row>
                <Row className='mt-5 location-images'>
                    <Col>
                    <Image 
                        src="/images/location-1.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                        <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                        
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-9.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-3.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-4.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-5.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                </Row>

                <Row className='location-images mb-5'>
                    <Col>
                    <Image 
                        src="/images/location-6.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-7.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-8.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-9.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                    <Col>
                    <Image 
                        src="/images/location-10.png"
                        alt=""
                        width="190" 
                        height="700" 
                        layout="responsive" 
                        objectFit="contain"
                        />
                         <div> 
                            <h2 dangerouslySetInnerHTML={{__html: ' Coquitlam'.split('').join('</span><span>') + '</span>' }}  ></h2>
                        </div>
                    </Col>
                </Row>

                
            </Container>
            </main>
            <Footer />
        
    </div>
    );
};

export default Locations;