/* eslint-disable react/display-name */
/* eslint-disable @next/next/no-img-element */
import {
  getAllByTweet,
  updateComment,
  uploadFileComment,
} from "@/features/comment/commentAction";
import { IComment, IError, IPayloadComment } from "@/features/interface";
import { getById } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import ModalError from "@/components/Modal/ModalError";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { useFormik } from "formik";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import {
  AiOutlineGif,
  AiOutlineLoading,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { RiEmotionHappyLine } from "react-icons/ri";
import styles from "./formEditComment.module.scss";

type Props = {
  open: boolean;
  comment: IComment;
  handleClose: () => void;
};

const FormEditComment = React.memo(({ open, comment, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [error, setError] = useState<IError | null>(null);
  const [sizeAllowVideo, setSizeAllowVideo] = useState<number>(
    10 * 1024 * 1024
  );
  useEffect(() => {
    if (comment.image) {
      setImagePreview(comment.image);
    }
    if (comment.video) {
      setVideoPreview(comment.video);
    }
  }, [comment.image, comment.video]);

  const form = useFormik<IPayloadComment>({
    initialValues: {
      content: comment.content,
    },
    async onSubmit(values, { resetForm }) {
      const formData = new FormData();
      formData.append("file", values.file as string);
      try {
        setLoadingSave(true);
        await dispatch(
          updateComment({ id: comment.id, payload: values })
        ).unwrap();

        if (isFileChange) {
          await dispatch(
            uploadFileComment({ id: comment.id, file: formData })
          ).unwrap();
        }

        await dispatch(getAllByTweet(comment.tweet.id)).unwrap();

        setLoadingSave(false);
        setSaveSuccess(true);
        handleClose();
        resetForm();
      } catch (error) {
        handleClose();
        setError(error as IError);
        setLoadingSave(false);
      }
    },
  });

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setIsFileChange(true);
    setImagePreview(URL.createObjectURL(files[0]));
    setVideoPreview("");
    form.setFieldValue("file", files[0]);
  };

  const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (files[0].size > sizeAllowVideo) {
      form.setFieldError("file", `The video size must be until 10mb`);
      return;
    }
    setIsFileChange(true);
    setVideoPreview(URL.createObjectURL(files[0]));
    setImagePreview("");
    form.setFieldValue("file", files[0]);
  };

  const handleDeleteImage = () => {
    setImagePreview("");
    form.setFieldValue("file", null);
  };
  const handleDeleteVideo = () => {
    setVideoPreview("");
    form.setFieldValue("file", null);
  };

  if (saveSuccess) {
    return (
      <ModalSuccess
        isOpen={saveSuccess}
        handleClose={() => setSaveSuccess(false)}
        message="Updated tweet successfully"
      />
    );
  }

  if (error) {
    return (
      <ModalError
        isOpen={Boolean(error)}
        handleClose={() => setError(null)}
        message={error.message}
      />
    );
  }

  return (
    <Modal
      centered
      show={open}
      onHide={handleClose}
      contentClassName={styles.contentModal}
    >
      <Form className={styles.form} onSubmit={form.handleSubmit}>
        <div className={styles.iconCloseWrapper}>
          <div className={styles.iconClose} onClick={handleClose}>
            <CgClose className={styles.icon} />
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-between mt-5">
          <div className={styles.userInfo}>
            <img
              src={
                comment.user?.avatar
                  ? comment.user.avatar
                  : "/images/avatar-placeholder.png"
              }
              alt=""
              className={styles.avatar}
            />
            <div className={styles.info}>
              <h6 className={styles.name}>{comment.user.name}</h6>
              <p className={styles.date}>
                {moment(comment.createdAt).fromNow()}
              </p>
            </div>
          </div>
        </div>
        <Form.Control
          as="textarea"
          value={form.values.content}
          onChange={form.handleChange}
          name="content"
          placeholder="Enter a comment"
          className={styles.formInput}
        />
        {imagePreview && (
          <div className="position-relative">
            <div className={styles.deleteFile} onClick={handleDeleteImage}>
              <CgClose className={styles.icon} />
            </div>
            <img src={imagePreview} alt="" className={styles.filePreview} />
          </div>
        )}
        {videoPreview && (
          <div className="position-relative">
            <div className={styles.deleteFile} onClick={handleDeleteVideo}>
              <CgClose className={styles.icon} />
            </div>
            <video controls src={videoPreview} className={styles.filePreview} />
          </div>
        )}

        <Form.Group className={styles.labelInputFileList}>
          <div className={styles.inputFileItem}>
            <Form.Label
              className={styles.labelInputFile}
              htmlFor="comment-input-file"
            >
              <BsFillImageFill className={styles.icon} />
            </Form.Label>
            <Form.Control
              type="file"
              id="comment-input-file"
              accept="image/*"
              hidden
              onChange={handleChangeImage}
            />
          </div>
          <div className={styles.inputFileItem}>
            <Form.Label
              htmlFor="form-edit-input-video"
              className={styles.labelInputFile}
            >
              <AiOutlineVideoCamera className={styles.icon} />
            </Form.Label>
            <Form.Control
              type="file"
              id="form-edit-input-video"
              accept="video/*"
              hidden
              onChange={handleChangeVideo}
            />
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
        <Button type="submit" className={styles.btnSave} disabled={loadingSave}>
          {loadingSave ? (
            <AiOutlineLoading className={styles.iconLoading} />
          ) : (
            "Save"
          )}
        </Button>
      </Form>
    </Modal>
  );
});

export default FormEditComment;
