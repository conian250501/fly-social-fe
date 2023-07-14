"use client";
import FormSignIn from "./components/FormSignIn";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  return (
    <div className={styles.adminAuthPage}>
      <div className={styles.banner}>
        <img src="/images/banner-login.png" alt="" />
        <div className={styles.content}>
          <h1 className={styles.heading}>Fly social Dashboard</h1>
          <p className={styles.description}>
            Manage all information of your app
          </p>
        </div>
      </div>
      <div className={styles.formLogin}>
        <FormSignIn />
      </div>
    </div>
  );
};

export default Page;
