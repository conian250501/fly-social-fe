/* eslint-disable react/display-name */

import { IError, IUser } from "@/features/interface";
import { countAge } from "@/shared/utils";
import React, { useState } from "react";
import { DiCode } from "react-icons/di";
import styles from "./infoList.module.scss";
type Props = {
  user: IUser;
};

const InfoList = React.memo(({ user }: Props) => {
  const [isOpenEditForm, setIsOpenEditForm] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  return (
    <div className={styles.infoUserList}>
      {/* ====== NAME ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Username</h6>
          <p className={styles.value}>{user.name}</p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== NICKNAME ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Nickname</h6>
          <p className={styles.value}>
            {user.nickname ? `@${user.nickname}` : "N/A"}
          </p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== EMAIL ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Email</h6>
          <p className={styles.value}>{user.email ? user.email : "N/A"}</p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== PHONE ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Phone</h6>
          <p className={styles.value}>{user.phone ? user.phone : "N/A"}</p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== COUNTRY ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Country</h6>
          <p className={styles.value}>{user.address ? user.address : "N/A"}</p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== GENDER ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Gender</h6>
          <p className={styles.value}>{user.gender ? user.gender : "N/A"}</p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== BIRTHDAY ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Birth date</h6>
          <p className={styles.value}>
            {user.birthDate ? user.birthDate : "N/A"}
          </p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>

      {/* ====== AGE ====== */}
      <div className={styles.infoItem}>
        <div className={styles.content}>
          <h6 className={styles.text}>Age</h6>
          <p className={styles.value}>
            {user.birthDate ? countAge(user.birthDate) : "N/A"}
          </p>
        </div>
        <div className={styles.iconStart}>
          <DiCode className={styles.icon} />
        </div>
      </div>
    </div>
  );
});

export default InfoList;
