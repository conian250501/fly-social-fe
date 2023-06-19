import { loginByFacebook } from "@/features/auth/authAction";
import { setError } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import FacebookLogin, {
  SuccessResponse,
} from "@greatsumini/react-facebook-login";
import { useRouter } from "next/navigation";
import React from "react";
import styles from "./facebook.module.scss";

type Props = {
  setLoadingLoginLibrary: React.Dispatch<React.SetStateAction<boolean>>;
};
const Facebook = React.memo(function FacebookComponent({
  setLoadingLoginLibrary,
}: Props) {
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
});

export default Facebook;
