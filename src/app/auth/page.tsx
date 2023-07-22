"use client";
import Facebook from "@/components/AuthButtons/Facebook";
import Github from "@/components/AuthButtons/Github/Github";
import Google from "@/components/AuthButtons/Google/Google";
import Loading from "@/components/Loading/Loading";
import LoginForm from "@/components/Modal/LoginForm/LoginForm";
import SignUpForm from "@/components/Modal/SignUpForm";
import ToastError from "@/components/Toasts/Error/Error";
import { PATHS } from "@/contanst/paths";
import { getUser } from "@/features/auth/authAction";
import { clearError } from "@/features/auth/authSlice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import styles from "./auth.module.scss";

type Props = {};

const Page = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isOpenLogin = searchParams.get("login");
  const isOpenSignUp = searchParams.get("sign-up");

  const dispatch = useAppDispatch();
  const { error, user } = useAppSelector((state: RootState) => state.auth);

  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingLoginLibrary, setLoadingLoginLibrary] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        await dispatch(getUser()).unwrap();
        router.replace(PATHS.Home);
      } catch (error) {
        return error;
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  if (loadingLoginLibrary) {
    return (
      <div className="d-flex align-items-center justify-content-center vw-100 vh-100">
        <Loading />
      </div>
    );
  }

  return (
    <div className={styles.authPage}>
      <div className={`${styles.container}`}>
        <div className={styles.banner}>
          <img src="/images/banner_login.png" alt="" />
        </div>
        <div className={styles.body}>
          <h1 className={styles.heading}>Happening now</h1>
          <p className={styles.description}>Join FLY now today.</p>

          <div className={styles.btnLoginList}>
            <Google
              typePage="User"
              setLoadingLoginLibrary={setLoadingLoginLibrary}
            />
            <Facebook setLoadingLoginLibrary={setLoadingLoginLibrary} />
            <Github
              typePage="User"
              setLoadingLoginLibrary={setLoadingLoginLibrary}
            />

            <button
              className={`${styles.btnAccount} ${styles.login}`}
              onClick={() => router.replace(PATHS.LoginPage)}
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
              onClick={() => router.replace(PATHS.SignUpPage)}
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

      {/* MODAL SIGN UP ACCOUNT EMAIL */}
      <SignUpForm
        show={Boolean(isOpenSignUp)}
        close={() => router.replace(PATHS.Auth)}
        loading={loadingRegister}
        setLoading={setLoadingRegister}
      />

      {/* MODAL SIGN IN ACCOUNT EMAIL */}
      <LoginForm
        show={Boolean(isOpenLogin)}
        close={() => router.replace(PATHS.Auth)}
        loading={loadingLogin}
        setLoading={setLoadingLogin}
      />

      {/* ERROR */}
      {error && (
        <ToastError error={error} onClose={() => dispatch(clearError())} />
      )}
    </div>
  );
};

export default Page;
