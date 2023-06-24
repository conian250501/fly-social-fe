import React, { useState } from "react";
import styles from "./signUpForm.module.scss";
import { Form, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { register } from "@/features/auth/authAction";
import { setError } from "@/features/auth/authSlice";
import { regexPassword } from "@/contanst/regexs";
import Loading from "@/components/Loading";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";
import { PATHS } from "@/contanst/paths";
type Props = {
  show: boolean;
  close: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUpForm = ({ show, close, loading, setLoading }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [payloadRegister, setPayloadRegister] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePayloadRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayloadRegister({
      ...payloadRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      if (!regexPassword.test(payloadRegister.password)) {
        throw new Error(
          "Password must have 8 character, include number and Uppercase character"
        );
      }

      if (payloadRegister.password !== payloadRegister.passwordConfirm) {
        throw new Error("Password don't match");
      }

      await dispatch(register(payloadRegister)).unwrap();

      close();
      router.replace(PATHS.LoginPage);
      setPayloadRegister({
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      dispatch(setError(error));
      return error;
    }
  };
  return (
    <Modal
      show={show}
      onHide={close}
      centered
      contentClassName={styles.modalContent}
    >
      <Form className={styles.formLogin} onSubmit={handleRegister}>
        <div className={styles.heading}>Create Account</div>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Name</Form.Label>
          <Form.Control
            type="text"
            className={styles.formInput}
            placeholder="enter your name"
            value={payloadRegister.name}
            name="name"
            onChange={(e) =>
              handleChangePayloadRegister(
                e as React.ChangeEvent<HTMLInputElement>
              )
            }
            required
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Email</Form.Label>
          <Form.Control
            type="email"
            className={styles.formInput}
            placeholder="enter your email"
            value={payloadRegister.email}
            required
            name="email"
            onChange={(e) =>
              handleChangePayloadRegister(
                e as React.ChangeEvent<HTMLInputElement>
              )
            }
          />
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Password</Form.Label>
          <div className={styles.inputGroupPassword}>
            <Form.Control
              type={showPassword ? "text" : "password"}
              className={styles.formInput}
              placeholder="********"
              value={payloadRegister.password}
              required
              name="password"
              onChange={(e) =>
                handleChangePayloadRegister(
                  e as React.ChangeEvent<HTMLInputElement>
                )
              }
            />
            <div
              className={styles.iconEye}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className={styles.icon} />
              ) : (
                <AiOutlineEye className={styles.icon} />
              )}
            </div>
          </div>
          <Form.Text className={styles.descriptionInput}>
            Password must have 8 character, include number and Uppercase
            character
          </Form.Text>
        </Form.Group>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>Password Confirm</Form.Label>
          <div className={styles.inputGroupPassword}>
            <Form.Control
              type={showConfirmPassword ? "text" : "password"}
              className={styles.formInput}
              placeholder="********"
              value={payloadRegister.passwordConfirm}
              required
              name="passwordConfirm"
              onChange={(e) =>
                handleChangePayloadRegister(
                  e as React.ChangeEvent<HTMLInputElement>
                )
              }
            />
            <div
              className={styles.iconEye}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible className={styles.icon} />
              ) : (
                <AiOutlineEye className={styles.icon} />
              )}
            </div>
          </div>
        </Form.Group>
        <button type="submit" className={styles.btnSignIn} disabled={loading}>
          {loading ? (
            <AiOutlineLoading className={styles.iconLoading} />
          ) : (
            "Sign up"
          )}
        </button>
      </Form>
    </Modal>
  );
};

export default SignUpForm;
