import React, { useState } from "react";

import { PATHS } from "@/contanst/paths";
import { useRouter } from "next/navigation";
import styles from "./modalLogout.module.scss";
import { Modal } from "react-bootstrap";
import Loading from "@/components/Loading";
import { resolve } from "path";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/features/auth/authSlice";
type Props = {};

const ModalLogout = (props: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLogout = async () => {
    try {
      setLoading(true);
      await new Promise((resolve, reject) => {
        localStorage.removeItem("token");
        resolve(true);
      });

      await new Promise((resolve) => {
        dispatch(logout());
        resolve(true);
      });

      router.push(PATHS.Home);
    } catch (error) {}
  };
  const handleCancel = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100 flex-column">
        <Loading />
        <p className={styles.textLoading}>Logging out</p>
      </div>
    );
  }
  return (
    <Modal
      show={true}
      centered
      dialogClassName={styles.dialogWrapper}
      contentClassName={styles.modalContent}
    >
      <div className={styles.logo}>
        <img src="/images/logo-app.png" alt="" />
      </div>
      <h1 className={styles.heading}>Log out of Fly social?</h1>
      <p className={styles.description}>
        You can always log back in at any time. If you just want to switch
        accounts, you can do that by adding an existing account.
      </p>
      <button
        className={`${styles.btn} ${styles.logout}`}
        onClick={handleLogout}
      >
        Log out
      </button>
      <button
        className={`${styles.btn} ${styles.cancel}`}
        onClick={handleCancel}
      >
        Cancel
      </button>
    </Modal>
  );
};

export default ModalLogout;
