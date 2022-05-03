import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

function ModalHeader({ children, onClick }) {

    return (
        <div className={styles.modal__header}>
            <p className={'text text_type_main-large'}>
                {children}
            </p>

            <CloseIcon onClick={onClick} />
        </div>
    )
}

ModalHeader.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string
    ]).isRequired
}

function ModalBody({ children }) {

    return (
        <div className={styles.modal__body}>
            {children}
        </div>
    )
}

ModalBody.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
    ]).isRequired
}

function Modal({ header, children, onClose }) {
    const modalRoot = document.getElementById('modal-root');

    const handleEscKeyDown = useCallback((e) => {
        if (e.key === 'Escape') {
            onClose();
        };
    }, [onClose]);


    useEffect(() => {
        window.addEventListener('keydown', handleEscKeyDown);

        return () => {
            window.removeEventListener('keydown', handleEscKeyDown);
        };

    }, [handleEscKeyDown])

    return createPortal(
        <div id='modal'>
            <ModalOverlay onClick={onClose} />

            <div className={styles.modal}>
                <ModalHeader onClick={onClose}>
                    {header}
                </ModalHeader>

                <ModalBody>
                    {children}
                </ModalBody>
            </div>
        </div>,

        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    header: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
        PropTypes.string
    ]).isRequired,
    children: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.node,
    ]).isRequired
}

export default Modal;