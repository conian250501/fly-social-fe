/* eslint-disable react/display-name */
import { IConversation } from "@/features/interface";
import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./conversationDetail.module.scss";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  conversation: IConversation;
};

const ConversationDetail = React.memo(
  ({ isOpen, handleClose, conversation }: Props) => {
    return (
      <Modal
        show={isOpen}
        onHide={handleClose}
        centered
        contentClassName={styles.modalContent}
      >
        {conversation.groupName}
      </Modal>
    );
  }
);

export default ConversationDetail;
