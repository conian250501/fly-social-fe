/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import styles from "./backLink.module.scss";
type Props = {
  title: string;
  customClassNameContainer?: string;
  customClassNameTitle?: string;
};

const BackLink = React.memo(
  ({ title, customClassNameContainer, customClassNameTitle }: Props) => {
    const router = useRouter();

    return (
      <div className={`${styles.container} ${customClassNameContainer}`}>
        <div onClick={() => router.back()} className={styles.iconArrow}>
          <FiArrowLeft className={styles.icon} />
        </div>
        <h1 className={`${styles.title} ${customClassNameTitle}`}>{title}</h1>
      </div>
    );
  }
);

export default BackLink;
