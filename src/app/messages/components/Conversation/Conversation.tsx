import React from "react";
import styles from "./conversation.module.scss";
type Props = {};

const Conversation = (props: Props) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.placeholderConversation}>
        <h1 className={styles.title}>Select a message</h1>
        <p className={styles.subtitle}>
          Choose from your existing conversations, <br /> Start a new one, or
          just keep swimming.
        </p>
      </div>
    </div>
  );
};

export default Conversation;
