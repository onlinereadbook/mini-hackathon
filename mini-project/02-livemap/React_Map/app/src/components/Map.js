import React from 'react'
import GoogleMap from 'google-map-react'

import Marker from './Marker'

const style = {
    map: {
        borderRadius: '10px 0 0 10px',
        float: 'left',
        width: '100px',
        height: '100px',
        backgroundColor: '#2d2b2b'
    }
}

const Map = ({center, zoom, markers}) => {
    return (
        <GoogleMap center={center} zoom={zoom}>
            {
                markers.map((marker, idx) => <Marker key={`marker_${idx}`} {...marker.position} text={marker.text} photo={marker.photo} index={idx + 1} />)
            }
        </GoogleMap>
    )
}



export default Map