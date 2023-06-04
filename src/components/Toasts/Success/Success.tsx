import { IError } from "@/app/features/interface";
import React from "react";
import { Toast } from "react-bootstrap";
import styles from "./success.module.scss";

type Props = {
  isSuccess: boolean;
  message: string;
};

const Success = ({ isSuccess, message }: Props) => {
  return (
    <Toast show={isSuccess}>
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">Successful</strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>
        <p className={styles.message}>{message}</p>
      </Toast.Body>
    </Toast>
  );
};

export default Success;
