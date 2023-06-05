/* eslint-disable react/display-name */
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import styles from "./buttonNewTweetMobile.module.scss";
import CreateTweetForm from "@/components/Modal/CreateTweetForm";
type Props = {};

const ButtonNewTweetMobile = React.memo((props: Props) => {
  const [showFormCreateTweet, setShowFormCreateTweet] =
    useState<boolean>(false);
  return (
    <React.Fragment>
      <button
        className={styles.btnAddTweetMobile}
        onClick={() => setShowFormCreateTweet(true)}
      >
        <AiOutlinePlus className={styles.icon} />
      </button>
      <CreateTweetForm
        show={showFormCreateTweet}
        handleClose={() => setShowFormCreateTweet(false)}
      />
    </React.Fragment>
  );
});

export default ButtonNewTweetMobile;
