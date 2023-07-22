/* eslint-disable react/display-name */
import ModalError from "@/components/Modal/ModalError";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { ETypeInputProfile } from "@/components/interfaces";
import {
  getUserById,
  updateUser,
  uploadFilesProfile,
} from "@/features/admin/user/userAction";
import {
  EGender,
  EUserRole,
  IError,
  IPayloadEditProfile,
  IUser,
} from "@/features/interface";
import { useAppDispatch } from "@/redux/hooks";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { AiOutlineLoading } from "react-icons/ai";
import { MdCameraswitch } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import styles from "./formEditUser.module.scss";
import { SelectItemOptionsType } from "primereact/selectitem";

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

  const roles: SelectItemOptionsType = [
    {
      name: "Admin",
    },
    {
      name: "User",
    },
  ];

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
      avatar: user.avatar || null,
      cover: user.cover || null,
      bio: user.bio || "",
      role: user.role || EUserRole.User,
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

        {/* ====== ROLE ====== */}
        <Col xs={12} sm={12} md={6} lg={6}>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Role</Form.Label>
            <Dropdown
              value={{ name: form.values.role }}
              onChange={(e) => form.setFieldValue("role", e.value.name)}
              options={roles}
              optionLabel="name"
              placeholder="Select a role"
              className={styles.formInputRole}
            />
          </Form.Group>
        </Col>
      </Row>

      <div className="d-flex align-items-center justify-content-end w-100 mt-4">
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
