/* eslint-disable react/display-name */
import { IError, IPayloadEditProfile, IUser } from "@/app/features/interface";
import { ETypeInputProfile } from "@/components/interfaces";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineLoading } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { MdCameraswitch } from "react-icons/md";
import styles from "./formEditProfile.module.scss";
import DatePicker from "react-datepicker";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
  user: IUser;
};

const FormEditProfile = React.memo(({ isOpen, handleClose, user }: Props) => {
  const [coverPreview, setCoverPreview] = useState<string>(user.cover);
  const [avatarPreview, setAvatarPreview] = useState<string>(user.avatar);

  const [error, setError] = useState<IError | null>(null);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [isFileChange, setIsFileChange] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(
    user.birthDate ? new Date(user.birthDate) : new Date()
  );
  const [maxLengthInputs, setMaxLengthInput] = useState<{
    name: number;
    nickname: number;
    address: number;
    bio: number;
    website: number;
  }>({
    name: 30,
    nickname: 30,
    bio: 160,
    address: 100,
    website: 100,
  });

  const [focusInput, setFocusInput] = useState<{
    type: ETypeInputProfile | string;
    isFocus: boolean;
  }>({ type: "", isFocus: false });

  const form = useFormik<IPayloadEditProfile>({
    initialValues: {
      cover: user.cover || "",
      avatar: user.avatar || "",
      name: user.name || "",
      nickname: user.nickname || "",
      bio: user.bio || "",
      address: user.address || "",
      website: user.website || "",
      birthDate: user.birthDate || "",
    },
    async onSubmit(values, { resetForm }) {
      try {
        console.log({ values });
      } catch (error) {
        setError(error as IError);
        return error;
      }
    },
  });

  const handleFocusInput = (type: ETypeInputProfile) => {
    setFocusInput({ type, isFocus: true });
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setCoverPreview(URL.createObjectURL(files[0]));
    form.setFieldValue("cover", files[0]);
    setIsFileChange(true);
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setAvatarPreview(URL.createObjectURL(files[0]));
    form.setFieldValue("avatar", files[0]);
    setIsFileChange(true);
  };
  return (
    <Modal
      show={isOpen}
      onHide={handleClose}
      centered
      contentClassName={styles.contentModal}
    >
      <Form className={styles.form} onSubmit={form.handleSubmit}>
        <div className={styles.header}>
          <div className="d-flex align-items-center justify-content-start gap-4">
            <div className={styles.iconClose} onClick={handleClose}>
              <IoMdClose className={styles.icon} />
            </div>
            <h4 className={styles.title}>Edit profile</h4>
          </div>
          <button
            type="submit"
            className={styles.btnSave}
            disabled={loadingSave}
          >
            {loadingSave ? (
              <AiOutlineLoading className={styles.iconLoading} />
            ) : (
              "Save"
            )}
          </button>
        </div>

        {/*====== COVER ====== */}
        <Form.Group className={styles.formGroupCover}>
          {coverPreview ? (
            <img src={coverPreview} alt="" className={styles.coverPreview} />
          ) : (
            <div className={styles.coverPlaceholder}></div>
          )}
          <Form.Label htmlFor="input-cover" className={styles.iconCamera}>
            <MdCameraswitch className={styles.icon} />
          </Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            id="input-cover"
            hidden
            onChange={handleChangeCover}
          />
        </Form.Group>

        {/*====== AVATAR ====== */}
        <Form.Group className={styles.formGroupAvatar}>
          <div className={styles.avatarPreviewWrapper}>
            {avatarPreview && (
              <img
                src={
                  avatarPreview
                    ? avatarPreview
                    : "/images/avatar-placeholder.png"
                }
                alt=""
                className={styles.avatarPreview}
              />
            )}
            <div className={styles.background}></div>
            <Form.Label htmlFor="input-avatar" className={styles.iconCamera}>
              <MdCameraswitch className={styles.icon} />
            </Form.Label>
          </div>
          <Form.Control
            type="file"
            accept="image/*"
            id="input-avatar"
            hidden
            onChange={handleChangeAvatar}
          />
        </Form.Group>

        {/*====== NAME ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Name</Form.Label>
          <Form.Control
            value={form.values.name}
            onChange={form.handleChange}
            name="name"
            type="text"
            maxLength={maxLengthInputs.name}
            className={styles.formInput}
            onFocus={() => handleFocusInput(ETypeInputProfile.Name)}
            onBlur={() => setFocusInput({ type: "", isFocus: false })}
          />
          {focusInput.type === ETypeInputProfile.Name && (
            <p className={styles.countValueInput}>
              {form.values.name.length} / {maxLengthInputs.name}
            </p>
          )}
        </Form.Group>

        {/*====== NICKNAME ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Nickname</Form.Label>
          <Form.Control
            value={form.values.nickname}
            onChange={form.handleChange}
            name="nickname"
            type="text"
            maxLength={maxLengthInputs.nickname}
            className={styles.formInput}
            onFocus={() => handleFocusInput(ETypeInputProfile.Nickname)}
            onBlur={() => setFocusInput({ type: "", isFocus: false })}
          />
          {focusInput.type === ETypeInputProfile.Nickname && (
            <p className={styles.countValueInput}>
              {form.values.nickname.length} / {maxLengthInputs.nickname}
            </p>
          )}
        </Form.Group>

        {/*====== BIO ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Bio</Form.Label>
          <Form.Control
            value={form.values.bio}
            onChange={form.handleChange}
            name="bio"
            type="text"
            as="textarea"
            className={styles.formInput}
            maxLength={maxLengthInputs.bio}
            onFocus={() => handleFocusInput(ETypeInputProfile.Bio)}
            onBlur={() => setFocusInput({ type: "", isFocus: false })}
          />
          {focusInput.type === ETypeInputProfile.Bio && (
            <p className={styles.countValueInput}>
              {form.values.bio.length} / {maxLengthInputs.bio}
            </p>
          )}
        </Form.Group>

        {/*====== ADDRESS ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Location</Form.Label>
          <Form.Control
            value={form.values.address}
            onChange={form.handleChange}
            name="address"
            type="text"
            className={styles.formInput}
            maxLength={maxLengthInputs.address}
            onFocus={() => handleFocusInput(ETypeInputProfile.Address)}
            onBlur={() => setFocusInput({ type: "", isFocus: false })}
          />
          {focusInput.type === ETypeInputProfile.Address && (
            <p className={styles.countValueInput}>
              {form.values.address.length} / {maxLengthInputs.address}
            </p>
          )}
        </Form.Group>

        {/*====== WEBSITE ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Website</Form.Label>
          <Form.Control
            value={form.values.website}
            onChange={form.handleChange}
            name="website"
            type="text"
            className={styles.formInput}
            onFocus={() => handleFocusInput(ETypeInputProfile.Website)}
            onBlur={() => setFocusInput({ type: "", isFocus: false })}
          />
          {focusInput.type === ETypeInputProfile.Website && (
            <p className={styles.countValueInput}>
              {form.values.website.length} / {maxLengthInputs.website}
            </p>
          )}
        </Form.Group>

        {/*====== BIRTH DATE ====== */}
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Birth Date</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => {
              form.setFieldValue("birthDate", date);
              setStartDate(date);
            }}
            className={`${styles.formInput} w-100`}
            wrapperClassName={"w-100"}
            dropdownMode="select"
          />
        </Form.Group>
      </Form>
    </Modal>
  );
});

export default FormEditProfile;
