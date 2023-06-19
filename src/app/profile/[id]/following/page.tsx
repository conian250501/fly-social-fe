"use client";
import Following from "@/components/FollowUserList/Following";
import TabsFollow from "@/components/FollowUserList/TabsFollow";
import { ETypeFollowUserList } from "@/components/interfaces";
import BackLink from "@/components/shared/Profile/BackLink";
import { getAllUserFollowing, getUserById } from "@/features/user/userAction";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const { usersFollowing } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getData() {
      await Promise.all([
        dispatch(getUserById(Number(params.id))),
        dispatch(getAllUserFollowing(Number(params.id))),
      ]);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      await dispatch(getUserById(Number(params.id)));
    }
    getData();
  }, []);

  return (
    <MainLayout>
      <LayoutWithNews>
        {user ? (
          <>
            <BackLink user={user} />
            <TabsFollow id={Number(params.id)} />

            <Following users={usersFollowing} />
          </>
        ) : (
          <h1>User doesn&apos;t exist</h1>
        )}
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
