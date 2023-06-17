import { IStorageTweet } from "@/app/features/interface";
import { useAppSelector } from "@/app/redux/hooks";
import { RootState } from "@/app/redux/store";

export function useCheckSavedTweet(storageTweets: IStorageTweet[]): {
  tweetIsSaved: boolean;
} {
  const { user } = useAppSelector((state: RootState) => state.auth);
  if (storageTweets.find((item) => item.user.id === user?.id)) {
    return { tweetIsSaved: true };
  } else {
    return { tweetIsSaved: false };
  }
}
