"use client";
import SettingLinks from "@/components/SettingLinks";
import BackLink from "@/components/shared/BackLink";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div>
      <BackLink title="Settings" />
      <SettingLinks />
    </div>
  );
};

export default Page;
