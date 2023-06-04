import React from "react";

type Props = {
  children: React.ReactNode;
};

const WithoutHeader = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default WithoutHeader;
