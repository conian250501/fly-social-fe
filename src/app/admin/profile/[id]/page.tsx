"use client";
import React from "react";
import styles from "./page.module.scss";
import BackLink from "@/components/shared/BackLink";
import Info from "./components/Info";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  return (
    <div>
      <BackLink title="Profile" customClassNameContainer={styles.backLink} />
      <Info id={Number(params.id)} />
    </div>
  );
};

export default Page;
