import React from "react";
import { Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import styles from "./avatarUser.module.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  avatarPath: string;
};

const AvatarUser = ({ isOpen, handleClose, avatarPath }: Props) => {
  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      fullscreen
      contentClassName={styles.modalContent}
    >
      <div className={styles.iconClose} onClick={handleClose}>
        <CgClose className={styles.icon} />
      </div>
      <img src={avatarPath} alt="" className={styles.avatar} />
    </Modal>
  );
};

export default AvatarUser;
