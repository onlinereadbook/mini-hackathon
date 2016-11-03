import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MarkerList from '../components/MarkerList'

export default class DrawerOpenRightExample extends React.Component {

    constructor(props) {
        super(props);
        //this.state = { open: true };
    }

    // handleToggle = () => this.setState({ open: !this.state.open });

    render() {
        return (
            <div>

                <Drawer width={200} openSecondary={true} open={this.props.open} >
                    <MarkerList markers={this.props.markers} setMapCenter={this.props.setMapCenter} />
                </Drawer>
            </div>
        );
    }
}