import React from 'react';

import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
    const {loggedIn} = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={({ location }) => (
                (loggedIn)
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