import NoneData from "@/components/shared/NoneData";
import { PATHS } from "@/contanst/paths";
import { ITweet } from "@/features/interface";
import { getAll } from "@/features/tweet/tweetAction";
import { useAppDispatch } from "@/redux/hooks";
import Link from "next/link";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./tweetList.module.scss";

type Props = {};

const TweetList = (props: Props) => {
  const dispatch = useAppDispatch();
  const [tweets, setTweets] = useState<ITweet[]>([]);
  const [loadingTweets, setLoadingTweets] = useState<boolean>(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingTweets(true);
        const _tweets: ITweet[] = await dispatch(
          getAll({ limit: 16, page: 1 })
        ).unwrap();

        const newTweets = _tweets.filter((item) => item.image);
        setTweets(newTweets);
        setTimeout(() => {
          setLoadingTweets(false);
        }, 500);
      } catch (error) {
        setLoadingTweets(false);
        throw error;
      }
    }
    getData();
  }, []);

  if (loadingTweets) {
    return (
      <Row className="g-0 row-cols-3 row-cols-md-3 row-cols-lg-4">
        {tweets.map((item) => (
          <Col key={item.id}>
            <Skeleton borderRadius="0" className={styles.skeleton}></Skeleton>
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <div className={styles.tweetListContainer}>
      <Row className="g-0 row-cols-3 row-cols-md-3 row-cols-lg-4">
        {tweets.length <= 0 ? (
          <NoneData title="App is crashed?" />
        ) : (
          tweets.map((tweet) => (
            <Col key={tweet.id}>
              <Link
                href={`${PATHS.Tweets}/${tweet.id}`}
                className={styles.tweetItem}
              >
                <img
                  src={tweet.image}
                  alt={`tweet_image_${tweet.id}`}
                  className={styles.tweetImage}
                  loading="lazy"
                />
              </Link>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default TweetList;
