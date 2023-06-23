/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import {
  getAllUserFollowers,
  getAllUserFollowing,
  getUserById,
} from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import React, { ReactNode, useEffect, useState } from "react";

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
        await dispatch(getUserById(id)).unwrap();
        await Promise.all([
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

  return <div>{children}</div>;
});

export default ProfileLayout;
