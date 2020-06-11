import React from "react";
import { expireJWT } from "../components/HttpClient";

export default class returnToLoginScreen extends React.Component<{navigation:any}> {

    constructor(props: {navigation:any}){
        super(props);
        expireJWT();
        this.props.navigation.navigate('Login');
    }

    render(){
        return (null)
    }
}