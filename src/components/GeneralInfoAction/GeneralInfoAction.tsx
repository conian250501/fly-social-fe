import React, { useState } from "react";
import styles from "./generalInfoAction.module.scss";
import QRCode from "qrcode";
import { PATHS } from "@/contanst/paths";
import QrCode from "../Modal/QrCode";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";

type Props = {
  userId: number;
};

const GeneralInfoAction = ({ userId }: Props) => {
  const { isMe } = useCheckIsMe(userId);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loadingQrCode, setLoadingQrCode] = useState<boolean>(false);
  const [openModalQrCode, setOpenQrCode] = useState<boolean>(false);
  const [urlProfile, setUrlProfile] = useState<string>(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}${PATHS.Profile}/${userId}`
  );
  const handleGeneralQrCode = async (url: string) => {
    try {
      setLoadingQrCode(true);
      const qrCode = await QRCode.toDataURL(url);
      setOpenQrCode(true);
      setQrCodeUrl(qrCode);
      setLoadingQrCode(false);
    } catch (error) {
      setLoadingQrCode(false);
    }
  };
  return (
    <div className={styles.wrapper}>
      {isMe && (
        <div className={`${styles.btn} ${styles.verifyRequest}`}>
          Request verified
        </div>
      )}
      <div
        className={`${styles.btn} ${styles.shareProfile}`}
        onClick={() => handleGeneralQrCode(urlProfile)}
      >
        Share profile
      </div>
      <div className={`${styles.btn} ${styles.contact}`}>Contact</div>

      <QrCode
        url={urlProfile}
        qrCodeUrl={qrCodeUrl}
        isOpen={openModalQrCode}
        handleClose={() => setOpenQrCode(false)}
      />
    </div>
  );
};

export default GeneralInfoAction;
