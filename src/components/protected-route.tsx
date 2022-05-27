import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { useSelector } from '../services/hooks';


export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const {loggedIn} = useSelector(state => state.auth);

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
