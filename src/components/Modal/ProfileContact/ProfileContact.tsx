/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from "./profileContact.module.scss";
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import { nanoid } from "@reduxjs/toolkit";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CgClose } from "react-icons/cg";

export enum ETypeInfo {
  Phone = "Phone",
  Email = "Email",
}

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  data: {
    phone: string;
    email: string;
  };
};

const ProfileContact = React.memo(({ isOpen, handleClose, data }: Props) => {
  const [infos, setInfos] = useState<
    { id: string; title: ETypeInfo; content: string; icon: React.ReactNode }[]
  >([
    {
      id: nanoid(),
      title: ETypeInfo.Phone,
      content: data.phone,
      icon: <BsFillPhoneVibrateFill className={styles.icon} />,
    },
    {
      id: nanoid(),
      content: data.email,
      title: ETypeInfo.Email,
      icon: <MdOutlineAlternateEmail className={styles.icon} />,
    },
  ]);
  return (
    <Dialog
      header={<h1 className={styles.heading}>Contact infos</h1>}
      visible={isOpen}
      position={"bottom"}
      style={{ width: "50vw" }}
      headerClassName={styles.header}
      contentClassName={styles.contactWrapper}
      className={styles.wrapper}
      onHide={handleClose}
      draggable={true}
      breakpoints={{ "1440px": "50vw", "960px": "50vw", "641px": "100vw" }}
      resizable={false}
      dismissableMask={true}
      closable={false}
    >
      <div className={styles.iconClose} onClick={handleClose}>
        <CgClose className={styles.icon} />
      </div>
      <div className={styles.contactList}>
        {infos.map((info) => (
          <div className={styles.contactItem} key={info.id}>
            <div className="d-flex align-items-center justify-content-start">
              <div className={styles.iconWrapper}>{info.icon}</div>
              <p className={styles.content}>
                {info.content ? info.content : "N/A"}
              </p>
            </div>
            {info.title === ETypeInfo.Phone && (
              <button type="button" className={styles.btnEdit}>
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
});

export default ProfileContact;
