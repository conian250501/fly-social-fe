import React, { useState } from "react";
import styles from "./paginationTable.module.scss";
import { ETypePageForPagination } from "@/components/interfaces";
import { useAppDispatch } from "@/redux/hooks";
import { getAllUsers } from "@/features/admin/user/userAction";
import { getAllTweets } from "@/features/admin/tweet/tweetAction";
import { AiOutlineLoading } from "react-icons/ai";
type Props = {
  page: number;
  totalPage: number;
  typePage: ETypePageForPagination;
};

const PaginationTable = ({ typePage, page, totalPage }: Props) => {
  const dispatch = useAppDispatch();
  const [loadingNext, setLoadingNext] = useState<boolean>(false);
  const [loadingPrev, setLoadingPrev] = useState<boolean>(false);
  const handlePrev = async () => {
    try {
      setLoadingPrev(true);
      switch (typePage) {
        case ETypePageForPagination.AdminManageUsers:
          await dispatch(getAllUsers({ page: page - 1 })).unwrap();
          break;
        case ETypePageForPagination.AdminManageTweets:
          await dispatch(getAllTweets({ page: page - 1 })).unwrap();

          break;
        default:
          break;
      }
      setLoadingPrev(false);
    } catch (error) {
      setLoadingPrev(false);
    }
  };

  const handleNext = async () => {
    try {
      setLoadingNext(true);
      switch (typePage) {
        case ETypePageForPagination.AdminManageUsers:
          await dispatch(getAllUsers({ page: page + 1 })).unwrap();
          break;
        case ETypePageForPagination.AdminManageTweets:
          await dispatch(getAllTweets({ page: page + 1 })).unwrap();
          break;
        default:
          break;
      }
      setLoadingNext(false);
    } catch (error) {
      setLoadingNext(false);
    }
  };
  return (
    <div className={styles.paginationList}>
      <button
        className={`${styles.btn} ${styles.btnPrev} ${
          page === 1 ? styles.disabled : ""
        } `}
        disabled={page === 1}
        onClick={handlePrev}
      >
        Previous
        {loadingPrev && <AiOutlineLoading className={styles.iconLoading} />}
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext} ${
          page === totalPage ? styles.disabled : ""
        }`}
        disabled={page === totalPage}
        onClick={handleNext}
      >
        Next
        {loadingNext && <AiOutlineLoading className={styles.iconLoading} />}
      </button>
    </div>
  );
};

export default PaginationTable;
