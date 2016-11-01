import React from 'react'
import Avatar from 'material-ui/Avatar'
import {List, ListItem} from 'material-ui/List'

const style = {
    mapList: {
        overflow: 'auto',
        backgroundColor: '#2d2b2b',
        height: '100%',
        width: '100%'
    },
    listItem: {
        color: '#dad7d7',
        borderBottom: '1px solid #dad7d7',
        paddingBottom: '2px'
    },
    avatar: {
        border: '2px solid #dad7d7',
        cursor: 'pointer'
    }
}

const MarkerList = ({markers, setMapCenter}) => {
    return (
        <List style={style.mapList}>
            {
                markers.map((marker, idx) => {
                    return (
                        <ListItem
                            style={style.listItem}
                            key={`marker_${idx}`}
                            primaryText={marker.text}
                            leftAvatar={<Avatar src={marker.photo} style={style.avatar} />}
                            onClick={() => {setMapCenter(marker.position)}}
                        />
                    )
                })
            }
        </List>
    )
}

export default MarkerList