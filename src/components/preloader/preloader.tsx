import { FC } from 'react';
import logo from '../../images/logo.png';
import styles from './preloader.module.css';

interface IPreloader {
    width?: string | number;
    height?: string | number;
    bottom?: string | number;
    bg?: boolean;
}

const Preloader: FC<IPreloader> = ({ width, height, bottom, bg }) => {
    const backgroundColor = bg ? '#131316aa' : 'transparent'

    return (
        <div className={styles.loader} style={{ width, height, backgroundColor  }}>
            <img className={styles.spinner} style={{bottom}} src={logo} alt='' title='' />
        </div>
    );
}

export default Preloader;
