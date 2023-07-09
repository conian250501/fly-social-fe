import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import styles from "./formSearchUser.module.scss";
type Props = {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
};

const FormSearchUser = ({ searchValue, setSearchValue }: Props) => {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <Form className={styles.form}>
      <Form.Group
        className={`${styles.formGroup} ${isFocus ? styles.focus : ""}`}
      >
        <div className={styles.iconSearch}>
          <FiSearch className={styles.icon} />
        </div>
        <Form.Control
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className={styles.formInput}
          placeholder="Search user"
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      </Form.Group>
    </Form>
  );
};

export default FormSearchUser;
