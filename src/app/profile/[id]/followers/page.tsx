"use client";
import Followers from "@/components/FollowUserList/Followers";
import TabsFollow from "@/components/FollowUserList/TabsFollow";
import { ETypeFollowUserList } from "@/components/interfaces";
import Loading from "@/components/Loading";
import BackLink from "@/components/shared/Profile/BackLink";
import { getAllUserFollowers, getUserById } from "@/features/user/userAction";
import LayoutWithNews from "@/Layouts/LayoutWithNews";
import MainLayout from "@/Layouts/MainLayout";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state: RootState) => state.user);
  const { usersFollower } = useAppSelector((state: RootState) => state.user);
  const [loadingGetAllUser, setLoadingGetAllUser] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      setLoadingGetAllUser(true);
      await dispatch(getUserById(Number(params.id))).unwrap();
      dispatch(getAllUserFollowers(Number(params.id))).unwrap();

      setLoadingGetAllUser(false);
    }

    getData();
  }, []);

  return (
    <section>
      <BackLink user={user} />
      <TabsFollow id={Number(params.id)} />
      {loadingGetAllUser ? (
        <div className="d-flex align-items-center justify-content-center mt-5">
          <Loading />
        </div>
      ) : (
        <Followers currentUserId={Number(params.id)} users={usersFollower} />
      )}
    </section>
  );
};

export default Page;
