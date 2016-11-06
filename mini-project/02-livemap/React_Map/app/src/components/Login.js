import React from 'react'
import FacebookLogin from 'react-facebook-login';
import RaisedButton from 'material-ui/RaisedButton';

const Login = ({isLogin, fbLogin, guestLogin, logout}) => {
    return (
        <div>
            {
                !isLogin 
                ? (
                    <div>
                        <FacebookLogin
                            appId="726019197546139"
                            autoLoad={true}
                            fields="name,email,picture"
                            callback={fbLogin}
                            icon="fa-facebook"
                        />
                        <RaisedButton label="訪客登入" primary={true} onTouchTap={() => guestLogin()}/>
                    </div>
                ) : <RaisedButton label="Logout" secondary={true} onTouchTap={() => logout()}/>
            }
        </div>
    )
}

export default Login