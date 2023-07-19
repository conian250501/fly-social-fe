import React from "react";
import styles from "./paginationTable.module.scss";
import { ETypePageForPagination } from "@/components/interfaces";
import { useAppDispatch } from "@/redux/hooks";
import { getAllUsers } from "@/features/admin/user/userAction";
type Props = {
  page: number;
  totalPage: number;
  typePage: ETypePageForPagination;
};

const PaginationTable = ({ typePage, page, totalPage }: Props) => {
  console.log({ page, totalPage });
  const dispatch = useAppDispatch();
  const handlePrev = async () => {
    switch (typePage) {
      case ETypePageForPagination.AdminManageUsers:
        await dispatch(getAllUsers({ page: page - 1 })).unwrap();
        break;
      case ETypePageForPagination.AdminManageUsers:
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
      case ETypePageForPagination.AdminManageUsers:
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
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationTable;
