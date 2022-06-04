import React, { FC, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { updateToken } from '../services/actions/auth';

import { useDispatch, useSelector } from '../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const {loggedIn} = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        if (localStorage.refreshToken) {
            dispatch(updateToken());
        };
    }, [dispatch]);

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
