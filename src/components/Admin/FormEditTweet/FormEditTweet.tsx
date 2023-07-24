/* eslint-disable react/display-name */
import NoneData from "@/components/shared/NoneData";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { IoImage } from "react-icons/io5";
import styles from "./formEditTweet.module.scss";
import {
  updateTweet,
  uploadFileTweet,
} from "@/features/admin/tweet/tweetAction";
import ModalSuccess from "@/components/Modal/ModalSuccess/ModalSuccess";

type Props = {};

const FormEditTweet = React.memo(({}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { tweet } = useAppSelector((state: RootState) => state.adminTweet);

  const [filePreview, setFilePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [editSuccess, setEditSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (tweet) {
      setFilePreview(tweet.image);
    }
  }, [tweet]);

  const form = useFormik<{ content: string; image: string | null | File }>({
    initialValues: {
      content: tweet?.content || "",
      image: tweet?.image || null,
    },
    async onSubmit(values, formikHelpers) {
      const formData = new FormData();
      formData.append("file", values.image as string);
      try {
        setLoading(true);
        await dispatch(
          updateTweet({ id: Number(tweet?.id), payload: values })
        ).unwrap();

        if (isFileChange) {
          await dispatch(
            uploadFileTweet({ id: Number(tweet?.id), file: formData })
          );
        }

        setEditSuccess(true);
        setIsFileChange(false);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log({ error });
      }
    },
  });

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFilePreview(URL.createObjectURL(files[0]));
    setIsFileChange(true);
    form.setFieldValue("image", files[0]);
  };

  if (!tweet) {
    return (
      <NoneData
        title="Tweet doesn't exist"
        customClassNameTitle={styles.noneDataTitle}
      />
    );
  }

  return (
    <Form className={styles.form} onSubmit={form.handleSubmit}>
      <Form.Group className={styles.formFilePreview}>
        {filePreview ? (
          <div className={styles.filePreview}>
            <img src={filePreview} alt="" />
          </div>
        ) : (
          <div className={styles.filePreviewPlaceholder}>None File</div>
        )}

        <Form.Label htmlFor="input-tweet-file" className={styles.fileLabel}>
          <IoImage className={styles.icon} />
          Upload new file
        </Form.Label>
        <Form.Control
          type="file"
          id="input-tweet-file"
          hidden
          onChange={handleChangeFile}
          accept="image/*"
        />
      </Form.Group>

      <Form.Group className={styles.formGroup}>
        <Form.Control
          as="textarea"
          placeholder="Enter text DELETE to confirm"
          className={styles.formInput}
          value={form.values.content}
          name="content"
          onChange={form.handleChange}
        />
      </Form.Group>

      <div className={styles.btnList}>
        <Button
          type="button"
          className={`${styles.btnItem} ${styles.cancel}`}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={`${styles.btnItem} ${styles.save}`}
          disabled={loading}
        >
          {loading ? (
            <ProgressSpinner className={styles.iconLoading} strokeWidth="4" />
          ) : (
            "Save"
          )}
        </Button>
      </div>

      <ModalSuccess
        isOpen={editSuccess}
        handleClose={() => setEditSuccess(false)}
        message="Edit tweet successfully"
      />
    </Form>
  );
});

export default FormEditTweet;
