/* eslint-disable react/display-name */
import { IPayloadTweet } from "@/features/interface";
import React from "react";
import { FaAngleDown, FaUserSecret } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import styles from "./audienceFormTweet.module.scss";
type Props = {
  data: IPayloadTweet;
  showAudienceList: boolean;
  setShowAudienceList: React.Dispatch<React.SetStateAction<boolean>>;
  handleChangeAudience: (isPrivate: boolean) => void;
};

const audienceFormTweet = React.memo(
  ({
    data,
    setShowAudienceList,
    handleChangeAudience,
    showAudienceList,
  }: Props) => {
    return (
      <div
        className={styles.audiencePlaceholder}
        onClick={(e) => {
          e.stopPropagation();
          setShowAudienceList(!showAudienceList);
        }}
      >
        {data.isPrivate ? "Only you" : "Everyone"}
        <FaAngleDown className={styles.icon} />
        {showAudienceList && (
          <ul className={styles.audienceList}>
            <h6 className={styles.title}>Choose audience</h6>
            <li
              className={`${styles.audienceItem} ${
                !data.isPrivate ? styles.active : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleChangeAudience(false);
              }}
            >
              <div className={styles.audienceIcon}>
                <GiWorld className={styles.icon} />
              </div>
              <span>Everyone</span>
            </li>
            <li
              className={`${styles.audienceItem} ${
                data.isPrivate ? styles.active : ""
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleChangeAudience(true);
              }}
            >
              <div className={styles.audienceIcon}>
                <FaUserSecret className={styles.icon} />
              </div>
              <span>Only you</span>
            </li>
          </ul>
        )}
      </div>
    );
  }
);

export default audienceFormTweet;
