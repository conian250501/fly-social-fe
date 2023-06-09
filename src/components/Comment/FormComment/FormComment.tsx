/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React from "react";
import styles from "./formComment.module.scss";
import { ITweet } from "@/app/features/interface";
import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
type Props = {
  tweet: ITweet;
};

const FormComment = React.memo(({ tweet }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  return (
    <Form className={styles.form}>
      <p className={styles.textReplyFor}>
        Replying to<span> @{tweet.user.name}</span>
      </p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center justify-content-start">
          <div className={styles.avatar}>
            <img
              src={
                user?.avatar ? user.avatar : "/images/avatar-placeholder.png"
              }
              alt=""
              className={styles.image}
            />
          </div>
          <Form.Group className={styles.formGroup}>
            <Form.Control
              type="text"
              placeholder="Tweet your reply"
              className={styles.formInput}
            />
          </Form.Group>
        </div>
        <Button type="submit" className={styles.btnSubmit}>
          Reply
        </Button>
      </div>
    </Form>
  );
});

export default FormComment;
