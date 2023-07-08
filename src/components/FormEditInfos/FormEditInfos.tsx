import { ETypeInputProfile } from "@/components/interfaces";
import { getUser } from "@/features/auth/authAction";
import { EGender, IError, IUser } from "@/features/interface";
import { updateProfile } from "@/features/user/userAction";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import ReactDatePicker from "react-datepicker";
import { AiOutlineLoading } from "react-icons/ai";
import PhoneInput from "react-phone-input-2";
import ModalError from "../Modal/ModalError";
import ModalSuccess from "../Modal/ModalSuccess";
import BackLink from "../shared/BackLink";
import styles from "./formEditInfos.module.scss";
type Props = {
  user: IUser;
};

const FormEditInfos = ({ user }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [error, setError] = useState<IError | null>(null);
  const [isPhoneFocus, setIsPhoneFocus] = useState<boolean>(false);
  const [loadingSave, setLoadingSave] = useState<boolean>(false);
  const [updateSuccess, setUpdateSuccess] = useState<boolean>(false);
  const [maxLengthInputs, setMaxLengthInput] = useState<{
    name: number;
    nickname: number;
    address: number;
  }>({
    name: 30,
    nickname: 30,
    address: 100,
  });
  const [startDate, setStartDate] = useState<Date | null>(
    user?.birthDate ? new Date(user?.birthDate) : new Date()
  );
  const [focusInput, setFocusInput] = useState<{
    type: ETypeInputProfile | string;
    isFocus: boolean;
  }>({ type: "", isFocus: false });

  const form = useFormik({
    initialValues: {
      name: user.name || "",
      nickname: user.nickname || "",
      phone: user.phone || "",
      address: user.address || "",
      gender: user.gender || EGender.Male,
      birthDate: user.birthDate || "",
    },
    async onSubmit(values, { resetForm }) {
      try {
        setLoadingSave(true);
        await dispatch(
          updateProfile({ id: user.id, payload: values })
        ).unwrap();
        await dispatch(getUser()).unwrap();

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

  return (
    <Form className={styles.formWrapper} onSubmit={form.handleSubmit}>
      <div className={styles.header}>
        <BackLink title="Edit Information" />
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
};

export default FormEditInfos;
