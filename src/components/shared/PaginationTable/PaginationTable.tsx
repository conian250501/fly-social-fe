import React from "react";
import styles from "./paginationTable.module.scss";
import { ETypePageForPagination } from "@/components/interfaces";
import { useAppDispatch } from "@/redux/hooks";
import { getAllUsers } from "@/features/admin/user/userAction";
import { getAllTweets } from "@/features/admin/tweet/tweetAction";
type Props = {
  page: number;
  totalPage: number;
  typePage: ETypePageForPagination;
};

const PaginationTable = ({ typePage, page, totalPage }: Props) => {
  const dispatch = useAppDispatch();
  const handlePrev = async () => {
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
  };

  const handleNext = async () => {
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
      </button>
      <button
        className={`${styles.btn} ${styles.btnNext} ${
          page === totalPage ? styles.disabled : ""
        }`}
        disabled={page === totalPage}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationTable;
