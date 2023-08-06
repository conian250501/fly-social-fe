import React, { useState } from "react";
import styles from "./formActionMessage.module.scss";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { IPayloadMessage } from "@/features/interface";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlane2Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { createMessage } from "@/features/message/messageAction";
import { socket } from "@/shared/socket";
import { AiOutlineLoading } from "react-icons/ai";
import { RootState } from "@/redux/store";
type Props = {
  conversationId: number;
  type: "Edit" | "New";
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMessageActive: React.Dispatch<React.SetStateAction<number>>;
};

const FormActionMessage = ({
  conversationId,
  type,
  loading,
  setLoading,
  setMessageActive,
}: Props) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  // const [loadingNewMessage, setLoadingNewMessage] = useState<boolean>(false);

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
        setLoading(true);
        socket.emit("newMessage", {
          ...values,
          authorId: Number(currentUser?.id),
          conversationId: conversationId,
        });
        const newMessage = await dispatch(createMessage(values)).unwrap();
        setMessageActive(newMessage.id);
        setLoading(false);

        resetForm();
      } catch (error) {
        setLoading(false);
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

      <button type="submit" disabled={loading} className={styles.buttonSend}>
        {/* {loadingNewMessage ? (
          <AiOutlineLoading className={styles.iconLoading} />
        ) : ( */}
        <RiSendPlane2Line className={styles.icon} />
        {/* )} */}
      </button>
    </Form>
  );
};

export default FormActionMessage;
