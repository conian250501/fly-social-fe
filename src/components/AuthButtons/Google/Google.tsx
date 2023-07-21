import { loginByGoogle } from "@/features/auth/authAction";
import { setError } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./google.module.scss";
type Props = {
  setLoadingLoginLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};

const Google = ({ setLoadingLoginLibrary }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = {
          access_token: tokenResponse.access_token,
        };

        setLoadingLoginLibrary(true);
        const user: any = await dispatch(loginByGoogle(accessToken)).unwrap();

        localStorage.setItem("token", user.token);
        router.replace("/");
      } catch (error) {
        setLoadingLoginLibrary(false);
        dispatch(setError(error));
      }
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <button
      type="button"
      className={styles.buttonGoogle}
      onClick={() => handleLoginGoogle()}
    >
      <div className={styles.icon}>
        <img src="/icons/Google.svg" alt="" />
      </div>
      Sign in by google
    </button>
  );
};

export default Google;
