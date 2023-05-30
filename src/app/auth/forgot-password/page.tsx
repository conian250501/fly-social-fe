"use client";
import React from "react";
import styles from "./page.module.scss";
import { Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { IoMdClose } from "react-icons/io";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
type Props = {};

const Page = (props: Props) => {
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
        console.log({ values });
      } catch (error) {}
    },
  });
  return (
    <div className={styles.forgotPassword}>
      <Form className={styles.formForgotPassword} onSubmit={form.handleSubmit}>
        <Link href={PATHS.Auth} className={styles.iconClose}>
          <IoMdClose className={styles.icon} />
        </Link>
        <div className={styles.logo}>
          <img src="/images/logo-twitter.png" alt="" />
        </div>
        <h1 className={styles.heading}>Find your Flyer account</h1>
        <p className={styles.description}>
          Enter the email associated with your account to change your password.
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
        <Button type="submit" className={styles.btnSubmit}>
          Send
        </Button>
      </Form>
    </div>
  );
};

export default Page;
