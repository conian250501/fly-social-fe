/* eslint-disable react/display-name */
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import Loading from "@/components/Loading";
import {
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "@/features/user/userAction";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect, useState } from "react";
const BackLink = dynamic(() => import("@/components/shared/Profile/BackLink"), {
  ssr: false,
  loading: () => (
    <div className="d-flex align-items-center justify-content-center w-100 h-100">
      <Loading />
    </div>
  ),
});
const TabsProfile = dynamic(
  () => import("@/components/shared/Profile/TabsProfile"),
  {
    ssr: false,
    loading: () => (
      <div className="d-flex align-items-center justify-content-center w-100 vh-100">
        <Loading />
      </div>
    ),
  }
);
const TopInfo = dynamic(() => import("@/components/shared/Profile/TopInfo"), {
  ssr: false,
  loading: () => (
    <div className="d-flex align-items-center justify-content-center w-100 vh-100">
      <Loading />
    </div>
  ),
});

type Props = {
  children: ReactNode;
  id: number;
};

const ProfileLayout = React.memo(({ children, id }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        await Promise.all([
          dispatch(getUserById(id)),
          dispatch(getAllUserFollowers(id)),
          dispatch(getAllUserFollowing(id)),
        ]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        return error;
      }
    }
    getData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 mt-5">
        <Loading />
      </div>
    );
  }

  if (!user) return <h1>User doesn&apos;t exist</h1>;

  return (
    <div>
      <BackLink user={user} />
      <TopInfo user={user} />
      <TabsProfile userId={id} />
      {children}
    </div>
  );
});

export default ProfileLayout;
