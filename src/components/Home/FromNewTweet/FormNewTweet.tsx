import AudienceFormTweet from "@/components/AudienceFormTweet";
import ModalError from "@/components/Modal/ModalError";
import { PATHS } from "@/contanst/paths";
import { IError, IPayloadTweet, ITweet } from "@/features/interface";
import {
  create as createTweet,
  uploadFile,
} from "@/features/tweet/tweetAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import {
  AiOutlineGif,
  AiOutlineLoading,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { BsFillImageFill } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import { RiEmotionHappyLine } from "react-icons/ri";
import styles from "./formNewTweet.module.scss";
type Props = {};

const FormNewTweet = (props: Props) => {
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
  const [error, setError] = useState<IError | null>(null);
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [newTweet, setNewTweet] = useState<ITweet | null>(null);
  const [limitLengthContent, setLimitLengthContent] = useState<number>(100);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isCreateSuccess) {
        setIsCreateSuccess(false);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [isCreateSuccess]);

  const validate = (values: IPayloadTweet) => {
    const errors: { content: string; file: string } = {
      content: "",
      file: "",
    };

    if (!values.content && !values.file) {
      return (errors.content = `Required content or file`);
    }
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
        const _newTweet = await dispatch(createTweet(values)).unwrap();
        if (isFileChange) {
          await dispatch(
            uploadFile({ id: _newTweet.id, file: formData })
          ).unwrap();
        }

        setNewTweet(_newTweet);
        setLoadingCreateTweet(false);
        resetForm();
        setIsFileChange(false);
        setFilePreview("");
        setIsCreateSuccess(true);
      } catch (error) {
        setLoadingCreateTweet(false);
        setError(error as IError);
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

  const handleChangeAudience = (isPrivate: boolean) => {
    form.setFieldValue("isPrivate", isPrivate);
    setShowAudienceList(false);
  };

  return (
    <Form
      className={`${styles.form} ${
        !user ? "d-none" : "d-xs-none d-sm-none d-md-flex"
      } `}
      onSubmit={form.handleSubmit}
    >
      <div className={styles.avatarCurrentUser}>
        <img
          src={user?.avatar ? user.avatar : "/images/avatar-placeholder.png"}
          alt=""
        />
      </div>
      <div className={styles.formGroupWrapper}>
        <div className={styles.audienceWrapper}>
          <AudienceFormTweet
            data={form.values}
            showAudienceList={showAudienceList}
            setShowAudienceList={setShowAudienceList}
            handleChangeAudience={handleChangeAudience}
          />
        </div>
        <Form.Group className={styles.formInputGroup}>
          <Form.Control
            as="textarea"
            value={form.values.content}
            name="content"
            onChange={form.handleChange}
            placeholder="What is happening?!"
            className={styles.formInput}
            maxLength={100}
          />
          <p className={styles.textLimit}>
            {form.values.content.length}/{limitLengthContent}
          </p>
        </Form.Group>

        {filePreview && (
          <div className="position-relative">
            <div className={styles.deleteFile} onClick={handleDeleteFile}>
              <CgClose className={styles.icon} />
            </div>
            <img src={filePreview} alt="" className={styles.filePreview} />
          </div>
        )}
        <div className={styles.fileWrapper}>
          <div className="d-flex align-items-center justify-content-center gap-4">
            <div className={styles.inputFileItem}>
              <Form.Label
                className={styles.labelInputFile}
                htmlFor="input-image-tweet"
              >
                <BsFillImageFill className={styles.icon} />
              </Form.Label>
              <Form.Control
                type="file"
                id="input-image-tweet"
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
      </div>

      {isCreateSuccess && (
        <div className={styles.toastCreateSuccess}>
          <p className={styles.text}>Your tweet was sent</p>
          <Link href={`${PATHS.Tweets}/${newTweet?.id}`}>View</Link>
        </div>
      )}

      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </Form>
  );
};

export default FormNewTweet;
