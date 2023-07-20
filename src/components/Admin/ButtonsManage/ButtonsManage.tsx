/* eslint-disable react/display-name */
import React from "react";
import styles from "./buttonsManage.module.scss";
import Link from "next/link";
type Props = {
  link: string;
};

const ButtonsManage = React.memo(({ link }: Props) => {
  return (
    <div className={styles.btnList}>
      <div className={`${styles.btnItem} ${styles.delete}`}>Delete</div>
      <Link href={link} className={`${styles.btnItem} ${styles.edit}`}>
        Edit
      </Link>
    </div>
  );
});

export default ButtonsManage;
