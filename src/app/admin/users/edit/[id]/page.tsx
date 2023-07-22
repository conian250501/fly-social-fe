"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import FormEditUser from "@/components/Admin/FormEditUser";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getUserById } from "@/features/admin/user/userAction";
import { ProgressSpinner } from "primereact/progressspinner";
import NoneData from "@/components/shared/NoneData/NoneData";
import { IUser } from "@/features/interface";
import BackLink from "@/components/shared/BackLink/BackLink";
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
    return <ProgressSpinner className={styles.loading} strokeWidth="4" />;
  }

  if (!user && !loading) {
    return <NoneData title="User doesn't exist?" />;
  }

  return (
    <div className={styles.editUserPage}>
      <BackLink
        title="Edit Information"
        customClassNameContainer={styles.backLinkContainer}
      />

      <FormEditUser user={user as IUser} />
    </div>
  );
};

export default Page;
