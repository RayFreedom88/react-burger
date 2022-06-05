import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import Profile from '../components/profile/profile';
import { TLocation } from '../services/types/types';
import { OrderPage } from './order/order';

export function ProfilePage() {
    const { path } = useRouteMatch();
    const location = useLocation<TLocation>();

    return (
        <Switch location={location}>
            <Route path={`${path}/orders/:id`}>
                <OrderPage />
            </Route>

            <Route path={path}>
                <Profile />
            </Route>
        </Switch>
    );
}
