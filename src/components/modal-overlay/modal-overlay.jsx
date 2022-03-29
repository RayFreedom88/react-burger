import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css';

export default function ModalOverlay (props) {
  return (
    <div className={`${styles._overlay}`} onClick={props.onClick}></div>
  )
}

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
}