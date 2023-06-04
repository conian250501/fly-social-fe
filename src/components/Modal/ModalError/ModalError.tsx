import React from "react";
import styles from "./modalError.module.scss";
import { Modal } from "react-bootstrap";
import { SiFacepunch } from "react-icons/si";
import { CgClose } from "react-icons/cg";
type Props = { isOpen: boolean; handleClose: () => void; message: string };

const ModalError = ({ isOpen, handleClose, message }: Props) => {
  return (
    <Modal
      show={isOpen}
      dialogClassName={styles.dialogContainer}
      onHide={() => handleClose()}
      contentClassName={styles.modalContent}
    >
      <div className={styles.container}>
        <div className="d-flex align-items-center justify-content-start gap-3">
          <div className={styles.iconError}>
            <SiFacepunch className={styles.icon} />
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>Oh no! Has a error</h4>
            <p className={styles.description}>{message}</p>
          </div>
        </div>
        <div className={styles.iconClose} onClick={() => handleClose()}>
          <CgClose className={styles.icon} />
        </div>
      </div>
    </Modal>
  );
};

export default ModalError;
