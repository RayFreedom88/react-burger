import { CSSProperties, FC } from "react";
import OrderList from "../components/order-list/order-list";
import OrderStats from "../components/order-stats/order-stats";

export const FeedPage: FC = () => {
    const styleFeed: CSSProperties = {
        display: 'flex',
        justifyContent: 'center',
        gap: 60,
        margin: '0 auto',
        height: 'calc(100vh - 190px)',
        width: 1280
    };

    return (
        <>
            <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>
                Лента заказов
            </h1>

            <section style={styleFeed}>
                <OrderList/>
                <OrderStats/>
            </section>
        </>
    );
};
