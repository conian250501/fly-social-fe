import { ETypeRoleLoggedIn } from "@/common/interfaces";
import Github from "@/components/AuthButtons/Github";
import Google from "@/components/AuthButtons/Google";
import ToastError from "@/components/Toasts/Error/Error";
import { PATHS } from "@/contanst/paths";
import { getUser, login } from "@/features/auth/authAction";
import { IError, IPayloadLogin } from "@/features/interface";
import { useAppDispatch } from "@/redux/hooks";
import { useFormik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";
import styles from "./formSignIn.module.scss";
import { keyForTypeLoggedIn } from "@/contanst/key-localstorage";
type Props = {};

const FormSignIn = (props: Props) => {
  const [error, setError] = useState<IError | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchData = async () => {
      try {
        setLoadingSubmit(true);
        await dispatch(getUser()).unwrap();
        router.replace(PATHS.AdminDashboard);
      } catch (error) {
        setLoadingSubmit(false);
        return error;
      }
    };

    if (token) {
      fetchData();
    }
  }, []);

  const handleSubmit = useCallback(async (values: IPayloadLogin) => {
    try {
      setLoadingSubmit(true);
      await dispatch(login(values)).unwrap();
      localStorage.setItem(keyForTypeLoggedIn, ETypeRoleLoggedIn.Admin);
      router.push(PATHS.AdminDashboard);
    } catch (error) {
      setLoadingSubmit(false);
      setError(error as IError);
    }
  }, []);

  const form = useFormik<IPayloadLogin>({
    initialValues: {
      email: "",
      password: "",
    },
    async onSubmit(values, formikHelpers) {
      handleSubmit(values);
    },
  });
  return (
    <div className={styles.formWrapper}>
      <div className={styles.formAdminLogin}>
        <Form onSubmit={form.handleSubmit}>
          <div className={styles.logo}>
            <Image src="/images/logo-app.png" alt="" fill />
          </div>
          <h1 className={styles.appName}>Fly social</h1>
          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Email</Form.Label>
            <Form.Control
              value={form.values.email}
              onChange={form.handleChange}
              name="email"
              placeholder="example@gmail.com"
              className={styles.formInput}
            />
          </Form.Group>

          <Form.Group className={styles.formGroup}>
            <Form.Label className={styles.formLabel}>Password</Form.Label>
            <div className={styles.inputGroup}>
              <Form.Control
                type={showPassword ? "text" : "password"}
                value={form.values.password}
                onChange={form.handleChange}
                name="password"
                placeholder="********"
                className={`${styles.formInput} ${styles.password}`}
              />
              {showPassword ? (
                <AiOutlineEye
                  onClick={() => setShowPassword(false)}
                  className={styles.iconPwd}
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() => setShowPassword(true)}
                  className={styles.iconPwd}
                />
              )}
            </div>
          </Form.Group>
          <div className="d-flex align-items-center justify-content-between mt-3">
            <Form.Check
              label="Remember me"
              className={styles.formCheckRemember}
            />
            <Link href={PATHS.ForgotPassword} className={styles.forgotLink}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className={styles.btnSubmit}
            disabled={loadingSubmit}
          >
            {loadingSubmit ? (
              <AiOutlineLoading className={styles.iconLoading} />
            ) : (
              "Sign In"
            )}
          </button>
        </Form>
        <div className={styles.textOr}>Or</div>

        <Google
          typePage="Admin"
          setLoadingLoginLibrary={setLoadingSubmit}
          customBtnClassName={styles.btnGoogle}
        />

        <Github
          typePage="Admin"
          setLoadingLoginLibrary={setLoadingSubmit}
          customBtnClassName={styles.btnGithub}
        />
      </div>

      {error && <ToastError error={error} onClose={() => setError(null)} />}
    </div>
  );
};

export default FormSignIn;
