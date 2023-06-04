import { IError } from "@/app/features/interface/IError";
import React, { useEffect, useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import styles from "./error.module.scss";
import { useAppDispatch } from "@/app/redux/hooks";

type Props = {
  error: IError;
  onClose: () => void;
};

const ToastError = ({ error, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (error) {
      setIsError(true);
    }
  }, [error]);
  return (
    <ToastContainer className={styles.toastError}>
      <Toast
        show={isError}
        onClose={onClose}
        animation={true}
        bg={"danger"}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Oh no!!</strong>
          <small>11 mins ago</small>
        </Toast.Header>
        <Toast.Body>
          <p className={styles.message}>{error.message}</p>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastError;
