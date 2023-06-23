"use client";
import Following from "@/components/FollowUserList/Following";
import TabsFollow from "@/components/FollowUserList/TabsFollow";
import { ETypeFollowUserList } from "@/components/interfaces";
import Loading from "@/components/Loading";
import BackLink from "@/components/shared/Profile/BackLink";
import { getAllUserFollowing, getUserById } from "@/features/user/userAction";
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
  const [loadingGetAllUser, setLoadingGetAllUser] = useState<boolean>(false);
  const { usersFollowing } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    async function getData() {
      setLoadingGetAllUser(true);
      await dispatch(getUserById(Number(params.id))).unwrap();
      await await dispatch(getAllUserFollowing(Number(params.id))).unwrap();
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
        <Following currentUserId={Number(params.id)} users={usersFollowing} />
      )}
    </section>
  );
};

export default Page;
