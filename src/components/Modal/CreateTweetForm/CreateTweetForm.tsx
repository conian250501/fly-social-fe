/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import { IError, IPayloadTweet } from "@/app/features/interface";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  AiOutlineGif,
  AiOutlineLoading,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { FaAngleDown, FaUserSecret } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { RiEmotionHappyLine } from "react-icons/ri";
import styles from "./createTweetForm.module.scss";
import {
  create as createTweet,
  uploadFile,
} from "@/app/features/tweet/tweetAction";
import { setError } from "@/app/features/tweet/tweetSlice";
import ModalSuccess from "../ModalSuccess/ModalSuccess";
type Props = {
  show: boolean;
  handleClose: () => void;
};

const CreateTweetForm = React.memo(({ show, handleClose }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);

  const [showAudienceList, setShowAudienceList] = useState<boolean>(false);
  const [filePreview, setFilePreview] = useState<string>("");
  const [loadingCreateTweet, setLoadingCreateTweet] = useState<boolean>(false);
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [payload, setPayload] = useState<IPayloadTweet>({
    content: "",
    file: null,
    isPrivate: false,
  });
  const [isCreateSuccess, setIsCreateSuccess] = useState<boolean>(false);

  useEffect(() => {
    const handleCloseAudienceList = () => {
      setShowAudienceList(false);
    };
    window.addEventListener("click", handleCloseAudienceList);

    return () => {
      window.removeEventListener("click", handleCloseAudienceList);
    };
  }, []);

  const validate = (values: IPayloadTweet) => {
    const errors: { content: string; file: string } = {
      content: "",
      file: "",
    };
    if (!errors.content && !errors.file) {
      return {};
    }

    return errors;
  };

  const form = useFormik({
    initialValues: payload,
    validate,
    async onSubmit(values, { resetForm }) {
      const formData = new FormData();
      formData.append("file", values.file as string);
      try {
        setLoadingCreateTweet(true);
        const newTweet = await dispatch(createTweet(values)).unwrap();
        if (isFileChange) {
          await dispatch(
            uploadFile({ id: newTweet.id, file: formData })
          ).unwrap();
        }
        setLoadingCreateTweet(false);
        resetForm();
        setIsFileChange(false);
        setFilePreview("");
        setIsCreateSuccess(true);
        handleClose();
      } catch (error) {
        setLoadingCreateTweet(false);

        dispatch(setError(error as IError));
      }
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsFileChange(true);
    setFilePreview(URL.createObjectURL(files[0]));
    form.setFieldValue("file", files[0]);
  };
  const handleDeleteFile = () => {
    setFilePreview("");
    form.setFieldValue("file", null);
  };

  if (isCreateSuccess) {
    return (
      <ModalSuccess
        isOpen={isCreateSuccess}
        handleClose={() => setIsCreateSuccess(false)}
        message="Created new tweet successfully"
      />
    );
  }
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className={styles.modalContainer}
      contentClassName={styles.contentModal}
    >
      <div className={styles.iconCloseWrapper}>
        <div className={styles.iconClose} onClick={handleClose}>
          <CgClose className={styles.icon} />
        </div>
      </div>
      <Form className={styles.form} onSubmit={form.handleSubmit}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>
            <img
              src={
                user?.avatar ? user.avatar : "/images/avatar-placeholer-man.png"
              }
              alt=""
            />
          </div>
          <div
            className={styles.audiencePlaceholder}
            onClick={(e) => {
              e.stopPropagation();
              setShowAudienceList(!showAudienceList);
            }}
          >
            {form.values.isPrivate ? "Only you" : "Everyone"}
            <FaAngleDown className={styles.icon} />
            {showAudienceList && (
              <ul className={styles.audienceList}>
                <h6 className={styles.title}>Choose audience</h6>
                <li
                  className={`${styles.audienceItem} ${
                    !form.values.isPrivate ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    form.setFieldValue("isPrivate", false);
                  }}
                >
                  <div className={styles.audienceIcon}>
                    <GiWorld className={styles.icon} />
                  </div>
                  <span>Everyone</span>
                </li>
                <li
                  className={`${styles.audienceItem} ${
                    form.values.isPrivate ? styles.active : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    form.setFieldValue("isPrivate", true);
                  }}
                >
                  <div className={styles.audienceIcon}>
                    <FaUserSecret className={styles.icon} />
                  </div>
                  <span>Only you</span>
                </li>
              </ul>
            )}
          </div>
        </div>
        <Form.Group className={styles.formGroup}>
          <Form.Control
            as="textarea"
            placeholder="What is happening?"
            className={styles.formInput}
            value={form.values.content}
            name="content"
            onChange={form.handleChange}
          />
          {filePreview && (
            <div className="position-relative">
              <div className={styles.deleteFile} onClick={handleDeleteFile}>
                <CgClose className={styles.icon} />
              </div>
              <img src={filePreview} alt="" className={styles.filePreview} />
            </div>
          )}
        </Form.Group>
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center gap-4">
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
          </div>
          <Button
            type="submit"
            className={styles.btnSubmit}
            disabled={loadingCreateTweet}
          >
            {loadingCreateTweet ? (
              <AiOutlineLoading className={styles.iconLoading} />
            ) : (
              "Tweet"
            )}
          </Button>
        </div>
      </Form>
    </Modal>
  );
});

export default CreateTweetForm;
