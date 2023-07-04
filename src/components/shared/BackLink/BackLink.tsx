/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./backLink.module.scss";
type Props = {
  title: string;
};

const BackLink = React.memo(({ title }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <div onClick={() => router.back()} className={styles.iconArrow}>
        <FiArrowLeft className={styles.icon} />
      </div>
      <h1 className={styles.title}>{title}</h1>
    </div>
  );
});

export default BackLink;
