import { FC } from "react";
import OrderList from "../../components/order-list/order-list";
import OrderStats from "../../components/order-stats/order-stats";

import styles from './feed.module.css'

export const FeedPage: FC = () => {

    return (
        <>
            <h1 className={`text text_type_main-large mt-10 mb-5 pl-5`}>
                Лента заказов
            </h1>

            <section className={styles.container}>
                <OrderList/>
                <OrderStats/>
            </section>
        </>
    );
};
