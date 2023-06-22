/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";

import { useRouter, useSearchParams } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { resetPassword, verifyToken } from "@/features/auth/authAction";
import { regexPassword } from "@/contanst/regexs";
import { clearError, setError } from "@/features/auth/authSlice";
import { IError } from "@/features/interface";
import Loading from "@/components/Loading/Loading";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { IPayloadResetPass, IUser } from "@/features/interface";

import styles from "./page.module.scss";
import { PATHS } from "@/contanst/paths";
import ModalError from "@/components/Modal/ModalError/ModalError";

type Props = {};

const Page = (props: Props) => {
  const urlParams = useSearchParams();
  const token = urlParams.get("token");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { error, isExpiredToken } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVerifyToken, setLoadingVerifyToken] = useState(true);
  const [isChangeSuccess, setIsChangeSuccess] = useState(false);

  const [payload, setPayload] = useState<IPayloadResetPass>({
    newPassword: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    async function verify() {
      try {
        const user: IUser = await dispatch(
          verifyToken(token as string)
        ).unwrap();
        setLoadingVerifyToken(false);
      } catch (error) {
        setLoadingVerifyToken(false);
        return error;
      }
    }
    verify();
  }, [dispatch, token]);

  const validate = (values: IPayloadResetPass) => {
    const errors: { newPassword: string; confirmPassword: string } = {
      newPassword: "",
      confirmPassword: "",
    };
    if (!values.newPassword) {
      errors.newPassword = "New password is required";
    } else if (!regexPassword.test(values.newPassword)) {
      errors.newPassword = "Password incorrect format";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    } else if (values.newPassword !== values.confirmPassword) {
      errors.confirmPassword = `Password don't match`;
    }

    if (!errors.newPassword || !errors.confirmPassword) {
      return {};
    }

    return errors;
  };
  const formReset = useFormik({
    initialValues: payload,
    validate,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        await dispatch(
          resetPassword({
            ...values,
            token: token,
          })
        ).unwrap();
        setIsChangeSuccess(true);
        setLoading(false);
        dispatch(clearError());
      } catch (error) {
        setLoading(false);
        dispatch(setError(error as IError));
      }
    },
  });

  if (isExpiredToken) {
    return (
      <div className={styles.errorToken}>
        <div className={styles.errorTextWrapper}>
          <h1 className={styles.errorText}>Link is expired</h1>
        </div>
      </div>
    );
  }

  return (
    <div>
      {loadingVerifyToken ? (
        <div className="d-flex align-items-center justify-content-center m-auto w-100 vh-100">
          <Loading />
        </div>
      ) : (
        <div className={styles.resetPassContainer}>
          <Form
            className={styles.formResetPass}
            onSubmit={formReset.handleSubmit}
          >
            <h1 className={styles.heading}>Reset password</h1>
            <p className={styles.description}>
              Regain account access securely, protect your information, and
              restore peace of mind.
            </p>

            {/* ======= NEW PASSWORD ======= */}
            <Form.Group className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <Form.Control
                  value={formReset.values.newPassword}
                  name="newPassword"
                  onChange={formReset.handleChange}
                  className={`${styles.formInput}`}
                  type={showPassword ? "text" : "password"}
                  placeholder="New password"
                />
                <div
                  className={styles.iconEye}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible className={styles.icon} />
                  ) : (
                    <AiOutlineEye className={styles.icon} />
                  )}
                </div>
              </div>

              {formReset.errors.newPassword ? (
                <Form.Text className={styles.textErrorValidate}>
                  {formReset.errors.newPassword}
                </Form.Text>
              ) : null}

              <Form.Text className={styles.formTextHelp}>
                Password must have 8 character, include number and Uppercase
                character
              </Form.Text>
            </Form.Group>

            {/* ======= CONFIRM PASSWORD ======= */}
            <Form.Group className={styles.formGroup}>
              <div className={styles.inputGroup}>
                <Form.Control
                  value={formReset.values.confirmPassword}
                  name="confirmPassword"
                  onChange={formReset.handleChange}
                  className={`${styles.formInput}`}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                />
                <div
                  className={styles.iconEye}
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible className={styles.icon} />
                  ) : (
                    <AiOutlineEye className={styles.icon} />
                  )}
                </div>
              </div>
              {formReset.errors.confirmPassword ? (
                <Form.Text className={styles.textErrorValidate}>
                  {formReset.errors.confirmPassword}
                </Form.Text>
              ) : null}
            </Form.Group>
            <Button
              type="submit"
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className={styles.iconLoading} />
              ) : (
                "Change"
              )}
            </Button>
          </Form>

          {/* ====== MODALS ====== */}
          {error && (
            <ModalError
              isOpen={Boolean(error)}
              handleClose={() => dispatch(clearError())}
              message={error.message}
            />
          )}
          <ModalSuccess
            isOpen={isChangeSuccess}
            message={"Password successfully updated."}
            handleClose={() => {
              setIsChangeSuccess(false);
              router.replace(PATHS.Auth);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
