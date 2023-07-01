import { Pacifico } from "next/font/google";
import React from "react";
import styles from "./loadingApp.module.scss";

const pacifico = Pacifico({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
});

type Props = {};

const LoadingApp = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <img src="/images/logo-app.png" alt="" className={styles.logo} />
      <h1 className={`${styles.appName} ${pacifico.className}`}>Fly social</h1>
    </div>
  );
};

export default LoadingApp;
