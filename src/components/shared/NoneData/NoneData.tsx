import React from "react";
import styles from "./noneData.module.scss";
type Props = {
  title: string;
  description?: string;
  customClassNameContainer?: string;
  customClassNameTitle?: string;
  customClassNameDescription?: string;
  customClassNameBanner?: string;
};

const NoneData = ({
  title,
  description,
  customClassNameContainer,
  customClassNameTitle,
  customClassNameDescription,
  customClassNameBanner,
}: Props) => {
  return (
    <div className={`${styles.noneDataWrapper} ${customClassNameContainer}`}>
      <img
        src="/images/birds.png"
        className={`${styles.banner} ${customClassNameBanner}`}
        alt=""
      />
      <h1 className={`${styles.title} ${customClassNameTitle}`}>{title}</h1>
      <p className={`${styles.description} ${customClassNameDescription}`}>
        {description}
      </p>
    </div>
  );
};

export default NoneData;
