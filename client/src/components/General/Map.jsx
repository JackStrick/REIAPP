import React, { useEffect, useState } from 'react';

/**
* Map component to display Google Maps with markers for provided properties.
* @param {Object[]} properties - Array of properties to display on the map.
* @returns {JSX.Element} - Rendered Map component.
*/
function Map({ properties }) {
  const [googleMapLoaded, setGoogleMapLoaded] = useState(false);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

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
  }, [googleMapLoaded, properties]);

  const initializeMap = () => {
    // Ensure that the google maps API is available
    if (window.google && window.google.maps) { 
      let mapOptions;
      
      // If single property set map view to that property
      if (properties.length == 1) {
        const lat = parseFloat(properties[0].Lat);
        const lng = parseFloat(properties[0].Lng);

        mapOptions = {
          center: { lat, lng },
          zoom: 19,
          mapTypeId: 'hybrid',
        };
        // If not, set general map view
      } else {
        mapOptions = {
          center: { lat: 41.603222, lng: -73.087746 },
          zoom: 7,
        };
      }


      const mapInstance = new window.google.maps.Map(document.getElementById('map'), mapOptions);

      const newMarkers = properties.map((property) => {
        const lat = parseFloat(property.Lat);
        const lng = parseFloat(property.Lng);

        const marker = new window.google.maps.Marker({
          position: { lat, lng },
          map: mapInstance,
          title: property.PropertyAddress,
        });

        marker.addListener('click', () => {
          mapInstance.setZoom(19);
          mapInstance.setCenter(marker.getPosition());
        });

        return marker;
      });

      setMap(mapInstance);
      setMarkers(newMarkers);
    }
  };

  return (
    <div id="map" style={{ width: '100%', height: '300px' }}>
      {/* The map will be rendered here */}
    </div>
  );
}

export default Map;
