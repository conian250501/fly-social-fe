/* eslint-disable @next/next/no-img-element */
import { ITweet } from "@/app/features/interface";
import { PATHS } from "@/contanst/paths";
import { useCheckAuthor } from "@/hooks/useCheckAuthor";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { TbDots } from "react-icons/tb";
import styles from "./tweetDetail.module.scss";
import ButtonsAction from "../Home/TabsTweetList/components/ButtonsAction";
import moment from "moment";
import FormComment from "../Comment/FormComment";
import CommentList from "../Comment/CommentList";

type Props = { tweet: ITweet | null };

const TweetDetail = ({ tweet }: Props) => {
  const { isAuthor } = useCheckAuthor(Number(tweet?.user?.id));

  if (!tweet)
    return (
      <div>
        <h1>Tweet doest exist</h1>
      </div>
    );
  return (
    <div className={styles.tweetDetailContainer}>
      <Link href={PATHS.Home} className={styles.backLink}>
        <div className={styles.iconBack}>
          <BsArrowLeft className={styles.icon} />
        </div>
        Tweet
      </Link>
      <div className={styles.userInfo}>
        <div className="d-flex align-items-center justify-content-start gap-3">
          <img
            src={
              tweet.user.avatar ? tweet.user.avatar : "avatar-placeholder.png"
            }
            alt=""
            className={styles.avatar}
          />
          <div className={styles.info}>
            <h6 className={styles.name}>{tweet.user.name}</h6>
            <p className={styles.nickname}>
              {tweet.user.nickname ? tweet.user.nickname : ""}
            </p>
          </div>
          <div className={styles.dateCreated}>
            {moment(tweet.createdAt).fromNow()}
          </div>
        </div>
        {isAuthor && <TbDots className={styles.dotIcon} />}
      </div>
      {tweet.content && <p className={styles.content}>{tweet.content}</p>}
      {tweet.image && (
        <img src={tweet.image} className={styles.image} alt="tweet-image" />
      )}
      <div className={`${styles.lineDivide}`}></div>

      {/* BUTTON ACTION */}
      <ButtonsAction tweet={tweet} />

      <div className={styles.lineDivide}></div>

      {/* FORM COMMENT */}
      <div className="mt-3 mb-3">
        <FormComment tweet={tweet} />
      </div>
      <div className={`${styles.lineDivide}`}></div>

      {/* COMMENT LIST */}
      <div className="mt-4">
        <CommentList tweet={tweet} />
      </div>
    </div>
  );
};

export default TweetDetail;
