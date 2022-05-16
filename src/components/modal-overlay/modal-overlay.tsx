import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { IModalOverlay } from '../../utils/interfaces';
import styles from './modal-overlay.module.css';

const ModalOverlay: FC<IModalOverlay> = ({ onClick }) => {
    
    return (
        <div className={`${styles.modaloverlay}`} onClick={onClick}></div>
    )
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;
