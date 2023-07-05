"use client";
import FormEditInfos from "@/components/FormEditInfos";
import { IUser } from "@/features/interface";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import styles from "./page.module.scss";
type Props = {};

const Page = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);

  return (
    <div className={styles.formWrapper}>
      <FormEditInfos user={user as IUser} />
    </div>
  );
};

export default Page;
