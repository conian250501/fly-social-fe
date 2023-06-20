"use client";
import Followers from "@/components/FollowUserList/Followers";
import TabsFollow from "@/components/FollowUserList/TabsFollow";
import { ETypeFollowUserList } from "@/components/interfaces";
import BackLink from "@/components/shared/Profile/BackLink";
import { getAllUserFollowers, getUserById } from "@/features/user/userAction";
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
  const { usersFollower } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getData() {
      await Promise.all([
        dispatch(getUserById(Number(params.id))),
        dispatch(getAllUserFollowers(Number(params.id))),
      ]);
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

            <Followers
              currentUserId={Number(params.id)}
              users={usersFollower}
            />
          </>
        ) : (
          <h1>User doesn&apos;t exist</h1>
        )}
      </LayoutWithNews>
    </MainLayout>
  );
};

export default Page;
