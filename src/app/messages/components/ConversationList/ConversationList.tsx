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
import UserListMessage from "@/components/Modal/UserListMessage/UserListMessage";

type Props = {};

const ConversationList = (props: Props) => {
  const dispatch = useAppDispatch();
  const { user: currentUser } = useAppSelector(
    (state: RootState) => state.auth
  );
  const { page: page, totalPage } = useAppSelector(
    (state: RootState) => state.user
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingLoadMore, setLoadingLoadMore] = useState<boolean>(false);
  const [openModalNewConversation, setOpenModalNewConversation] =
    useState<boolean>(false);
  const [conversations, setConversations] = useState<IConversation[]>([]);

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
            senderId: Number(currentUser?.id),
            filter: {
              page: 1,
              limit: 4,
            },
          })
        ).unwrap();

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
          senderId: Number(currentUser?.id),
          filter: { page: Number(page) + 1, limit: 4 },
        })
      ).unwrap();

      setConversations([...conversations, ...res.conversations]);
      setLoadingLoadMore(false);
    } catch (error) {
      setLoadingLoadMore(false);
    }
  };

  const handleAddNewConversation = async () => {
    try {
      console.log(123);
    } catch (error) {}
  };

  return (
    <div>
      <div className={styles.userListWrapper}>
        <h1 className={styles.heading}>Messages</h1>

        {loading ? (
          <div className="d-flex align-items-center justify-content-center w-100 mt-4 pb-4">
            <Loading />
          </div>
        ) : (
          <div className={styles.userList}>
            {conversations.length <= 0 ? (
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
                <div
                  role="button"
                  className={styles.userItem}
                  key={conversation.id}
                >
                  <div className="d-flex align-items-center justify-content-start gap-3 text-decoration-none">
                    <div className="position-relative">
                      <img
                        src={
                          conversation.receiver.avatar
                            ? conversation.receiver.avatar
                            : "/images/avatar-placeholder.png"
                        }
                        alt=""
                        className={styles.avatar}
                      />
                      {conversation.receiver.verified && (
                        <img
                          src="/icons/twitter-verified-badge.svg"
                          alt=""
                          className={styles.iconVerified}
                        />
                      )}
                    </div>
                    <div className={styles.info}>
                      <div className="d-flex align-items-center justify-content-start gap-2 position-relative">
                        <h4 className={styles.name}>
                          {conversation.receiver.name}
                        </h4>
                      </div>
                      {conversation.receiver.nickname && (
                        <p className={styles.nickname}>
                          @{conversation.receiver.nickname}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
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

      <UserListMessage
        isOpen={openModalNewConversation}
        handleClose={() => setOpenModalNewConversation(true)}
        handleAddNewConversation={handleAddNewConversation}
      />

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
