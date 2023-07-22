"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { IUser } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import NoneData from "@/components/shared/NoneData";
import UserDetail from "@/components/Admin/UserDetail";
import { ProgressSpinner } from "primereact/progressspinner";
import { getUserById } from "@/features/admin/user/userAction";
import { RootState } from "@/redux/store";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.adminUser);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        await dispatch(getUserById(Number(params.id))).unwrap();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 ">
        <ProgressSpinner className={styles.loading} strokeWidth="3" />
      </div>
    );
  }

  if (!user && !loading) {
    return <NoneData title="User doesn't exist?" />;
  }

  return (
    <div>
      <UserDetail user={user as IUser} />
    </div>
  );
};

export default Page;
