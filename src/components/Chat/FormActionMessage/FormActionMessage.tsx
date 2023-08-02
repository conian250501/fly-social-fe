import React, { useState } from "react";
import styles from "./formActionMessage.module.scss";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { IPayloadMessage } from "@/features/interface";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Line } from "react-icons/ri";
import { useAppDispatch } from "@/redux/hooks";
import { createMessage } from "@/features/message/messageAction";
import { socket } from "@/shared/socket";
type Props = {
  conversationId: number;
  type: "Edit" | "New";
};

const FormActionMessage = ({ conversationId, type }: Props) => {
  const dispatch = useAppDispatch();
  const [loadingNewMessage, setLoadingNewMessage] = useState<boolean>(false);

  const validate = (values: IPayloadMessage) => {
    const errors: IPayloadMessage = { content: "", conversationId: 0 };
    if (!values.content) {
      errors.content = `Message is required`;
    }

    if (!errors.content) {
      return {};
    }
    return errors;
  };
  const form = useFormik<IPayloadMessage>({
    initialValues: {
      content: "",
      conversationId: conversationId,
    },
    validate,
    async onSubmit(values, { resetForm }) {
      try {
        const newMessage = await dispatch(createMessage(values)).unwrap();
        socket.emit("newMessage", newMessage);
        resetForm();
      } catch (error) {
        console.error("Error", error);
      }
    },
  });

  return (
    <Form className={styles.form} onSubmit={form.handleSubmit}>
      <div className="d-flex align-items-center justify-content-start gap-3">
        <div className={styles.fileInputList}>
          <div className={styles.fileInputItem}>
            <Form.Label
              htmlFor="input-mess-image"
              className={styles.labelFileImage}
            >
              <IoImageOutline className={styles.icon} />
            </Form.Label>
            <Form.Control type="file" id="input-mess-image" hidden />
          </div>
        </div>

        <Form.Control
          name="content"
          value={form.values.content}
          onChange={form.handleChange}
          placeholder="Start a new message"
          className={styles.formInput}
        />
      </div>

      <button
        type="submit"
        disabled={loadingNewMessage}
        className={styles.buttonSend}
      >
        <RiSendPlane2Line className={styles.icon} />
      </button>
    </Form>
  );
};

export default FormActionMessage;
