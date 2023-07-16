import { ETypeTabInfoApp, ITabInfoApp } from "@/components/Admin/interface";
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import { useState } from "react";
import styles from "./infoApp.module.scss";

type Props = {};

const InfoApp = (props: Props) => {
  const [tabs, setTabs] = useState<ITabInfoApp[]>([
    {
      id: nanoid(),
      type: ETypeTabInfoApp.Members,
    },
    {
      id: nanoid(),
      type: ETypeTabInfoApp.Tweets,
    },

    {
      id: nanoid(),
      type: ETypeTabInfoApp.Verified,
    },
  ]);
  const [tabActive, setTabActive] = useState<ETypeTabInfoApp>(
    ETypeTabInfoApp.Members
  );
  return (
    <div className={styles.infoAppWrapper}>
      <div className={styles.logo}>
        <img src="/images/nft.jpg" alt="" />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.tabList}>
          {tabs.map((tab) => (
            <div
              className={`${styles.tabItem} ${
                tabActive === tab.type ? styles.active : ""
              }`}
              key={tab.id}
              onClick={() => setTabActive(tab.type)}
            >
              {tab.type}
            </div>
          ))}
        </div>

        <div className={styles.wrapper}>
          <div className={styles.content}>
            <h1 className={styles.heading}>
              {tabActive === ETypeTabInfoApp.Members && (
                <>
                  Manage a number of users <br /> in <span>Fly Social</span>
                </>
              )}
              {tabActive === ETypeTabInfoApp.Tweets && (
                <>
                  A Burst of Creativity: <br /> Unleashing the Power of
                  User-generated Posts on Fly Social
                </>
              )}
              {tabActive === ETypeTabInfoApp.Verified && (
                <>
                  Verified Users: <br /> The Power of Trust
                </>
              )}
            </h1>
            <p className={styles.description}>
              {tabActive === ETypeTabInfoApp.Members &&
                `Discover a vibrant tapestry of cultures as you connect with users
              from various backgrounds, all brought together by a shared love
              for exploration and social connections. Expand your horizons,
              broaden your perspectives, and ignite your wanderlust as you
              engage in meaningful conversations, exchange travel tips, and form
              lifelong friendships.`}
              {tabActive === ETypeTabInfoApp.Tweets &&
                `Immerse yourself in a world where every user is a storyteller. With
              Fly Social, users have the freedom to create and share posts that
              reflect their unique perspectives and interests. From stunning travel
              photos to thought-provoking articles, heartwarming stories to
              hilarious memes, the possibilities for expression are limitless.`}
              {tabActive === ETypeTabInfoApp.Verified &&
                ` With our subscription-based verification process, Fly Social offers a
              layer of trust that sets us apart. Verified Users carry a symbol of
              authenticity, distinguishing themselves as trusted members within the
              community. When you engage with a verified user, you can have
              confidence in their identity, intentions, and the content they share.`}
            </p>
          </div>
          <div className={styles.count}>
            <div className={styles.number}>
              <p className={styles.key}>Amount:</p>
              <p className={styles.value}>12</p>
            </div>
            {tabActive === ETypeTabInfoApp.Members && (
              <Link href={PATHS.AdminManageUsers} className={styles.linkMore}>
                See more
              </Link>
            )}
            {tabActive === ETypeTabInfoApp.Tweets && (
              <Link href={PATHS.AdminManageTweets} className={styles.linkMore}>
                See more
              </Link>
            )}
            {tabActive === ETypeTabInfoApp.Verified && (
              <Link href={PATHS.AdminManageUsers} className={styles.linkMore}>
                See more
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoApp;
