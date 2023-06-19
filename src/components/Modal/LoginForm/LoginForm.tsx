/* eslint-disable react/display-name */
import React, { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Loading from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { IUser } from "@/features/interface";
import { PATHS } from "@/contanst/paths";
import { setError } from "@/features/auth/authSlice";
import Link from "next/link";
import { login } from "@/features/auth/authAction";
import styles from "./loginForm.module.scss";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {
  show: boolean;
  close: () => void;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoginForm = React.memo(({ show, close, loading, setLoading }: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [payloadLogin, setPayloadLogin] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangePayloadLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadLogin({
      ...payloadLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoading(true);

      const user: IUser = await dispatch(login(payloadLogin)).unwrap();
      setLoading(false);
      localStorage.setItem("token", user.token);
      close();
      router.replace(PATHS.Home);
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
      {loading ? (
        <div className={styles.loadingLogin}>
          <Loading />
        </div>
      ) : (
        <Form className={styles.formLogin} onSubmit={handleLogin}>
          <div className={styles.heading}>Create Account</div>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Email</Form.Label>
            <Form.Control
              type="text"
              className={styles.formInput}
              placeholder="enter your email"
              value={payloadLogin.email}
              required
              name="email"
              onChange={(e) =>
                handleChangePayloadLogin(
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
                value={payloadLogin.password}
                required
                name="password"
                onChange={(e) =>
                  handleChangePayloadLogin(
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
              Password must have 8 character
            </Form.Text>
          </Form.Group>
          <button type="submit" className={styles.btnSignIn}>
            Sign in
          </button>
          <Link href={PATHS.ForgotPassword} className={styles.forgotPassLink}>
            Forgot password
          </Link>
        </Form>
      )}
    </Modal>
  );
});

export default LoginForm;
