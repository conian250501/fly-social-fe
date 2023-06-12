/* eslint-disable @next/next/no-img-element */
import { IError, IPayloadTweet, ITweet } from "@/app/features/interface";
import {
  getById,
  update as updateTweet,
} from "@/app/features/tweet/tweetAction";
import { useAppDispatch } from "@/app/redux/hooks";
import ModalError from "@/components/Modal/ModalError";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { useFormik } from "formik";
import moment from "moment";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AiOutlineLoading } from "react-icons/ai";
import { CgClose } from "react-icons/cg";
import { FaAngleDown, FaUserSecret } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import styles from "./formEditTweet.module.scss";

type Props = {
  open: boolean;
  tweet: ITweet;
  handleClose: () => void;
};

const FormEditTweet = ({ open, tweet, handleClose }: Props) => {
  const dispatch = useAppDispatch();
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [showAudienceList, setShowAudienceList] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  const form = useFormik({
    initialValues: {
      content: tweet.content,
      isPrivate: tweet.isPrivate,
    },
    async onSubmit(values, formikHelpers) {
      try {
        setLoadingSave(true);
        await dispatch(
          updateTweet({ id: tweet.id, payload: values as IPayloadTweet })
        ).unwrap();

        await dispatch(getById(tweet.id)).unwrap();

        setLoadingSave(false);
        setSaveSuccess(true);
        handleClose();
      } catch (error) {
        handleClose();
        setError(error as IError);
        setLoadingSave(false);
      }
    },
  });

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
                tweet.user?.avatar
                  ? tweet.user.avatar
                  : "/images/avatar-placeholder.png"
              }
              alt=""
              className={styles.avatar}
            />
            <div className={styles.info}>
              <h6 className={styles.name}>{tweet.user.name}</h6>
              <p className={styles.date}>{moment(tweet.createdAt).fromNow()}</p>
            </div>
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
                    setShowAudienceList(false);
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
                    setShowAudienceList(false);
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
        <Form.Control
          as="textarea"
          value={form.values.content}
          onChange={form.handleChange}
          name="content"
          placeholder="Enter content for your tweet"
          className={styles.formInput}
        />
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
};

export default FormEditTweet;
