/* eslint-disable react/display-name */
import { PATHS } from "@/contanst/paths";
import { nanoid } from "@reduxjs/toolkit";
import Link from "next/link";
import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./privacyList.module.scss";
type Props = {};

const PrivacyList = React.memo((props: Props) => {
  const [privacyList, setPrivacyList] = useState<
    { id: string; title: string; link: string }[]
  >([
    {
      id: nanoid(),
      title: "Terms of Service",
      link: PATHS.TermsOfService,
    },
    {
      id: nanoid(),
      title: "Privacy Policy",
      link: PATHS.Privacy,
    },
    {
      id: nanoid(),
      title: "Cookie Policy",
      link: PATHS.CookiesPolicy,
    },
    {
      id: nanoid(),
      title: "Accessibility",
      link: PATHS.Accessibility,
    },
    {
      id: nanoid(),
      title: "Ads info",
      link: PATHS.AdsInfo,
    },
    {
      id: nanoid(),
      title: "© 2023 X Corp.",
      link: "",
    },
  ]);
  return (
    <div className={styles.wrapper}>
      <Row className="g-2">
        {privacyList.map((item) => (
          <Col key={item.id} xs={4} sm={4} md={4}>
            <Link href={item.link} className={styles.privacyItem}>
              {item.title}
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
});

export default PrivacyList;
