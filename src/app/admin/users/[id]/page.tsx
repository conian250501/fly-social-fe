"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { IUser } from "@/features/interface";
import { useAppDispatch } from "@/redux/hooks";
import { getUserById } from "@/features/user/userAction";
import NoneData from "@/components/shared/NoneData";
import UserDetail from "@/components/Admin/UserDetail";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        const user = await dispatch(getUserById(Number(params.id))).unwrap();
        setUser(user);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    getData();
  }, []);

  if (!user) {
    return <NoneData title="User doesn't exist?" />;
  }

  return (
    <div>
      <UserDetail user={user} />
    </div>
  );
};

export default Page;
