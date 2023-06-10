/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import styles from "./actionModal.module.scss";
import { AiOutlineLoading } from "react-icons/ai";

interface Props {
  title: string;
  confirmText: string;
  imagePath: string;
  show: boolean;
  buttonText: string;
  setTextRequest?: (value: string) => void;
  isShowFormRequest?: boolean;
  close: () => void;
  action: () => void;
  loadingAction: boolean;
  setLoadingAction: React.Dispatch<React.SetStateAction<boolean>>;
}
const ActionModal = React.memo(function ActionModal({
  close,
  show,
  action,
  buttonText,
  imagePath,
  title,
  confirmText,
  isShowFormRequest,
  setTextRequest,
  loadingAction,
  setLoadingAction,
}: Props) {
  return (
    <Modal
      className={styles.containerModal}
      show={show}
      onHide={close}
      centered
      contentClassName={styles.contentModal}
    >
      <div className={styles.wrapperContent}>
        <div onClick={close} className={styles.iconClose}>
          <img src="/icons/close-circle.svg" alt="Close" />
        </div>
        <div className="mb-2 d-flex justify-content-center">
          <img src={imagePath} alt="banner" />
        </div>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.confirmText}>{confirmText}</p>

        {isShowFormRequest && setTextRequest && (
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                onChange={(e) => setTextRequest(e.target.value)}
                as="textarea"
                rows={5}
                required
                placeholder="Enter your request"
              />
            </Form.Group>
          </Form>
        )}

        <div className={styles.btnList}>
          <Button className={`${styles.btn} ${styles.cancel}`} onClick={close}>
            Cancel
          </Button>
          <Button
            className={`${styles.btn} ${styles.action}`}
            onClick={action}
            disabled={loadingAction}
          >
            {loadingAction ? (
              <AiOutlineLoading className={styles.iconLoading} />
            ) : (
              <>{buttonText}</>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
});
export default ActionModal;
