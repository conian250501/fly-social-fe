"use client";
import React from "react";
import { Modal } from "react-bootstrap";

type Props = {};

const LoginModal = (props: Props) => {
  return (
    <Modal show={true} centered>
      <div>Login</div>
    </Modal>
  );
};

export default LoginModal;
