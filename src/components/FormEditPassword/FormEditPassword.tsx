import { PATHS } from "@/contanst/paths";
import { IError, IPayloadUpdatePassword } from "@/features/interface";
import { updatePassword } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { FormikState, useFormik } from "formik";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import { Form } from "react-bootstrap";
import { AiOutlineLoading } from "react-icons/ai";
import { ETypeInputPassword } from "../interfaces";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import styles from "./formEditPassword.module.scss";
type Props = {};

const FormEditPassword = (props: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.auth);

  const [error, setError] = useState<IError | null>(null);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [disableBtnSave, setDisableBtnSave] = useState<boolean>(true);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);

  const validate = (values: IPayloadUpdatePassword) => {
    const errors: IPayloadUpdatePassword = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (
      values.newPassword &&
      values.currentPassword &&
      values.confirmPassword
    ) {
      setDisableBtnSave(false);
    } else {
      setDisableBtnSave(true);
    }

    if (values.newPassword !== values.confirmPassword) {
      errors.newPassword = `Password don't match`;
    }

    if (
      !errors.currentPassword &&
      !errors.newPassword &&
      !errors.confirmPassword
    ) {
      return {};
    }

    return errors;
  };

  const handleSubmit = useCallback(
    async (
      values: IPayloadUpdatePassword,
      resetForm: (
        nextState?: Partial<FormikState<IPayloadUpdatePassword>> | undefined
      ) => void
    ) => {
      try {
        setLoadingSave(true);
        await dispatch(
          updatePassword({ userId: Number(user?.id), payload: values })
        ).unwrap();
        setUpdateSuccess(true);
        resetForm();
        setLoadingSave(false);
        setError(null);
      } catch (error) {
        setLoadingSave(false);
        setError(error as IError);
      }
    },
    []
  );

  const form = useFormik<IPayloadUpdatePassword>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate,
    async onSubmit(values, { resetForm }) {
      handleSubmit(values, resetForm);
    },
  });
  return (
    <Form className={styles.form} onSubmit={form.handleSubmit}>
      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Current password</Form.Label>
        <Form.Control
          name="currentPassword"
          value={form.values.currentPassword}
          onChange={form.handleChange}
          className={`${styles.formInput} ${
            error?.message.includes("Password incorrect") ? styles.error : ""
          }`}
          placeholder="New password"
        />
        {error?.message.includes("Password incorrect") && (
          <p className={styles.textErrorValidate}>{error.message}</p>
        )}
        <Link href={PATHS.ForgotPassword} className={styles.linkForgotPwd}>
          Forgot password?
        </Link>
      </Form.Group>
      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>New password</Form.Label>
        <Form.Control
          name="newPassword"
          value={form.values.newPassword}
          onChange={form.handleChange}
          className={`${styles.formInput} }`}
          placeholder="New password"
        />
      </Form.Group>

      <Form.Group className={styles.formGroup}>
        <Form.Label className={styles.formLabel}>Confirm password</Form.Label>
        <Form.Control
          name="confirmPassword"
          value={form.values.confirmPassword}
          onChange={form.handleChange}
          className={`${styles.formInput} ${
            form.errors.newPassword ? styles.error : ""
          }`}
          placeholder="Confirm new password"
        />
        {form.errors.newPassword && (
          <p className={styles.textErrorValidate}>{form.errors.newPassword}</p>
        )}
      </Form.Group>

      <div className="d-flex align-items-center justify-content-end">
        <button
          type="submit"
          className={`${styles.btnSave} ${
            loadingSave || disableBtnSave ? styles.disabled : ""
          } `}
          disabled={loadingSave || disableBtnSave}
        >
          {loadingSave ? (
            <AiOutlineLoading className={styles.iconLoading} />
          ) : (
            "Save"
          )}
        </button>
      </div>

      <ModalSuccess
        isOpen={updateSuccess}
        handleClose={() => setUpdateSuccess(false)}
        message="Your password updated successfully"
      />
    </Form>
  );
};

export default FormEditPassword;
