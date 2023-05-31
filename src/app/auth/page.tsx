"use client";
import Facebook from "@/components/AuthButtons/Facebook";
import Google from "@/components/AuthButtons/Google/Google";
import Loading from "@/components/Loading/Loading";
import ToastError from "@/components/Toasts/Error/Error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { getUser, login, register } from "../features/auth/authAction";
import { clearError, setError } from "../features/auth/authSlice";
import { IUser } from "../features/auth/interface";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import styles from "./auth.module.scss";
import Github from "@/components/AuthButtons/Github/Github";
import { PATHS } from "@/contanst/paths";
import Link from "next/link";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state: RootState) => state.auth);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLoginLibrary, setLoadingLoginLibrary] = useState(false);

  const [payloadRegister, setPayloadRegister] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [payloadLogin, setPayloadLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangePayloadRegister = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPayloadRegister({
      ...payloadRegister,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangePayloadLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayloadLogin({
      ...payloadLogin,
      [e.target.name]: e.target.value,
    });
  };
  const handleRegister = async (e: React.SyntheticEvent) => {
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    try {
      e.preventDefault();
      setLoadingRegister(true);

      if (!regex.test(payloadRegister.password)) {
        throw new Error(
          "Password must have 8 character, include number and Uppercase character"
        );
      }

      if (payloadRegister.password !== payloadRegister.passwordConfirm) {
        throw new Error("Password dont match");
      }

      await dispatch(register(payloadRegister)).unwrap();

      setShowRegister(false);
      setShowLogin(true);
      setLoadingRegister(false);
      setPayloadRegister({
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
      });
    } catch (error) {
      setLoadingRegister(false);
      dispatch(setError(error));
      return error;
    }
  };

  const handleLogin = async (e: React.SyntheticEvent) => {
    try {
      e.preventDefault();
      setLoadingLogin(true);

      const user: IUser = await dispatch(login(payloadLogin)).unwrap();

      localStorage.setItem("token", user.token);
      router.push("/");
    } catch (error) {
      setLoadingLogin(false);
      dispatch(setError(error));
      return error;
    }
  };

  return (
    <div>
      <div className={styles.authPage}>
        <div className={`${styles.container}`}>
          <div className={styles.banner}>
            <img src="/images/banner_login.png" alt="" />
          </div>
          <div className={styles.body}>
            <h1 className={styles.heading}>Happening now</h1>
            <p className={styles.description}>Join FLY now today.</p>

            <div className={styles.btnLoginList}>
              <Google setLoadingLoginLibrary={setLoadingLoginLibrary} />
              <Facebook setLoadingLoginLibrary={setLoadingLoginLibrary} />
              <Github setLoadingLoginLibrary={setLoadingLoginLibrary} />

              <button
                className={`${styles.btnAccount} ${styles.login}`}
                onClick={() => setShowLogin(true)}
              >
                Login
              </button>
              <div className={styles.lineDivide}>
                <span></span>
                <p className={styles.text}>Or</p>
                <span></span>
              </div>
              <button
                className={`${styles.btnAccount} ${styles.normal}`}
                onClick={() => setShowRegister(true)}
              >
                Create Account
              </button>
            </div>
            <p className={styles.policyText}>
              By signing up, you agree to the <span>Terms of Service</span>
              and <span>Privacy Policy</span>, including <span>Cookie Use</span>
            </p>
          </div>
        </div>
        {/* )} */}

        {/* MODAL SIGN UP ACCOUNT EMAIL */}
        <Modal
          show={showRegister}
          onHide={() => setShowRegister(false)}
          centered
          contentClassName={styles.modalContent}
        >
          {loadingRegister ? (
            <div className={styles.loadingRegister}>
              <Loading />
            </div>
          ) : (
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
                <Form.Control
                  type="password"
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
                <Form.Text className={styles.descriptionInput}>
                  Password must have 8 character, include number and Uppercase
                  character
                </Form.Text>
              </Form.Group>
              <Form.Group className={styles.formGroup}>
                <Form.Label className={styles.formLabel}>
                  Password Confirm
                </Form.Label>
                <Form.Control
                  type="password"
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
              </Form.Group>
              <button type="submit" className={styles.btnSignIn}>
                Sign up
              </button>
            </Form>
          )}
        </Modal>

        {/* MODAL SIGN IN ACCOUNT EMAIL */}
        <Modal
          show={showLogin}
          onHide={() => setShowLogin(false)}
          centered
          contentClassName={styles.modalContent}
        >
          {loadingLogin ? (
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
                <Form.Control
                  type="text"
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
                <Form.Text className={styles.descriptionInput}>
                  Password must have 8 character
                </Form.Text>
              </Form.Group>
              <button type="submit" className={styles.btnSignIn}>
                Sign in
              </button>
              <Link
                href={PATHS.ForgotPassword}
                className={styles.forgotPassLink}
              >
                Forgot password
              </Link>
            </Form>
          )}
        </Modal>
      </div>

      {/* ERROR */}
      {error && (
        <ToastError error={error} onClose={() => dispatch(clearError())} />
      )}
    </div>
  );
};

export default Page;
