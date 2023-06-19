import { IUser } from "@/features/interface";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export const useCheckFollowed = (
  followers: IUser[]
): { isFollowed: boolean } => {
  const { user: _user } = useAppSelector((state: RootState) => state.auth);
  if (followers.find((item) => item.id === Number(_user?.id))) {
    return { isFollowed: true };
  } else {
    return { isFollowed: false };
  }
};
