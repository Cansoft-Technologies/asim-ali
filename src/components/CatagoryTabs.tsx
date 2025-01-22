import React from 'react';
import Link from 'next/link';
import { Button, Container, Row } from 'react-bootstrap';

type Props = {
  planData: any;
};
const CategoryTabs = (props: Props) => {
    const { planData } = props;
    return (
        <Container className="category-tabs">
          <p className="text-center service-title">{planData?.planTitle}</p>
            <div className="justify-content-center mt-5 d-flex align-items-center gap-3">
                {planData?.linkUrls?.map((category, index) => (
                    <div className="" key={index}>
                      <Link  href={category?.url} passHref>
                        <Button variant="light" className="category-button">
                            {category?.linkText}
                        </Button>
                    </Link>
                    </div>
                
                ))}
            </div>
        </Container>
    );
};

export default CategoryTabs;
