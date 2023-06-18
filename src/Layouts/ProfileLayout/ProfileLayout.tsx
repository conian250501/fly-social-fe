import { getUserById } from "@/app/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";
import Loading from "@/components/Loading";
import dynamic from "next/dynamic";
import { ReactNode, useEffect } from "react";
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

const ProfileLayout = ({ children, id }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserById(id));
  }, []);

  return (
    <MainLayout>
      <LayoutWithNews>
        {user ? (
          <>
            <BackLink user={user} />
            <TopInfo user={user} />
            <TabsProfile />
            {children}
          </>
        ) : (
          <h1>User doesn&apos;t exist</h1>
        )}
      </LayoutWithNews>
    </MainLayout>
  );
};

export default ProfileLayout;
