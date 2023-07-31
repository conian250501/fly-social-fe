"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getConversationById } from "@/features/conversation/conversationAction";
import Loading from "@/components/Loading/Loading";
import NoneData from "@/components/shared/NoneData/NoneData";
type Props = {
  params: {
    id: string;
  };
};

const Page = ({ params }: Props) => {
  const dispatch = useAppDispatch();
  const { conversation } = useAppSelector(
    (state: RootState) => state.conversation
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        await dispatch(getConversationById(Number(params.id))).unwrap();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [params.id]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <Loading />
      </div>
    );
  }
  if (!loading && !conversation) {
    return (
      <NoneData
        title="Conversation doesn't exist"
        customClassNameTitle={styles.noneDataTitle}
      />
    );
  }
  return <div>{conversation?.id}</div>;
};

export default Page;
