import React, { useEffect, useState } from "react";
import styles from "./tableTweets.module.scss";
import { EUserRole, ITweet } from "@/features/interface";
import { ProgressSpinner } from "primereact/progressspinner";
import NoneData from "@/components/shared/NoneData";
import { Table } from "react-bootstrap";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { deleteTweet, getAllTweets } from "@/features/admin/tweet/tweetAction";
import { RootState } from "@/redux/store";
import PaginationTable from "@/components/shared/PaginationTable";
import { ETypePageForPagination } from "@/components/interfaces";
import ButtonManageRecordTable from "../ButtonManageTable/ButtonManageRecordTable";
import { PATHS } from "@/contanst/paths";
import FormDeleteTyping from "@/components/Modal/FormDeleteTyping";

type Props = {};

const TableTweets = (props: Props) => {
  const dispatch = useAppDispatch();
  const { tweets, page, totalPage } = useAppSelector(
    (state: RootState) => state.adminTweet
  );

  const [loadingGetTweets, setLoadingGetTweets] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [loadingDeleteTweet, setLoadingDeleteTweet] = useState<boolean>(false);
  const [tweetActive, setTweetActive] = useState<number>(0);
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

  const handleDeleteTweet = async () => {
    try {
      setLoadingDeleteTweet(true);

      await dispatch(deleteTweet(tweetActive)).unwrap();
      await dispatch(getAllTweets(filter)).unwrap();

      setOpenModalDelete(false);
      setLoadingDeleteTweet(false);
    } catch (error) {
      setLoadingDeleteTweet(false);
    }
  };

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
                  <th className={styles.tableCellHeader}>Author</th>
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
                      <div className={styles.author}>
                        <div className={styles.avatar}>
                          <img
                            src={
                              tweet.user.avatar
                                ? tweet.user.avatar
                                : "/images/avatar-placeholder.png"
                            }
                            alt=""
                          />
                          {tweet.user.verified && (
                            <img
                              src="/icons/twitter-verified-badge.svg"
                              alt=""
                              className={styles.iconVerified}
                            />
                          )}
                        </div>
                        <div className={styles.info}>
                          <div className="d-flex align-items-center justify-content-start gap-3 mb-2">
                            <h1 className={styles.name}>{tweet.user.name}</h1>
                            <div
                              className={`${styles.role} ${
                                tweet.user.role === EUserRole.Admin
                                  ? styles.admin
                                  : ""
                              } ${
                                tweet.user.role === EUserRole.User
                                  ? styles.user
                                  : ""
                              }`}
                            >
                              {tweet.user.role}
                            </div>
                          </div>
                          <div className={styles.btnLinkList}>
                            <Link
                              href={`${PATHS.AdminManageUsers}/${tweet.user.id}`}
                              className={`${styles.btnLink} ${styles.detail}`}
                            >
                              Detail
                            </Link>

                            <Link
                              href={`${PATHS.AdminManageUserEdit}/${tweet.user.id}`}
                              className={`${styles.btnLink} ${styles.edit}`}
                            >
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>
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
                      <div className={styles.btnList}>
                        <button
                          type="button"
                          className={styles.btnDelete}
                          onClick={() => {
                            setTweetActive(tweet.id);
                            setOpenModalDelete(true);
                          }}
                        >
                          Delete
                        </button>
                        <ButtonManageRecordTable
                          link={`${PATHS.AdminManageTweetEdit}/${tweet.id}`}
                        />
                      </div>
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

      {/* ====== MODALS ====== */}
      <FormDeleteTyping
        isOpen={openModalDelete}
        handleClose={() => setOpenModalDelete(false)}
        loading={loadingDeleteTweet}
        onClick={handleDeleteTweet}
        title="Are you sure delete this tweet?"
        description="If you delete in there, this tweet can't revert! So think carefully"
      />
    </div>
  );
};

export default TableTweets;
