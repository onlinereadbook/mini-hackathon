import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MarkerList from '../components/MarkerList'
import FontIcon from 'material-ui/FontIcon';

import { blue500, red500, greenA200 } from 'material-ui/styles/colors';

const iconStyles = {
    marginRight: 24,
};


export default class DrawerOpenRightExample extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { open: true };
    }

    // handleToggle = () => this.setState({ open: !this.state.open });
    //<MarkerList markers={this.props.markers} setMapCenter={this.props.setMapCenter} />
    render() {
        return (
            <div>
                >
                <Drawer width={300} openSecondary={true} open={this.props.open} >
                    ==
                    <FontIcon
                        className="muidocs-icon-action-home"
                        style={iconStyles}
                        color={blue500}

                        />
                    ==
                </Drawer>
            </div>
        );
    }
}