import Header from "@/components/Admin/Header";
import LoadingApp from "@/components/LoadingApp";
import { PATHS } from "@/contanst/paths";
import { getUser } from "@/features/auth/authAction";
import { EUserRole } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./adminLayout.module.scss";
import NoneData from "@/components/shared/NoneData/NoneData";
type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.auth);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.style.background = "rgba(0, 0, 0, 0.06)";
  }, []);

  useEffect(() => {
    async function fetchUser() {
      try {
        await dispatch(getUser()).unwrap();
        setLoading(false);
      } catch (error) {
        router.push(PATHS.AdminAuth);
        console.log({ error });
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    if (user && user.role !== EUserRole.Admin) {
      localStorage.removeItem("token");
    }
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 vh-100">
        <LoadingApp />
      </div>
    );
  }

  if (user?.role !== EUserRole.Admin) {
    return <NoneData title="You doesn't permission for this page" />;
  }

  return (
    <div className={styles.adminLayout}>
      <Header />
      <div className={styles.children}> {children}</div>
    </div>
  );
};

export default AdminLayout;
