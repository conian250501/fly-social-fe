/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import styles from "./formComment.module.scss";
import {
  IComment,
  IError,
  IPayloadComment,
  ITweet,
} from "@/app/features/interface";
import { Button, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import {
  AiOutlineGif,
  AiOutlineLoading,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { RiEmotionHappyLine } from "react-icons/ri";
import { BsFillImageFill } from "react-icons/bs";
import { useFormik } from "formik";
import { CgClose } from "react-icons/cg";
import {
  commentTweet,
  getAllByTweet,
  updateComment,
  uploadFileComment,
} from "@/app/features/comment/commentAction";
import { getById } from "@/app/features/tweet/tweetAction";
type Props = {
  tweet: ITweet;
};

const FormComment = React.memo(({ tweet }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [videoPreview, setVideoPreview] = useState<string>("");
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [loadingComment, setLoadingComment] = useState<boolean>(false);
  const [isDisabledBtnSubmit, setIsDisabledBtnSubmit] = useState<boolean>(true);
  const [error, setError] = useState<IError | null>(null);
  const [sizeAllowVideo, setSizeAllowVideo] = useState<number>(
    10 * 1024 * 1024
  );
  const [progressPercentage, setProgressPercentage] = useState<number>(0);

  const validate = (values: IPayloadComment) => {
    const errors: { file: string; content: string } = { file: "", content: "" };
    if (!values.content && !values.file) {
      setIsDisabledBtnSubmit(true);
      return (errors.content = `Disabled`);
    } else {
      setIsDisabledBtnSubmit(false);
      return {};
    }
  };

  const form = useFormik<IPayloadComment>({
    initialValues: {
      content: "",
      tweetId: 0,
      file: null,
    },
    validate,
    async onSubmit(values, { resetForm }) {
      const formData = new FormData();
      formData.append("file", values.file as string);
      try {
        setLoadingComment(true);
        const newComment: IComment = await dispatch(
          commentTweet({
            tweetId: tweet.id,
            content: values.content,
            file: null,
          })
        ).unwrap();
        if (isFileChange) {
          await dispatch(
            uploadFileComment({ id: newComment.id, file: formData })
          ).unwrap();
        }

        await dispatch(getById(tweet.id)).unwrap();
        await dispatch(getAllByTweet(tweet.id)).unwrap();

        setLoadingComment(false);
        resetForm();
        setVideoPreview("");
        setImagePreview("");
        setIsFileChange(false);
      } catch (error) {
        setError(error as IError);
        setLoadingComment(false);
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

  const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue("content", e.target.value);
    setProgressPercentage((e.target.value.length / 100) * 100);
  };
  const handleDeleteImage = () => {
    setImagePreview("");
    form.setFieldValue("file", null);
  };
  const handleDeleteVideo = () => {
    setVideoPreview("");
    form.setFieldValue("file", null);
  };

  return (
    <Form className={styles.form} onSubmit={form.handleSubmit}>
      <p className={styles.textReplyFor}>
        Replying to<span> @{tweet.user.name}</span>
      </p>
      <div className="w-100">
        <div className="d-flex align-items-start justify-content-start gap-3">
          <div className={styles.avatar}>
            <img
              src={
                user?.avatar ? user.avatar : "/images/avatar-placeholder.png"
              }
              alt=""
              className={styles.image}
            />
          </div>
          <div className={styles.formRight}>
            <Form.Group className={`${styles.formGroup} position-relative`}>
              <Form.Control
                as="textarea"
                type="text"
                placeholder="Tweet your reply"
                value={form.values.content}
                onChange={handleChangeContent}
                className={styles.formInput}
                maxLength={100}
              />
              <div className="d-flex align-items-center justify-content-end w-100 mt-4">
                <div
                  className={styles.progressLimitContent}
                  style={{
                    backgroundImage: `conic-gradient(#3f9cf0 ${progressPercentage}%, lightgray 0)`,
                  }}
                >
                  <div className={styles.circle}></div>
                </div>
              </div>
            </Form.Group>
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
                <video
                  controls
                  src={videoPreview}
                  className={styles.filePreview}
                />
              </div>
            )}
            {form.errors.file && (
              <p className={styles.textErrorValidate}>{form.errors.file}</p>
            )}
            <div className="d-flex align-items-center justify-content-between mt-3 w-100">
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
                    onChange={handleChangeImage}
                  />
                </div>
                <div className={styles.inputFileItem}>
                  <Form.Label
                    htmlFor="input-video"
                    className={styles.labelInputFile}
                  >
                    <AiOutlineVideoCamera className={styles.icon} />
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="input-video"
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
              <Button
                type="submit"
                className={styles.btnSubmit}
                disabled={isDisabledBtnSubmit || loadingComment}
              >
                {loadingComment ? (
                  <AiOutlineLoading className={styles.iconLoading} />
                ) : (
                  "Reply"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
});

export default FormComment;
