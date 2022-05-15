import React, { FC } from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

interface IPropsModalOverlay {
    onClick?: () => void;
};

const ModalOverlay: FC<IPropsModalOverlay> = ({ onClick }) => {
    
    return (
        <div className={`${styles.modaloverlay}`} onClick={onClick}></div>
    )
};

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default ModalOverlay;
