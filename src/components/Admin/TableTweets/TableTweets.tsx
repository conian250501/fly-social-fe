import React, { useEffect, useState } from "react";
import styles from "./tableTweets.module.scss";
import { ITweet } from "@/features/interface";
import { ProgressSpinner } from "primereact/progressspinner";
import NoneData from "@/components/shared/NoneData/NoneData";
import { Table } from "react-bootstrap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getAllTweets } from "@/features/admin/tweet/tweetAction";
import { RootState } from "@/redux/store";
import PaginationTable from "@/components/shared/PaginationTable/PaginationTable";
import { ETypePageForPagination } from "@/components/interfaces";
import ButtonManageRecordTable from "../ButtonManageTable/ButtonManageRecordTable";
import { PATHS } from "@/contanst/paths";

type Props = {};

const TableTweets = (props: Props) => {
  const dispatch = useAppDispatch();
  const [loadingGetTweets, setLoadingGetTweets] = useState<boolean>(false);
  const { tweets, page, totalPage } = useAppSelector(
    (state: RootState) => state.adminTweet
  );

  const [filter, setFilter] = useState<{ limit: number; page: number }>({
    limit: 4,
    page: 1,
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetTweets(true);
        await dispatch(getAllTweets(filter)).unwrap();
        setLoadingGetTweets(false);
      } catch (error) {
        setLoadingGetTweets(false);
      }
    }
    getData();
  }, []);

  return (
    <div className={styles.tableWrapper}>
      {loadingGetTweets ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <ProgressSpinner className={styles.loading} strokeWidth="4px" />
        </div>
      ) : (
        <>
          {tweets.length <= 0 ? (
            <NoneData
              title="Don't have any user?"
              customClassNameContainer={styles.bannerNoneData}
              customClassNameTitle={styles.bannerTitle}
            />
          ) : (
            <Table hover responsive className={styles.table}>
              <thead>
                <tr className={styles.tableRowHeader}>
                  <th className={styles.tableCellHeader}>Id</th>
                  <th className={styles.tableCellHeader}>Files</th>
                  <th className={styles.tableCellHeader}>Content</th>
                  <th className={styles.tableCellHeader}>Likes</th>
                  <th className={styles.tableCellHeader}>Comments</th>
                </tr>
              </thead>
              <tbody>
                {tweets.map((tweet) => (
                  <tr key={tweet.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.id}>{tweet.id}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.files}>
                        {tweet.image ? <img src={tweet.image} alt="" /> : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.content}>
                        {tweet.content ? tweet.content : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={`${styles.likes} ${styles.textCommon}`}>
                        {tweet.likes.length}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div
                        className={`${styles.comments} ${styles.textCommon}`}
                      >
                        {tweet.comments.length}
                      </div>
                    </td>

                    <td className={styles.tableCell}>
                      <button type="button" className={styles.btnDelete}>
                        Delete
                      </button>
                      <ButtonManageRecordTable
                        link={`${PATHS.AdminManageTweetEdit}/${tweet.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}

      <div className="d-flex align-items-center justify-content-end w-100 mt-4">
        <PaginationTable
          page={page}
          totalPage={totalPage}
          typePage={ETypePageForPagination.AdminManageTweets}
        />
      </div>
    </div>
  );
};

export default TableTweets;
