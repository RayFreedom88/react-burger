import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from './modalOverlay';
import styles from './modal.module.css';

function ModalHeader({ children, onClick }) {
    return (
        <div className={styles.modal_header}>
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
        <div className={styles.modal_body}>
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

function Modal({ isOpen, header, children, onClose }) {

    const handleEscKeyPress = (e) => {
        e.preventDefault()
    
        if (e.key === 'Escape') {
            onClose();
        }
    }

    useEffect(() => {
        if (isOpen) document.getElementById('modal').focus();
    }, [isOpen])

    return createPortal(
        ( 
            <> 
                {isOpen && 
                    <div 
                        id='modal'
                        tabIndex="0"
                        onKeyDown={handleEscKeyPress}         
                    > 
                        <ModalOverlay onClick={onClose} />

                        <div className={styles.modal}>
                            <ModalHeader onClick={onClose}>
                                {header}
                            </ModalHeader>

                            <ModalBody>
                                {children}
                            </ModalBody>
                        </div>
                    </div>
                }
            </>
        ), 
        document.getElementById("modal-root")
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