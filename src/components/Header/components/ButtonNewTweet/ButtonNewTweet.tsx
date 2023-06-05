/* eslint-disable react/display-name */
import React, { useState } from "react";
import { GiSpikyWing } from "react-icons/gi";
import styles from "./buttonNewTweet.module.scss";
import CreateTweetForm from "@/components/Modal/CreateTweetForm";
import { AiOutlinePlus } from "react-icons/ai";

type Props = {};

const ButtonNewTweet = React.memo((props: Props) => {
  const [showFormCreateTweet, setShowFormCreateTweet] =
    useState<boolean>(false);
  return (
    <React.Fragment>
      <button
        type="button"
        className={styles.btnAddTweet}
        onClick={() => setShowFormCreateTweet(!showFormCreateTweet)}
      >
        <GiSpikyWing className={styles.icon} />
        <span>Tweet</span>
      </button>

      <CreateTweetForm
        show={showFormCreateTweet}
        handleClose={() => setShowFormCreateTweet(false)}
      />
    </React.Fragment>
  );
});

export default ButtonNewTweet;
