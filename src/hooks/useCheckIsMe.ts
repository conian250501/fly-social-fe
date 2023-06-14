import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

export function useCheckIsMe(userId: number): { isMe: boolean } {
  const { user } = useAppSelector((state: RootState) => state.auth);
  if (user?.id === userId) {
    return { isMe: true };
  } else {
    return { isMe: false };
  }
}
