import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { useTranslation  } from 'react-i18next';
import { useHistory } from "react-router-dom";
import logo from '../../resources/logo.png';
import './index.scss';



export const View = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const handleLogin = () => {
        localStorage.setItem('loggedIn', 'true');
        history.push("/customers");
    }
    
    return (
        <div className="login-page">
            <div className="container">
                <div className="login-container">
                    <h3>{t("getstarted")}</h3>
                    <div>
                        <TextField 
                        label={t('email')}
                        />
                    </div>    
                    <div>
                    <TextField
                    id="standard-password-input"
                    label={t('password')}
                    type="password"
                    autoComplete="current-password"
                    />
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={handleLogin}>{t("login")}</Button>
                    </div>
                </div>
                <div className="login-info">
                    <img src={logo} alt="TheCoffeeMaker Logo"/>
                </div>
            </div>
         </div>
         )
}
