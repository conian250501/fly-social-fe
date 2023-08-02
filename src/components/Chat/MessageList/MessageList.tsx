import React, { useEffect, useRef, useState } from "react";
import styles from "./messageList.module.scss";
import { IConversation, IMessage, IUser } from "@/features/interface";
import MessageItem from "../MessageItem/MessageItem";
import { useAppDispatch } from "@/redux/hooks";
import { getAllMessageByConversation } from "@/features/message/messageAction";
import FormActionMessage from "../FormActionMessage/FormActionMessage";
import Loading from "@/components/Loading/Loading";
import moment from "moment";
import Link from "next/link";
import { PATHS } from "@/contanst/paths";
import { socket } from "@/shared/socket";
type Props = {
  conversation: IConversation;
  participants: IUser[];
};

const MessageList = ({ conversation, participants }: Props) => {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loadingGetMessages, setLoadingGetMessages] = useState<boolean>(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time activities change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function getMessages() {
      try {
        setLoadingGetMessages(true);
        const data = await dispatch(
          getAllMessageByConversation(conversation.id)
        ).unwrap();
        setMessages(data);
        setLoadingGetMessages(false);
      } catch (error) {
        setLoadingGetMessages(false);

        console.error({ error });
      }
    }
    getMessages();
  }, [conversation.id, dispatch]);

  // SOCKET EVENT GET ALL MESSAGE
  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [messages]);

  if (loadingGetMessages) {
    return (
      <div className="d-flex align-items-center justify-content-center w-100 mt-4">
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <Link
        href={`${PATHS.Profile}/${participants[0].id}`}
        className={styles.participantInfo}
      >
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
        <p className={styles.dateStart}>
          Conversation is started at{" "}
          {moment(conversation.createdAt).format("MMMM YYYY")}
        </p>
      </Link>
      <div className={styles.messageList}>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <FormActionMessage type="New" conversationId={conversation.id} />
    </div>
  );
};

export default MessageList;
