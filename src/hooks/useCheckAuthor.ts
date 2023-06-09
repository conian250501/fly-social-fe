import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

export const useCheckAuthor = (userId: number): { isAuthor: boolean } => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  if (user?.id === userId) {
    return { isAuthor: true };
  } else {
    return { isAuthor: false };
  }
};
