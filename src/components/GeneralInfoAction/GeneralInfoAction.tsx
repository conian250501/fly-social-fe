/* eslint-disable react/display-name */
import React, { useState } from "react";
import styles from "./generalInfoAction.module.scss";
import QRCode from "qrcode";
import { PATHS } from "@/contanst/paths";
import QrCode from "../Modal/QrCode";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";
import { Col, Row } from "react-bootstrap";
import ProfileContact from "../Modal/ProfileContact";
import { IUser } from "@/features/interface";

type Props = {
  user: IUser;
};

const GeneralInfoAction = React.memo(({ user }: Props) => {
  const { isMe } = useCheckIsMe(user.id);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [loadingQrCode, setLoadingQrCode] = useState<boolean>(false);
  const [openQrCode, setOpenQrCode] = useState<boolean>(false);
  const [openContact, setOpenContact] = useState<boolean>(false);
  const [urlProfile, setUrlProfile] = useState<string>(
    `${process.env.NEXT_PUBLIC_CLIENT_URL}${PATHS.Profile}/${user.id}`
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
    <div className={`${styles.wrapper}`}>
      <Row className="g-3">
        {isMe && (
          <Col xs={12} sm={12} md={4}>
            <div className={`${styles.btn} ${styles.verifyRequest}`}>
              Request verified
            </div>
          </Col>
        )}
        <Col xs={6} sm={6} md={isMe ? 4 : 6}>
          <div
            className={`${styles.btn} ${styles.shareProfile}`}
            onClick={() => handleGeneralQrCode(urlProfile)}
          >
            Share profile
          </div>
        </Col>
        <Col xs={6} sm={6} md={isMe ? 4 : 6}>
          <div
            className={`${styles.btn} ${styles.contact}`}
            onClick={() => setOpenContact(!openContact)}
          >
            Contact
          </div>
        </Col>
      </Row>

      {/* ====== MODALS ======= */}
      <QrCode
        url={urlProfile}
        qrCodeUrl={qrCodeUrl}
        isOpen={openQrCode}
        handleClose={() => setOpenQrCode(false)}
      />
      <ProfileContact
        isOpen={openContact}
        handleClose={() => setOpenContact(false)}
        data={{ phone: user.phone, email: user.email, userId: user.id }}
      />
    </div>
  );
});

export default GeneralInfoAction;
