"use client";
import FormEditTweet from "@/components/Admin/FormEditTweet/FormEditTweet";
import BackLink from "@/components/shared/BackLink/BackLink";
import { getTweetById } from "@/features/admin/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const [loadingGetTweet, setLoadingGetTweet] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetTweet(true);
        await dispatch(getTweetById(Number(params.id))).unwrap();
        setLoadingGetTweet(false);
      } catch (error) {
        setLoadingGetTweet(false);
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.adminEditTweetPage}>
      <BackLink title="Edit tweet" customClassNameContainer={styles.backLink} />
      {loadingGetTweet ? (
        <ProgressSpinner className={styles.loading} strokeWidth="4" />
      ) : (
        <FormEditTweet />
      )}
    </div>
  );
};

export default Page;
