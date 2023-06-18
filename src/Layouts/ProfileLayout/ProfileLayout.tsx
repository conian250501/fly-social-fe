/* eslint-disable react/display-name */
import { getUser } from "@/app/features/auth/authAction";
import {
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "@/app/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import React, { ReactNode, useEffect } from "react";
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
const MainLayout = dynamic(() => import("@/Layouts/MainLayout"), {
  ssr: false,
  loading: () => (
    <div className="d-flex align-items-center justify-content-center w-100 vh-100">
      <Loading />
    </div>
  ),
});
const LayoutWithNews = dynamic(() => import("@/Layouts/LayoutWithNews"), {
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

  useEffect(() => {
    async function getData() {
      await Promise.all([
        dispatch(getUserById(id)),
        dispatch(getAllUserFollowers(id)),
        dispatch(getAllUserFollowing(id)),
      ]);
    }
    getData();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <BackLink user={user} />
          <TopInfo user={user} />
          <TabsProfile userId={id} />
          {children}
        </>
      ) : (
        <h1>User doesn&apos;t exist</h1>
      )}
    </div>
  );
});

export default ProfileLayout;
