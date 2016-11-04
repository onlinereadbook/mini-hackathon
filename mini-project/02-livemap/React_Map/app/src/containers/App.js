import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as markerAction from '../actions/markerAction'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Map from '../components/Map'
import MarkerList from '../components/MarkerList'
import BottomNavigationExampleSimple from '../components/BottonNavigation'
import FontIcon from 'material-ui/FontIcon';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

import Menu from '../components/Menu'
import Dialog from '../components/Dialog'
import BadgeExampleSimple from '../components/IconButton'

const style = {
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#2d2b2b',
        position: 'relative',
        overflow: 'hidden'
    },
    content: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    list: {
        position: 'absolute',
        right: 0,
        top: 0,
        width: '20%',
        height: '100%',
        opacity: 0.9,
        zIndex: 1
    },
    functionButton: {
        position: 'absolute',
        right: '22%',
        top: 0,
        width: '3%',
        height: '100%',
        zIndex: 1,
        textAlign: 'center'
    },
    ButtonNavigation: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 1,
        textAlign: 'center'
    },
    ProfileButton: {
        position: 'absolute',
        right: '22%',
        top: 0,
        width: '20%',
        height: '100%',
        zIndex: 1,
        textAlign: 'center'
    }
}

const zoom = 12

class App extends Component {
    constructor(props) {
        super(props)
        this.addMarker = this.addMarker.bind(this)
        this.setMapCenter = this.setMapCenter.bind(this)

        // 預設台北101
        this.state = {
            init: {
                center: { lat: 25.0339031, lng: 121.5623212 },
                zoom: zoom
            },
            open: false
        }

        this.handleOpen = this.handleOpen.bind(this)
    }

    handleOpen() {
        if (this.state.open == false) {
            this.setState({ open: true })
        } else {
            this.setState({ open: false })
        }
    }



    componentDidMount() {
        const that = this

        if (navigator.geolocation) {
            // 設定目前位置
            navigator.geolocation.watchPosition((position) => {
                const { markerAction, markers } = that.props
                const location = { lat: position.coords.latitude, lng: position.coords.longitude }

                let myLocation = markers.filter(x => x.userId == 'andy')[0]

                if (myLocation) {
                    markerAction.setLocation('andy', location)
                } else {
                    markerAction.addMarker({
                        position: location,
                        text: '我在這',
                        photo: 'https://goo.gl/IBEpr8',
                        userId: 'andy'
                    })

                    this.setMapCenter(location)
                }

            })
        }
    }

    render() {
        const { dispatch, markers} = this.props

        return (
            <div style={style.container}>
                <div style={style.content}>
                    <Map center={this.state.init.center} zoom={this.state.init.zoom} markers={markers} />
                </div>

                <div style={style.functionButton}>
                    <FloatingActionButton mini={true} onClick={this.addMarker.bind(this)}>
                        <ContentAdd />
                    </FloatingActionButton>

                </div>
                <div style={style.ProfileButton}>
                    <BadgeExampleSimple></BadgeExampleSimple>
                </div>
                <div style={style.ButtonNavigation}>
                    <BottomNavigationExampleSimple handleOpen={this.handleOpen}></BottomNavigationExampleSimple >

                </div>

                <div>
                    <Menu open={this.state.open} markers={markers} setMapCenter={this.setMapCenter} >



                    </Menu>
                    <Dialog></Dialog>
                </div>

            </div >
        )
    }

    addMarker() {
        const { markerAction } = this.props
        const markers = [
            {
                position: { lat: 22.6246197, lng: 120.28278 },
                text: '鹽埕埔2號出口',
                photo: 'https://goo.gl/q2d8HC'
            }, {
                position: { lat: 22.6233427, lng: 120.2867754 },
                text: '樺達奶茶',
                photo: 'https://goo.gl/dsS35b'
            }, {
                position: { lat: 22.6261609, lng: 120.2718653 },
                text: '忠烈祠',
                photo: 'https://goo.gl/v4I9dl'
            }
        ]

        markers.map((marker, idx) => {
            markerAction.addMarker(marker)
        })
    }

    setMapCenter(location) {
        this.setState({
            init: {
                center: location,
                zoom: zoom
            }
        })
    }
}

function mapStateToProps(state) {
    return {
        markers: state.markers
    }
}

function mapDispatchToProps(dispatch) {
    return {
        markerAction: bindActionCreators(markerAction, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
