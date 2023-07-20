/* eslint-disable react/display-name */
import React from "react";
import styles from "./buttonManageRecordTable.module.scss";
import Link from "next/link";

type Props = {
  link: string;
};

const ButtonManageRecordTable = React.memo(({ link }: Props) => {
  return (
    <Link href={link} className={styles.manageLink}>
      Manage
    </Link>
  );
});

export default ButtonManageRecordTable;
