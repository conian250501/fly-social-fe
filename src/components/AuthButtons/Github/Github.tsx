/* eslint-disable react/display-name */
import {
  getAccessTokenGithub,
  loginByGithub,
} from "@/app/features/auth/authAction";
import { setError } from "@/app/features/auth/authSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./github.module.scss";
import { PATHS } from "@/contanst/paths";

type Props = {
  setLoadingLoginLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

const Github = React.memo(({ setLoadingLoginLibrary }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const url = useSearchParams();
  const code = url.get("code");

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        setLoadingLoginLibrary(true);
        const token = await dispatch(
          getAccessTokenGithub(code as string)
        ).unwrap();
        router.replace(PATHS.Auth);
        const user = await dispatch(
          loginByGithub({ access_token: token })
        ).unwrap();
        localStorage.setItem("token", user.token);
        router.replace("/");

        setLoadingLoginLibrary(false);
      } catch (error) {
        setLoadingLoginLibrary(false);
        setError(error);
      }
    };
    if (code) {
      getAccessToken();
    }
  }, [code, dispatch]);

  const handleLoginGithub = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`
    );
  };
  return (
    <button
      type="button"
      className={styles.buttonGithub}
      onClick={handleLoginGithub}
    >
      <div className={styles.icon}>
        <img src="/icons/Github.svg" alt="" />
      </div>
      Sign in by github
    </button>
  );
});

export default Github;
