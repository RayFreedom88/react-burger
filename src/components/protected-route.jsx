import React, { useEffect } from 'react';

import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useDispatch } from "react-redux";
import { updateToken } from '../services/actions/auth';


export function ProtectedRoute({ children, ...rest }) {
    const dispatch = useDispatch();
    const refreshToken = localStorage.refreshToken;

    useEffect(() => {
        console.log('protected-route');
        if (refreshToken) { 
            dispatch(updateToken());
        };
    }, [dispatch, refreshToken]);

    return (
        <Route
            {...rest}
            render={({ location }) => (
                (refreshToken)
                    ? (children)
                    : (<Redirect to={{
                        pathname: '/login',
                        state: { from: location }
                    }} />)
            )}
        />
    );
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
};