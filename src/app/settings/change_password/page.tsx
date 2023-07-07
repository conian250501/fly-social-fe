"use client";
import FormEditPassword from "@/components/FormEditPassword";
import BackLink from "@/components/shared/BackLink";
import React from "react";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.editPasswordPage}>
      <BackLink title="Change your password" />
      <FormEditPassword />
    </div>
  );
};

export default Page;
