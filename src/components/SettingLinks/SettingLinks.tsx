import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineKey } from "react-icons/hi";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { BsHeartbreak } from "react-icons/bs";
import { HiOutlineChevronRight } from "react-icons/hi";
import styles from "./settingLinks.module.scss";
import Link from "next/link";
import { BiArchive } from "react-icons/bi";
type Props = {};

const SettingLinks = (props: Props) => {
  const [links, setLinks] = useState<
    {
      id: string;
      title: string;
      subtitle: string;
      path: string;
      icon: React.ReactNode;
    }[]
  >([
    {
      id: nanoid(),
      title: "Account information",
      subtitle:
        "See your account information like your phone number and email address.",
      icon: <AiOutlineUser className={styles.icon} />,
      path: PATHS.SettingAccount,
    },
    {
      id: nanoid(),
      title: "Change your password",
      subtitle: "Change your password at any time.",
      icon: <HiOutlineKey className={styles.icon} />,
      path: PATHS.SettingChangePwd,
    },
    {
      id: nanoid(),
      title: "Privacy and Safety",
      subtitle: "Privacy and safety for your account",
      icon: <MdOutlinePrivacyTip className={styles.icon} />,
      path: PATHS.SettingPrivacy,
    },
    {
      id: nanoid(),
      title: "Fly social blue",
      subtitle: "Send a request to verified your account",
      icon: <TiTick className={styles.icon} />,
      path: PATHS.SettingFlySocialBlue,
    },
    {
      id: nanoid(),
      title: "Tweet Archived",
      subtitle: "All tweet you set to archived",
      icon: <BiArchive className={styles.icon} />,
      path: PATHS.SettingDeactivateAccount,
    },
    {
      id: nanoid(),
      title: "Deactivate account",
      subtitle: "You don't want another user see you?",
      icon: <BsHeartbreak className={styles.icon} />,
      path: PATHS.SettingDeactivateAccount,
    },
  ]);
  return (
    <div className={styles.wrapper}>
      {links.map((link) => (
        <Link href={link.path} key={link.id} className={styles.linkItem}>
          <div className="d-flex align-items-center justify-content-start gap-4">
            <div className={styles.iconWrapper}>{link.icon}</div>
            <div className={styles.content}>
              <h6 className={styles.title}>{link.title}</h6>
              <p className={styles.subtitle}>{link.subtitle}</p>
            </div>
          </div>
          <div className={styles.iconRight}>
            <HiOutlineChevronRight className={styles.icon} />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SettingLinks;
