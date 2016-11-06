import React from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import MarkerList from '../components/MarkerList'
import FontIcon from 'material-ui/FontIcon';
import SvgIcon from 'material-ui/SvgIcon';

import { blue500, red500, greenA200 } from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';


const iconStyles = {
    marginRight: 24,
    paddingLeft: 10,
    paddingTop: 10

};
const textStyles = {
    width: '70%',
    top: 0,
    zIndex: 1,
    textAlign: 'center'

};
const buttonStyles = {


};
const HomeIcon = (props) => (
    <SvgIcon {...props}>
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
);

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
                <Drawer width={300} openSecondary={true} open={this.props.open} >

                    <HomeIcon style={iconStyles} color={red500} hoverColor={greenA200} />
                    目前所在頻道為公共頻道
                    <br />
                    <TextField hintText="請輸入訊息" style={textStyles} />
                    <RaisedButton label="送出" style={buttonStyles} />


                </Drawer>
            </div>
        );
    }
}