/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import styles from "./profileContact.module.scss";
import { BsFillPhoneVibrateFill } from "react-icons/bs";
import { nanoid } from "@reduxjs/toolkit";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { CgClose } from "react-icons/cg";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { IError, IPayloadEditProfile } from "@/features/interface";
import { useAppDispatch } from "@/redux/hooks";
import { getUserById, updateProfile } from "@/features/user/userAction";
import { AiOutlineLoading } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import { getUser } from "@/features/auth/authAction";
import { formatPhoneNumber } from "@/shared/utils";
import { useCheckIsMe } from "@/hooks/useCheckIsMe";

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
    userId: number;
  };
};

const ProfileContact = React.memo(({ isOpen, handleClose, data }: Props) => {
  const dispatch = useAppDispatch();
  const { isMe } = useCheckIsMe(data.userId);
  const [infos, setInfos] = useState<
    { id: string; title: ETypeInfo; content: string; icon: React.ReactNode }[]
  >([]);
  const [openEditPhone, setOpenEditPhone] = useState<boolean>(false);
  const [loadingUpdatePhone, setLoadingUpdatePhone] = useState<boolean>(false);
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);

  useEffect(() => {
    setInfos([
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
  }, [data]);

  const handleSubmit = async (values: { phone: string }) => {
    try {
      setLoadingUpdatePhone(true);
      await dispatch(
        updateProfile({
          id: data.userId,
          payload: values as IPayloadEditProfile,
        })
      ).unwrap();

      await dispatch(getUserById(data.userId)).unwrap();

      setLoadingUpdatePhone(false);
      setOpenEditPhone(false);
    } catch (error) {
      setLoadingUpdatePhone(false);
      setError(error as IError);
    }
  };

  const form = useFormik({
    initialValues: {
      phone: data.phone,
    },
    onSubmit(values, formikHelpers) {
      handleSubmit(values);
    },
  });
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

              {openEditPhone && info.title === ETypeInfo.Phone ? (
                <Form onSubmit={form.handleSubmit} className={styles.form}>
                  <PhoneInput
                    inputProps={{
                      name: "phone",
                      required: true,
                      autoFocus: true,
                    }}
                    country="vn"
                    onFocus={() => setIsPhoneFocus(true)}
                    onBlur={() => setIsPhoneFocus(false)}
                    value={form.values.phone}
                    onChange={(value, data) => {
                      form.setFieldValue("phone", `+${value}`);
                    }}
                    containerClass={`${styles.phoneInputWrapper} ${
                      styles.phone
                    } ${isPhoneFocus ? styles.focus : ""}`}
                    inputClass={styles.input}
                  />
                </Form>
              ) : (
                <p className={styles.content}>
                  {info.content ? info.content : "N/A"}
                </p>
              )}
            </div>
            {info.title === ETypeInfo.Phone && isMe && (
              <>
                {openEditPhone ? (
                  <button
                    type="button"
                    className={styles.btnEdit}
                    onClick={() => handleSubmit(form.values)}
                    disabled={loadingUpdatePhone}
                  >
                    {loadingUpdatePhone ? (
                      <AiOutlineLoading className={styles.iconLoading} />
                    ) : (
                      "Save"
                    )}
                  </button>
                ) : (
                  <button
                    type="button"
                    className={styles.btnEdit}
                    onClick={() => setOpenEditPhone(true)}
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </Dialog>
  );
});

export default ProfileContact;
