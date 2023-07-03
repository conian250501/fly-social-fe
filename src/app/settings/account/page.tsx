import React from "react";
import InfoList from "./components/InfoList";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.accountSettingPage}>
      <InfoList />
    </div>
  );
};

export default Page;
