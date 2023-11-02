import React, { useEffect, useState } from 'react';

function Map({ property }) {
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!googleMapLoaded) {
      // Check if the Google Maps API script is already loaded
      if (!document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBzcNrbs4vcNpzcb8-dBYHpJBwtJL-LJ8o&libraries=places`;
        googleMapsScript.async = true;
        googleMapsScript.defer = true;

        googleMapsScript.addEventListener('load', () => {
          setGoogleMapLoaded(true);
          initializeMap(); // Call initializeMap once the script is loaded
        });

        document.head.appendChild(googleMapsScript);
      } else {
        setGoogleMapLoaded(true);
        initializeMap(); // Call initializeMap immediately if the script is already loaded
      }
    }
  }, [googleMapLoaded]);

  const initializeMap = () => {
    if (window.google && window.google.maps) { // Ensure that the google maps API is available
      const lat = parseFloat(property.Lat);
      const lng = parseFloat(property.Lng);

      const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat, lng },
        zoom: 19,
        mapTypeId: 'hybrid', // Set the map type to satellite
      });

      const markerInstance = new window.google.maps.Marker({
        position: { lat, lng },
        map: mapInstance,
        title: property.PropertyAddress,
      });

      setMap(mapInstance);
      setMarker(markerInstance);
    }
  };

  return (
    <div id="map" style={{ width: '100%', height: '300px' }}>
      {/* The map will be rendered here */}
    </div>
  );
}

export default Map;
