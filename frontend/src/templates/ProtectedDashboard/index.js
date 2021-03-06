import React from 'react';
import { Route, Redirect } from "react-router-dom";
import Header from '../../shared/Header';
import Footer from '../../shared/Footer';
import Sidebar from '../../shared/Sidebar';

import './index.scss';

const ProtectedDashboard = (props) => {
    let { component: Component, ...rest } = props;
    const isUserLoggedIn = localStorage.getItem('loggedIn');
    if(isUserLoggedIn) {
    return( 
        <React.Fragment>
        <Header/>
        <div className="dashboard">
            <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="content">
                    <Route {...rest} render={(props) => <Component {...props} />} />
                </div>
            </div>
            <Footer />
        </React.Fragment>
        )
    }
    return <Redirect to="/"/>
}

export default ProtectedDashboard;