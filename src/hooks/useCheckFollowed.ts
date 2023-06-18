import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

export const useCheckFollowed = (userId: number): { isFollowed: boolean } => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  console.log({ user });
  if (user?.followings.find((item) => item.id === userId)) {
    return { isFollowed: true };
  } else {
    return { isFollowed: false };
  }
};
