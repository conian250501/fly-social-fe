"use client";
import MessageList from "@/components/Chat/MessageList";
import Loading from "@/components/Loading/Loading";
import ConversationDetail from "@/components/Modal/ConvesationDetail/ConversationDetail";
import BackLink from "@/components/shared/BackLink";
import NoneData from "@/components/shared/NoneData";
import { PATHS } from "@/contanst/paths";
import { getConversationById } from "@/features/conversation/conversationAction";
import { IConversation, IUser } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { socket } from "@/shared/socket";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import ConversationList from "../components/ConversationList/ConversationList";
import styles from "./page.module.scss";
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
  const [showConversationDetail, setShowConversationDetail] =
    useState<boolean>(false);

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

  const handleShowConversation = useCallback(() => {
    setShowConversationDetail(true);
  }, []);

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
        <Col xs={12} sm={12} md={12} lg={7} className={styles.colRight}>
          {conversation?.isGroup ? (
            <div
              className={styles.participantInfo}
              onClick={handleShowConversation}
            >
              <div className="d-flex align-items-center justify-content-start gap-3">
                <BackLink title="" customClassNameContainer={styles.backLink} />
                <div className={styles.avatarList}>
                  {participants.map((participant) => (
                    <div key={participant.id} className={styles.avatarItem}>
                      <img
                        src={
                          participant.avatar
                            ? participant.avatar
                            : "/images/avatar-placeholder.png"
                        }
                        alt=""
                        className={styles.avatar}
                      />
                    </div>
                  ))}
                </div>
                <h1 className={styles.groupName}>{conversation.groupName}</h1>
              </div>
              <div
                className={styles.iconSetting}
                onClick={handleShowConversation}
              >
                <FiSettings className={styles.icon} />
              </div>
            </div>
          ) : (
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
          )}
          <MessageList
            conversation={conversation as IConversation}
            participants={participants}
          />
        </Col>
      </Row>

      {/* ====== MODALS ====== */}
      <ConversationDetail
        isOpen={showConversationDetail}
        handleClose={() => setShowConversationDetail(false)}
        conversation={conversation as IConversation}
      />
    </div>
  );
};

export default Page;
