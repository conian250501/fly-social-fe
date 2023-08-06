"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getConversationById } from "@/features/conversation/conversationAction";
import Loading from "@/components/Loading/Loading";
import NoneData from "@/components/shared/NoneData";
import MessageList from "@/components/Chat/MessageList";
import BackLink from "@/components/shared/BackLink";
import { Col, Row } from "react-bootstrap";
import ConversationList from "../components/ConversationList/ConversationList";
import { IConversation, IUser } from "@/features/interface";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { socket } from "@/shared/socket";
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
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [participants, setParticipants] = useState<IUser[]>([]);

  useEffect(() => {
    async function getData() {
      try {
        const data: IConversation = await dispatch(
          getConversationById(Number(params.id))
        ).unwrap();

        const _participants = data.participants.filter(
          (item) => item.id !== Number(currentUser?.id)
        );
        setParticipants(_participants);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getData();
  }, [params.id, dispatch]);

  useEffect(() => {
    socket.emit("joinConversation", Number(params.id));
    return () => {
      socket.emit("leaveConversation", Number(params.id));
    };
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
  return (
    <div className={styles.conversationDetailPage}>
      <Row className="g-0">
        <Col xs={12} sm={12} md={12} lg={5} className="p-0">
          <div className={styles.conversationListWrapper}>
            <ConversationList />
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={7} className="p-0">
          <Link
            href={`${PATHS.Profile}/${participants[0].id}`}
            className={styles.topHeader}
          >
            <BackLink title="" customClassNameContainer={styles.backLink} />
            <div className={styles.userInfo}>
              <img
                src={
                  participants[0].avatar
                    ? participants[0].avatar
                    : "/images/avatar-placeholder.png"
                }
                alt=""
                className={styles.avatar}
              />
              <h5 className={styles.name}>{participants[0].name}</h5>
            </div>
          </Link>
          <MessageList
            conversation={conversation as IConversation}
            participants={participants}
          />
        </Col>
      </Row>
    </div>
  );
};

export default Page;
