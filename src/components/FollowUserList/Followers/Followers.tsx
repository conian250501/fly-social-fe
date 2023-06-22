import { IUser } from "@/features/interface";
import FollowerItem from "./FollowerItem";
import styles from "./followers.module.scss";

type Props = {
  users: IUser[];
  currentUserId: number;
};

const Followers = ({ currentUserId, users }: Props) => {
  return (
    <ul className={styles.userFollowList}>
      {users.length <= 0 ? (
        <div className={styles.noneDataWrapper}>
          <img src="/images/birds.png" className={styles.banner} alt="" />
          <h1 className={styles.title}>Looking for followers?</h1>
          <p className={styles.description}>
            When someone follows this account, they’ll show up here. Tweeting
            and interacting with others helps boost followers.
          </p>
        </div>
      ) : (
        users.map((user) => (
          <FollowerItem
            currentUserId={currentUserId}
            key={user.id}
            user={user}
          />
        ))
      )}
    </ul>
  );
};

export default Followers;
