import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { CgClose } from "react-icons/cg";
import styles from "./formDeleteTyping.module.scss";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  onClick: () => Promise<any>;
  loading: boolean;
  title: string;
  description: string;
};

const FormDeleteTyping = ({
  isOpen,
  handleClose,
  onClick,
  loading,
  title,
  description,
}: Props) => {
  const [inputValue, setInputValue] = useState<string>("");

  return (
    <Modal
      centered
      show={isOpen}
      onHide={handleClose}
      contentClassName={styles.modalContent}
    >
      <Form
        className={styles.form}
        onSubmit={async (e) => {
          e.preventDefault();
          await onClick();
          setInputValue("");
        }}
      >
        <div className={styles.iconClose}>
          <CgClose className={styles.icon} onClick={handleClose} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>

        <div className={styles.lineDivide}></div>

        <p className={styles.script}>
          Typing text <span>delete</span> to confirm
        </p>

        <Form.Group className={styles.formGroup}>
          <Form.Control
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter text DELETE to confirm"
            className={styles.formInput}
          />
        </Form.Group>

        <div className={styles.btnList}>
          <Button
            type="button"
            className={`${styles.btnItem} ${styles.cancel}`}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className={`${styles.btnItem} ${styles.delete} ${
              inputValue !== "DELETE" ? styles.disabled : ""
            }`}
            disabled={loading || inputValue !== "DELETE"}
          >
            {loading ? (
              <ProgressSpinner className={styles.iconLoading} strokeWidth="4" />
            ) : (
              "Delete"
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default FormDeleteTyping;
