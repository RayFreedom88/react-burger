import { FC } from "react";
import styles from './not-found-404.module.css'

export const NotFound404: FC = () => {

    return (
        <>
            <div className={styles.container}>
                <h1 className="text text_type_digits-large">404</h1>
                <p className="text text_type_main-large">Страница не найдена</p>
            </div>
        </>
    );
}
