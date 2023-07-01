"use client";
import React, { FC, useEffect, useState } from "react";
import styles from "./page.module.scss";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IError } from "@/features/interface";
import { clearError, setError } from "@/features/auth/authSlice";
import { AiOutlineLoading } from "react-icons/ai";
import { forgotPassword } from "@/features/auth/authAction";
import ModalError from "@/components/Modal/ModalError/ModalError";
import ModalSuccess from "@/components/Modal/ModalSuccess/ModalSuccess";
type Props = {};

const Page = (props: Props) => {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(false);
  const [sendMailSuccess, setSendMailSuccess] = useState(false);
  const [isResendMail, setIsResendMail] = useState(false);
  const [initialResendTime, setInitialResendTime] = useState(25);
  const [resendTime, setResendTime] = useState(initialResendTime);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, []);

  useEffect(() => {
    let timer: any;
    if (isResendMail && resendTime > 0) {
      timer = setInterval(() => {
        setResendTime((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    if (resendTime === 0) {
      clearInterval(timer);
      setIsResendMail(false);
      setResendTime(initialResendTime);
    }
    return () => clearInterval(timer);
  }, [initialResendTime, isResendMail, resendTime]);

  const validate = (values: { email: string }) => {
    const errors: { email: string } = {
      email: "",
    };
    if (!values.email) {
      errors.email = `Email is required`;
    }
    if (!errors.email) {
      return {};
    }
    return errors;
  };
  const form = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    async onSubmit(values) {
      try {
        setLoading(true);

        await dispatch(forgotPassword(values.email)).unwrap();
        setSendMailSuccess(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        dispatch(setError(error));
      }
    },
  });

  const handleResendMail = async () => {
    try {
      setLoading(true);
      await dispatch(forgotPassword(form.values.email)).unwrap();
      setSendMailSuccess(true);
      setIsResendMail(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setError(error as IError));
    }
  };

  const ButtonResendMail: FC = () => {
    return (
      <>
        {!isResendMail ? (
          <Button
            type="button"
            className={styles.btnResendMail}
            disabled={loading}
            onClick={handleResendMail}
          >
            {loading ? (
              <AiOutlineLoading className={styles.iconLoading} />
            ) : (
              "Resend email"
            )}
          </Button>
        ) : (
          <Button
            type="button"
            className={styles.btnResendMail}
            disabled={resendTime !== 0}
            onClick={handleResendMail}
          >
            Resend on 0:{resendTime}
          </Button>
        )}
      </>
    );
  };
  return (
    <div className={styles.forgotPassword}>
      <Form className={styles.formForgotPassword} onSubmit={form.handleSubmit}>
        {sendMailSuccess ? (
          <div className={styles.successContainer}>
            <h1 className={styles.heading}>Check your email</h1>
            <p className={styles.message}>
              {`We have sent an email with password reset information to
                  ${form.values.email.replace(
                    /(\w{1})(\w+)(\w{1}@)/,
                    "$1****$3"
                  )}.`}
            </p>
            <p className={styles.description}>
              Didn’t receive the email? Check spam or promotion folder
            </p>
            <ButtonResendMail />
          </div>
        ) : (
          <>
            <Link
              href={PATHS.Auth}
              prefetch={false}
              className={styles.iconClose}
            >
              <IoMdClose className={styles.icon} />
            </Link>
            <div className={styles.logo}>
              <img src="/images/logo-app.png" alt="" />
            </div>
            <h1 className={styles.heading}>Find your Flyer account</h1>
            <p className={styles.description}>
              Enter the email associated with your account to change your
              password.
            </p>
            <Form.Group className={styles.formGroup}>
              <Form.Control
                value={form.values.email}
                onChange={form.handleChange}
                name="email"
                placeholder="Enter your email"
                className={styles.formInput}
              />
              {form.errors.email && (
                <p className={styles.textError}>{form.errors.email}</p>
              )}
            </Form.Group>
            <Button
              type="submit"
              className={styles.btnSubmit}
              disabled={loading}
            >
              {loading ? (
                <AiOutlineLoading className={styles.iconLoading} />
              ) : (
                "Reset"
              )}
            </Button>
          </>
        )}
      </Form>

      {/* ====== MODALS ====== */}
      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => dispatch(clearError())}
          message={error.message}
        />
      )}
    </div>
  );
};

export default Page;
