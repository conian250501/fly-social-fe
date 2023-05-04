import React from "react"
import styles from "./loading.module.scss";
type Props = {}

const Loading = (props: Props) => {
  return (
    <div className={styles.spinner}></div>
  )
}

export default Loading