// components/EmbeddedMap.tsx
import React from 'react';
import { Container } from 'react-bootstrap';



type Props = {
  mapData: any;
};
const EmbeddedMap = (props: Props) => {
  const { mapData } = props;
    return (
        <Container className='mapContainer'>
          <h2 className="my-5 text-center service-title mt-5">{mapData?.mapTitle}</h2>
            <iframe
                src={mapData?.mapUrl}
                width="100%"
                height="450"
                style={{ border: '0' }}
                allowFullScreen
                loading="lazy"
            ></iframe>
        </Container>
    );
};

export default EmbeddedMap;
