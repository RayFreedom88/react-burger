import React, { useEffect, useCallback, FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { IModalHeader } from '../../services/types/components';
import styles from './modal.module.css';

const ModalHeader: FC<IModalHeader> = ({ children, onClick }) => {

    return (
        <div className={styles.modal__header}>
            <p className={'text text_type_main-large'}>
                {children}
            </p>

            <CloseIcon onClick={onClick} type='primary' />
        </div>
    )
};

const ModalBody: FC = ({ children }) => {

    return (
        <div className={styles.modal__body}>
            {children}
        </div>
    )
};

interface IPropsModal {
    header: string;
    onClose: () => void;
};

const Modal: FC<IPropsModal> = ({ header, children, onClose }) => {
    const modalRoot = document.getElementById('modal-root') as HTMLElement;

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
};

export default Modal;