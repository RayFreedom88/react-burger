import React, { FC } from 'react';

import { Redirect, Route, RouteProps } from 'react-router-dom';
import { useSelector } from "react-redux";
import { TState } from '../utils/types';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const {loggedIn} = useSelector<TState,{ loggedIn: boolean }>(state => state.auth);

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
};

export default ProtectedRoute;
