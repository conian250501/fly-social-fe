import React, { useState } from "react";
import styles from "./userDetail.module.scss";
import { IUser } from "@/features/interface";
import { Col, Row } from "react-bootstrap";
import Link from "next/link";
import { nanoid } from "@reduxjs/toolkit";
import {
  FaHandsWash,
  FaReact,
  FaRegHandshake,
  FaVoicemail,
} from "react-icons/fa";
import ButtonsManage from "../ButtonsManage/ButtonsManage";
import { PATHS } from "@/contanst/paths";

type Props = {
  user: IUser;
};

const UserDetail = ({ user }: Props) => {
  const [infoMoreList, setInfoMoreList] = useState<
    { id: string; icon: React.ReactNode; title: string; content: string }[]
  >([
    {
      id: nanoid(),
      icon: <FaVoicemail className={styles.icon} />,
      title: "Email",
      content: user.email || "N/A",
    },
    {
      id: nanoid(),
      icon: <FaRegHandshake className={styles.icon} />,
      title: "Followers",
      content: user.followers.length.toString(),
    },
    {
      id: nanoid(),
      icon: <FaHandsWash className={styles.icon} />,
      title: "Following",
      content: user.followings.length.toString(),
    },
    {
      id: nanoid(),
      icon: <FaReact className={styles.icon} />,
      title: "Tweets",
      content: user.tweets.length.toString(),
    },
  ]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.topInfo}>
        <div className={styles.cover}>
          {user.cover ? (
            <img src={user.cover} alt="" className={styles.coverImg} />
          ) : (
            <div className={styles.placeholderCover}></div>
          )}
        </div>
        <div className={styles.avatar}>
          <img
            src={user.avatar ? user.avatar : "/images/avatar-placeholder.png"}
            alt=""
            className={styles.avatarImg}
          />
          {!user.verified && (
            <img
              src="/icons/twitter-verified-badge.svg"
              alt=""
              className={styles.iconVerified}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className="d-flex align-items-center justify-content-between">
            <h1 className={styles.name}>{user.name}</h1>
            <ButtonsManage link={`${PATHS.AdminManageUserEdit}/${user.id}`} />
          </div>
          <p className={styles.nickname}>
            {user.nickname ? `@${user.nickname}` : "N/A"}
          </p>

          {/*====== INFORMATION DETAIL =======  */}
          <Row className={`${styles.detailList} g-4`}>
            {/* ======= BIO ======= */}
            <Col xs={12} sm={12} md={6} lg={3}>
              <div className={styles.detailItem}>
                <div className={styles.key}>Bio</div>
                <div className={styles.value}>
                  {user.bio ? user.bio : "N/A"}
                </div>
              </div>
            </Col>

            {/* ====== WEBSITE ====== */}
            <Col xs={12} sm={12} md={6} lg={3}>
              <div className={styles.detailItem}>
                <div className={styles.key}>Website</div>
                <Link
                  href={user.website ? `https://${user.website}` : "#"}
                  target="_blank"
                  className={styles.value}
                >
                  {user.website ? user.website : "N/A"}
                </Link>
              </div>
            </Col>

            {/* ====== ADDRESS ====== */}
            <Col xs={12} sm={12} md={6} lg={3}>
              <div className={styles.detailItem}>
                <div className={styles.key}>Address</div>
                <div className={styles.value}>
                  {user.address ? user.address : "N/A"}
                </div>
              </div>
            </Col>

            {/* ====== PHONE ====== */}
            <Col xs={12} sm={12} md={6} lg={3}>
              <div className={styles.detailItem}>
                <div className={styles.key}>Phone number</div>
                <div className={styles.value}>
                  {user.phone ? user.phone : "N/A"}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      {/* ====== INFORMATION MORE ====== */}
      <Row className={`g-4 ${styles.infoMoreList}`}>
        {infoMoreList.map((item) => (
          <Col key={item.id} xs={12} sm={12} md={6} lg={3}>
            <div className={styles.infoMoreItem}>
              {item.icon}
              <div className={styles.content}>
                <p className={styles.text}>{item.content}</p>
                <h4 className={styles.title}>{item.title}</h4>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default UserDetail;
