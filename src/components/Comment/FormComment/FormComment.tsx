/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import styles from "./formComment.module.scss";
import { ITweet } from "@/app/features/interface";
import { Button, Form } from "react-bootstrap";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { AiOutlineGif, AiOutlineVideoCamera } from "react-icons/ai";
import { RiEmotionHappyLine } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import { useFormik } from "formik";
type Props = {
  tweet: ITweet;
};

const FormComment = React.memo(({ tweet }: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [filePreview, setFilePreview] = useState<string>("");
  const [isFileChange, setIsFileChange] = useState<boolean>(false);

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsFileChange(true);
    setFilePreview(URL.createObjectURL(files[0]));
    form.setFieldValue("file", files[0]);
  };

  const form = useFormik({
    initialValues: {
      content: "",
      file: "",
    },
    onSubmit(values, formikHelpers) {
      try {
        console.log({ values });
      } catch (error) {}
    },
  });
  return (
    <Form className={styles.form}>
      <p className={styles.textReplyFor}>
        Replying to<span> @{tweet.user.name}</span>
      </p>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-start justify-content-start">
          <div className={styles.avatar}>
            <img
              src={
                user?.avatar ? user.avatar : "/images/avatar-placeholder.png"
              }
              alt=""
              className={styles.image}
            />
          </div>
          <div>
            <Form.Group className={styles.formGroup}>
              <Form.Control
                type="text"
                placeholder="Tweet your reply"
                className={styles.formInput}
              />
            </Form.Group>
            {filePreview && (
              <img src={filePreview} alt="" className={styles.filePreview} />
            )}
            <div className="d-flex align-items-center justify-content-between mt-3">
              <Form.Group className={styles.labelInputFileList}>
                <div className={styles.inputFileItem}>
                  <Form.Label
                    className={styles.labelInputFile}
                    htmlFor="input-file"
                  >
                    <BsFillImageFill className={styles.icon} />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="input-file"
                    accept="image/*"
                    hidden
                    onChange={handleChangeFile}
                  />
                </div>
                <div className={styles.inputFileItem}>
                  <Form.Label className={styles.labelInputFile}>
                    <AiOutlineVideoCamera className={styles.icon} />
                  </Form.Label>
                </div>
                <div className={styles.inputFileItem}>
                  <Form.Label className={styles.labelInputFile}>
                    <AiOutlineGif className={styles.icon} />
                  </Form.Label>
                </div>
                <div className={styles.inputFileItem}>
                  <Form.Label className={styles.labelInputFile}>
                    <RiEmotionHappyLine className={styles.icon} />
                  </Form.Label>
                </div>
              </Form.Group>
              <Button type="submit" className={styles.btnSubmit}>
                Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
});

export default FormComment;
