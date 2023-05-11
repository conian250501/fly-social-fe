import Header from "@/components/Header/Header";
import React, { useEffect, useState } from "react";
import styles from "./mainLayout.module.scss";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/Loading/Loading";
type Props = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        setLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [isAuthenticated]);
  return (
    <>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center w-100 vh-100">
          <Loading />
        </div>
      ) : (
        <div className={styles.mainLayout}>
          <Header />
          {children}
        </div>
      )}
    </>
  );
};

export default MainLayout;
