import React from 'react'
import Avatar from 'material-ui/Avatar';

const style = {
    border: '2px solid #2d2b2b',
    cursor: 'pointer'
}

const Marker = ({text, photo, index}) => {
    return (
        <Avatar
            src={photo}
            size={40}
            title={text}
            style={style}
            onClick={() => alert(text)}
        />
    )
}

export default Marker