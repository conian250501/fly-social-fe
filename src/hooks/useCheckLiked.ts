import { ILike } from "@/features/interface/like.interface";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";

export function useCheckLiked(likes: ILike[]): { userIsLiked: boolean } {
  const { user } = useAppSelector((state: RootState) => state.auth);
  if (likes.find((item) => item.user.id === user?.id)) {
    return { userIsLiked: true };
  } else {
    return { userIsLiked: false };
  }
}
