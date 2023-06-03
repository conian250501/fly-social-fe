"use client";
import Facebook from "@/components/AuthButtons/Facebook";
import Google from "@/components/AuthButtons/Google/Google";
import Loading from "@/components/Loading/Loading";
import ToastError from "@/components/Toasts/Error/Error";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { getUser, login, register } from "../features/auth/authAction";
import { clearError, setError } from "../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { RootState } from "../redux/store";
import styles from "./auth.module.scss";
import Github from "@/components/AuthButtons/Github/Github";
import { PATHS } from "@/contanst/paths";
import Link from "next/link";
import { regexPassword } from "@/contanst/regexs";
import { IUser } from "../features/interface";
import SignUpForm from "@/components/Modal/SignUpForm";
import LoginForm from "@/components/Modal/LoginForm/LoginForm";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state: RootState) => state.auth);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLoginLibrary, setLoadingLoginLibrary] = useState(false);

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
        <SignUpForm
          show={showRegister}
          close={() => setShowRegister(false)}
          loading={loadingRegister}
          setLoading={setLoadingRegister}
        />

        {/* MODAL SIGN IN ACCOUNT EMAIL */}
        <LoginForm
          show={showLogin}
          close={() => setShowLogin(false)}
          loading={loadingLogin}
          setLoading={setLoadingLogin}
        />
      </div>

      {/* ERROR */}
      {error && (
        <ToastError error={error} onClose={() => dispatch(clearError())} />
      )}
    </div>
  );
};

export default Page;
