import React, { useState, useEffect } from 'react';

function Map({ property }) {
    const [coordinates, setCoordinates] = useState(null);
    const [googleMapLoaded, setGoogleMapLoaded] = useState(false);

    useEffect(() => {
        const { PropertyAddress, City, State, ZipCode } = property;
        const addressQuery = `${PropertyAddress}, ${City}, ${State} ${ZipCode}`;
        console.log('Address Selected', addressQuery);

        const geoRequest = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            addressQuery
        )}&key=AIzaSyBC0CFPjhnRovEXBqt42WuohVznI0-3okE`;


        async function geocodeAddress() {
            try {
                const response = await fetch( geoRequest );

                if (!response.ok) {
                throw new Error('Geocoding failed');
                }

                const data = await response.json();
                if (data.results && data.results.length > 0) {
                const { lat, lng } = data.results[0].geometry.location;
                setCoordinates({ lat, lng });
                } else {
                console.log('Invalid coordinates');
                }
            } 
            catch (error) {
                console.error(error);
            }
        }

        geocodeAddress();
    }, [property]);

    useEffect(() => {
        if (coordinates) {
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: coordinates,
                zoom: 15,
            });

            if (coordinates.lat && coordinates.lng) {
                new window.google.maps.Marker({
                    position: coordinates,
                    map,
                    title: property.PropertyAddress,
                });
            }
        }
    }, [coordinates, property]);

    return (
        <div id="map" style={{ width: '100%', height: '300px' }}>
            {/* The map will be rendered here */}
        </div>
    );
}

export default Map;
