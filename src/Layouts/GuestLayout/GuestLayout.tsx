import React, { ReactNode, useEffect, useState } from "react";
import styles from "./guestLayout.module.scss";
import { Col, Row } from "react-bootstrap";
import Header from "@/components/Header";
import { useAppDispatch } from "@/redux/hooks";
import { getUser } from "@/features/auth/authAction";
import Loading from "@/components/Loading";
import LoadingApp from "@/components/LoadingApp";
import { useRouter } from "next/navigation";
import { PATHS } from "@/contanst/paths";
type Props = {
  children: ReactNode;
};

const GuestLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        setLoading(true);
        await dispatch(getUser()).unwrap();
        setLoading(false);
      } catch (error) {
        router.push(PATHS.LoginPage);
        setLoading(false);

        return error;
      }
    };

    if (token) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
        <LoadingApp />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default GuestLayout;
