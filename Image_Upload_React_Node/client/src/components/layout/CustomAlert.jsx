import React, { useEffect } from "react";
import styles from "./CustomAlert.module.css";

function CustomAlert(props) {
  const { type, message, onClose, index } = props;

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 10000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      style={{ zIndex: index }}
      className={`${styles.alert} ${styles[type]} ${styles.fadeIn}`}
    >
      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        &times;
      </button>
    </div>
  );
}

export default CustomAlert;
