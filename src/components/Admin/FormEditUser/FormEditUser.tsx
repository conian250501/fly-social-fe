/* eslint-disable react/display-name */
import React, { useEffect, useState } from "react";
import styles from "./formEditUser.module.scss";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import {
  getUserById,
  updateUser,
  uploadFilesProfile,
} from "@/features/admin/user/userAction";
import { ProgressSpinner } from "primereact/progressspinner";
import NoneData from "@/components/shared/NoneData/NoneData";
import { useRouter } from "next/navigation";
import {
  EGender,
  IError,
  IPayloadEditProfile,
  IUser,
} from "@/features/interface";
import { ETypeInputProfile } from "@/components/interfaces";
import { useFormik } from "formik";
import { Col, Form, Row } from "react-bootstrap";
import BackLink from "@/components/shared/BackLink";
import { AiOutlineLoading } from "react-icons/ai";
import ReactDatePicker from "react-datepicker";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import ModalError from "@/components/Modal/ModalError";
import PhoneInput from "react-phone-input-2";
import { MdCameraswitch } from "react-icons/md";
type Props = {
  user: IUser;
};

const FormEditUser = React.memo(({ user }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [error, setError] = useState<IError | null>(null);
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [maxLengthInputs, setMaxLengthInput] = useState<{
    name: number;
    nickname: number;
    address: number;
    website: number;
  }>({
    name: 30,
    nickname: 30,
    address: 100,
    website: 100,
  });
  const [startDate, setStartDate] = useState<Date | null>(
    user?.birthDate ? new Date(user?.birthDate) : new Date()
  );
  const [focusInput, setFocusInput] = useState<{
    type: ETypeInputProfile | string;
    isFocus: boolean;
  }>({ type: "", isFocus: false });

  const [imagesPreview, setImagesPreview] = useState<{
    avatar: string;
    cover: string;
  }>({ avatar: "", cover: "" });
  const [isFileChange, setIsFileChange] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setImagesPreview({
        avatar: user.avatar ? user.avatar : "",
        cover: user.cover ? user.cover : "",
      });
    }
  }, []);

  const form = useFormik<IPayloadEditProfile>({
    initialValues: {
      name: user?.name || "",
      nickname: user?.nickname || "",
      phone: user?.phone || "",
      address: user?.address || "",
      gender: user?.gender || EGender.Male,
      birthDate: user?.birthDate || "",
      website: user?.website || "",
      avatar: null,
      cover: null,
      bio: user.bio || "",
    },
    async onSubmit(values, { resetForm }) {
      const formData = new FormData();
      formData.append("avatar", values.avatar as string);
      formData.append("cover", values.cover as string);
      try {
        setLoadingSave(true);
        await dispatch(updateUser({ id: user.id, payload: values })).unwrap();
        if (isFileChange) {
          await dispatch(
            uploadFilesProfile({ id: user.id, files: formData })
          ).unwrap();
        }
        await dispatch(getUserById(Number(user.id))).unwrap();

        setLoadingSave(false);
        setUpdateSuccess(true);
      } catch (error) {
        setLoadingSave(false);
        setError(error as IError);
      }
    },
  });

  const handleFocusInput = (type: ETypeInputProfile) => {
    setFocusInput({ type, isFocus: true });
  };

  const handleChangeCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImagesPreview({
      ...imagesPreview,
      cover: URL.createObjectURL(files[0]),
    });
    form.setFieldValue("cover", files[0]);
    setIsFileChange(true);
  };

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setImagesPreview({
      ...imagesPreview,
      avatar: URL.createObjectURL(files[0]),
    });
    form.setFieldValue("avatar", files[0]);
    setIsFileChange(true);
  };

  return (
    <Form className={styles.formWrapper} onSubmit={form.handleSubmit}>
      <BackLink
        title="Edit Information"
        customClassNameContainer={styles.backLinkContainer}
      />

      {/* ====== AVATAR AND COVER ====== */}
      <Form.Group className={styles.formGroupCover}>
        <div className={styles.background}></div>
        {imagesPreview.cover ? (
          <img
            src={imagesPreview.cover}
            alt=""
            className={styles.coverPreview}
          />
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
          <img
            src={
              imagesPreview.avatar
                ? imagesPreview.avatar
                : "/images/avatar-placeholder.png"
            }
            alt=""
            className={styles.avatarPreview}
          />

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

      <Row className={styles.formRow}>
        {/* ====== NAME ====== */}
        <Col xs={12} sm={12} md={6} lg={6}>
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
        </Col>

        {/*====== NICKNAME ====== */}
        <Col xs={12} sm={12} md={6} lg={6}>
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
        </Col>

        {/*====== WEBSITE  ======*/}
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Website</Form.Label>
            <Form.Control
              value={form.values.website}
              onChange={form.handleChange}
              name="website"
              type="text"
              maxLength={maxLengthInputs.website}
              className={styles.formInput}
              onFocus={() => handleFocusInput(ETypeInputProfile.Website)}
              onBlur={() => setFocusInput({ type: "", isFocus: false })}
            />
            {focusInput.type === ETypeInputProfile.Website && (
              <p className={styles.countValueInput}>
                {form.values.website?.length} / {maxLengthInputs.website}
              </p>
            )}
          </Form.Group>
        </Col>

        {/*====== PHONE  ======*/}
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Phone</Form.Label>
            <PhoneInput
              inputProps={{
                name: "phone",
                required: true,
                autoFocus: true,
              }}
              country="vn"
              value={form.values.phone}
              onFocus={() => setIsPhoneFocus(true)}
              onBlur={() => setIsPhoneFocus(false)}
              onChange={(value, data) => {
                form.setFieldValue("phone", `+${value}`);
              }}
              containerClass={`${styles.phoneInputWrapper} ${styles.phone} ${
                isPhoneFocus ? styles.focus : ""
              }`}
              inputClass={styles.input}
            />
          </Form.Group>
        </Col>

        {/*====== ADDRESS ====== */}
        <Col xs={12} sm={12} md={6} lg={6}>
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
        </Col>

        {/*====== BIRTH DATE ====== */}
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Birth Date</Form.Label>
            <ReactDatePicker
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
        </Col>

        {/*====== GENDER  ======*/}
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Gender</Form.Label>
            <div className="d-flex align-items-center justify-content-start gap-4">
              <Form.Check
                type="radio"
                className={styles.inputGender}
                name="gender"
                checked={form.values.gender === EGender.Male}
                onChange={() => form.setFieldValue("gender", EGender.Male)}
                label="Male"
              />
              <Form.Check
                type="radio"
                className={styles.inputGender}
                name="gender"
                checked={form.values.gender === EGender.Female}
                onChange={() => form.setFieldValue("gender", EGender.Female)}
                label="Female"
              />
              <Form.Check
                type="radio"
                className={styles.inputGender}
                name="gender"
                checked={form.values.gender === EGender.Other}
                onChange={() => form.setFieldValue("gender", EGender.Other)}
                label="Other"
              />
            </div>
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex align-items-center justify-content-end w-100">
        <button
          type="submit"
          className={`${styles.btn} ${styles.save}`}
          disabled={loadingSave}
        >
          {loadingSave ? (
            <AiOutlineLoading className={styles.iconLoading} />
          ) : (
            "Save"
          )}
        </button>
      </div>

      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}

      <ModalSuccess
        isOpen={updateSuccess}
        handleClose={() => setUpdateSuccess(false)}
        message="Updated information successfully"
      />
    </Form>
  );
});

export default FormEditUser;
