import React, { FC } from 'react';
import { IModalOverlay } from '../../services/types/components';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
    
    return (
        <div className={`${styles.modaloverlay}`} onClick={onClick}></div>
    )
};

export default ModalOverlay;
