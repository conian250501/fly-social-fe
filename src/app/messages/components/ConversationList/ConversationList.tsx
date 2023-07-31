/* eslint-disable react/display-name */
import Loading from "@/components/Loading";
import ModalError from "@/components/Modal/ModalError";
import { getAllConversation } from "@/features/conversation/conversationAction";
import { IConversation, IError } from "@/features/interface";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import styles from "./conversationList.module.scss";
import FormNewConversation from "@/components/Modal/FormNewConversation";
import ConversationItem from "../ConversationItem";
import { RiMailAddLine } from "react-icons/ri";

type Props = {};

const ConversationList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [openModalNewConversation, setOpenModalNewConversation] =
    useState<boolean>(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [lastPage, setLastPage] = useState<boolean>(false);
  const [error, setError] = useState<IError | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const debounceValue = useDebounce(searchValue, 500);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const res = await dispatch(
          getAllConversation({
            userId: Number(currentUser?.id),
            filter: {
              page: 1,
              limit: 4,
            },
          })
        ).unwrap();
        setPage(res.page);
        setTotalPage(res.totalPage);

        setConversations(res.conversations);

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    if (currentUser) {
      getData();
      setLastPage(false);
    }
  }, [debounceValue]);

  useEffect(() => {
    if (page > 0 && page === totalPage) {
      setLastPage(true);
    }
  }, [page]);

  const handleLoadMore = async () => {
    try {
      setLoadingLoadMore(true);
      const res = await dispatch(
        getAllConversation({
          userId: Number(currentUser?.id),
          filter: { page: Number(page) + 1, limit: 4 },
        })
      ).unwrap();
      setPage(page + 1);

      setConversations([...conversations, ...res.conversations]);
      setLoadingLoadMore(false);
    } catch (error) {
      setLoadingLoadMore(false);
    }
  };

  return (
    <div>
      <div className={styles.userListWrapper}>
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className={styles.heading}>Messages</h1>
          <div
            className={styles.iconNewChat}
            onClick={() => setOpenModalNewConversation(true)}
          >
            <RiMailAddLine className={styles.icon} />
          </div>
        </div>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 pb-4">
            <Loading />
          </div>
        ) : (
          <div className={styles.userList}>
            {conversations && conversations.length <= 0 ? (
              <div className={styles.noneDataWrapper}>
                <img src="/images/birds.png" className={styles.banner} alt="" />
                <h1 className={styles.title}>
                  You don&apos;t have any conversation! <br /> Send new message
                  now?
                </h1>
                <button
                  type="button"
                  className={styles.btnNewMessage}
                  onClick={() => setOpenModalNewConversation(true)}
                >
                  New message
                </button>
              </div>
            ) : (
              conversations.map((conversation) => (
                <ConversationItem
                  key={conversation.id}
                  conversation={conversation}
                />
              ))
            )}
            {!lastPage && conversations.length > 0 && (
              <button
                type="button"
                onClick={handleLoadMore}
                className={styles.btnLoadMore}
                disabled={loadingLoadMore}
              >
                {loadingLoadMore ? (
                  <AiOutlineLoading className={styles.iconLoading} />
                ) : (
                  "Show more"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      {openModalNewConversation && (
        <FormNewConversation
          isOpen={openModalNewConversation}
          handleClose={() => setOpenModalNewConversation(false)}
        />
      )}

      {error && (
        <ModalError
          isOpen={Boolean(error)}
          handleClose={() => setError(null)}
          message={error.message}
        />
      )}
    </div>
  );
};

export default ConversationList;
