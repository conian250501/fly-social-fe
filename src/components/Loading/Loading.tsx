import React from "react";
import styles from "./loading.module.scss";
import { ProgressSpinner } from "primereact/progressspinner";

type Props = {};

const Loading = (props: Props) => {
  return (
    <ProgressSpinner
      style={{ width: 30, height: 30 }}
      strokeWidth={"4"}
      pt={{
        circle: { style: { stroke: "#3f9cf0" } },
      }}
    />
  );
};

export default Loading;
