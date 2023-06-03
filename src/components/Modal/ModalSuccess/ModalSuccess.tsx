import React from "react";
import { Modal } from "react-bootstrap";
import { FaGrinBeam } from "react-icons/fa";
import styles from "./modalSuccess.module.scss";
import { CgClose } from "react-icons/cg";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  message: string;
};

const ModalSuccess = ({ isOpen, handleClose, message }: Props) => {
  return (
    <Modal
      show={isOpen}
      dialogClassName={styles.dialogContainer}
      onHide={() => handleClose()}
      contentClassName={styles.modalContent}
    >
      <div className={styles.container}>
        <div className="d-flex align-items-center justify-content-start gap-3">
          <div className={styles.iconSuccess}>
            <FaGrinBeam className={styles.icon} />
          </div>
          <div className={styles.content}>
            <h4 className={styles.title}>Successful!</h4>
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

export default ModalSuccess;
