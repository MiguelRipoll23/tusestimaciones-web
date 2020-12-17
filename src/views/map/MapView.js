import { memo, useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import ApiUtils from '../../utils/ApiUtils.js';

import Spinner from '../../components/Spinner.js';
import Error from '../../components/Error.js';

import Stops from '../../json/stops.min.json';
import MarkerMin from '../../assets/marker-min.png';

const MapView = (props) => {
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState({ lat: 43.462068, lng: -3.810204 });
  const [markers, setMarkers] = useState([]);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: ApiUtils.GOOGLE_MAPS_KEY
  });

  const getCurrentPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    }, (error) => {
      if (error.code === 1 || error.code === 3) {
        return;
      }

      alert('La localización no está disponible.');
    });
  }

  const getMarkers = () => {
    const list = [];

    for (let stopId in Stops) {
      const stop = Stops[stopId];

      const marker = {
        id: stopId,
        text: stop[2],
        position: {
          lat: stop[0],
          lng: stop[1]
        }
      };

      list.push(marker);
    }

    setMarkers(list);
  };

  // Stop estimations
  const loadEstimationsStopView = (marker) => {
    props.update.view({
      'id': 'estimations_stop',
      'title': marker.text,
      'header': false,
      'data': {
        'push': true,
        'id': marker.id,
        'name': marker.text
      }
    });
  };

  const refresh = () => {
    setLoading(true);
  };

  // Init
  useEffect(() => {
    if (loading === false) {
      return;
    }

    // History
    if (props.view.data.push) {
      window.history.pushState(props.view, 'Mapa - TUS Santander', '/mapa');
    }

    getCurrentPosition();
    getMarkers();
  }, [loading, props])

  const containerStyle = {
    width: '100%',
    height: '100%'
  };

  const mapOptions = {
    fullscreenControl: false,
    disableDefaultUI: true
  };

  const onLoad = useCallback(function callback(map) {
    setLoading(false);
    map.setCenter(position);
  }, [position]);

  const renderMap = () => (
    <GoogleMap
    mapContainerStyle={containerStyle}
    center={position}
    zoom={17}
    options={mapOptions}
    onLoad={onLoad}>
      {markers.map((marker, i) => {
        return <Marker key={i}
          label={{
            color: '#1da1f2',
            text: marker.text,
            fontSize: '14px'
          }}
          position={marker.position}
          icon={{
            url: MarkerMin,
            labelOrigin: new window.google.maps.Point(11, 40)
          }}
          onClick={() => loadEstimationsStopView(marker)} />}
      )}
    </GoogleMap>
  );

  if (loadError) {
    return <Error error_text="No disponible" retry_text="Volver a intentar" retry_action={refresh} />
  }

  return isLoaded ? renderMap() : <Spinner />
};

export default memo(MapView);