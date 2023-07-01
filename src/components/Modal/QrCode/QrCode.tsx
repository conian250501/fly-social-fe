import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { AiOutlineLink, AiOutlineShareAlt } from "react-icons/ai";
import { BsCheckLg } from "react-icons/bs";
import styles from "./qrCode.module.scss";
type Props = {
  url: string;
  qrCodeUrl: string;
  isOpen: boolean;
  handleClose: () => void;
};

const QrCode = ({ url, isOpen, handleClose, qrCodeUrl }: Props) => {
  const [value, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (value) {
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } else {
      setIsCopied(false);
    }
  }, [value]);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } else {
      setIsCopied(false);
    }
  }, [isCopied]);
  console.log({ isCopied, value });

  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      contentClassName={styles.contentModal}
    >
      <div className={styles.wrapper}>
        <div className={styles.qrCodeImg}>
          <img src={qrCodeUrl} alt="" />
        </div>
        <div className={styles.btnList}>
          <div className={`${styles.btnItem} ${styles.shareLink}`}>
            <AiOutlineShareAlt className={styles.icon} />
            <span>Share link</span>
          </div>

          <div
            className={`${styles.btnItem} ${styles.copyClipBoard}`}
            onClick={() => {
              copy(url);
              setIsCopied(true);
            }}
          >
            {isCopied ? (
              <BsCheckLg className={styles.iconCheck} />
            ) : (
              <>
                <AiOutlineLink className={styles.icon} />
                <span>Copy link</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default QrCode;
