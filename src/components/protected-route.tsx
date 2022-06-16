import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
// import { getUser, updateToken } from '../services/actions/auth';

import { useSelector } from '../services/hooks';

export const ProtectedRoute: FC<RouteProps> = ({ children, ...rest }) => {
    const {loggedIn} = useSelector(state => state.auth);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     if (localStorage.refreshToken) {
    //         dispatch(updateToken());
    //         dispatch(getUser());
    //     };
    // }, [dispatch]);

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
