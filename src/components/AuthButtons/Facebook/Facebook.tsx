import React, { useCallback, useState } from "react";
import FacebookLogin, {
  SuccessResponse,
} from "@greatsumini/react-facebook-login";
import styles from "./facebook.module.scss";
import { useAppDispatch } from "@/app/redux/hooks";
import { loginByFacebook } from "@/app/features/auth/authAction";
import { useRouter } from "next/navigation";
import { setError } from "@/app/features/auth/authSlice";

type Props = {
  setLoadingLoginLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};
const Facebook = ({ setLoadingLoginLibrary }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleSuccessLogin = async (response: SuccessResponse) => {
    try {
      const accessToken = {
        access_token: response.accessToken,
      };

      setLoadingLoginLibrary(true);
      const user: any = await dispatch(loginByFacebook(accessToken)).unwrap();

      localStorage.setItem("token", user.token);
      router.replace("/");

      setTimeout(() => {
        setLoadingLoginLibrary(false);
      }, 1000);
    } catch (error) {
      setLoadingLoginLibrary(false);
      dispatch(setError(error));
    }
  };

  return (
    <FacebookLogin
      appId={process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID || ""}
      onSuccess={(res) => handleSuccessLogin(res)}
      onFail={(error) => {
        console.log("Login Failed!", error);
      }}
      render={({ onClick, logout }) => (
        <button
          type="button"
          className={styles.buttonFacebook}
          onClick={onClick}
        >
          <div className={styles.icon}>
            <img src="/icons/Facebook.svg" alt="" />
          </div>
          Login by facebook
        </button>
      )}
    />
  );
};

export default Facebook;
