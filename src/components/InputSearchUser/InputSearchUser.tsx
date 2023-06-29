/* eslint-disable react/display-name */
import { useDebounce } from "@/hooks/useDebounce";
import React, { useEffect, useRef, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { InputText } from "primereact/inputtext";
import styles from "./inputSearchUser.module.scss";
import UsersResult from "./components/UsersResult";
import { useAppDispatch } from "@/redux/hooks";
import { getAllUsers } from "@/features/user/userAction";
import { IUser } from "@/features/interface";

type Props = {};

const InputSearchUser = React.memo((props: Props) => {
  const dispatch = useAppDispatch();
  const [inputIsFocus, setInputIsFocus] = useState<boolean>(false);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>([]);
  const debounceValue = useDebounce(searchValue);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleBlurInput = () => {
      setInputIsFocus(false);
    };
    window.addEventListener("click", handleBlurInput);
    return () => {
      window.removeEventListener("click", handleBlurInput);
    };
  }, []);

  useEffect(() => {
    if (searchValue.length <= 0) {
      setUsers([]);
      return;
    }
    async function searchUser() {
      try {
        setLoadingSearch(true);
        const res = await dispatch(getAllUsers({ name: searchValue })).unwrap();
        setUsers(res.users);
        setLoadingSearch(false);
      } catch (error) {
        setLoadingSearch(false);
      }
    }
    searchUser();
  }, [debounceValue, dispatch]);

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (e.target.value.length <= 0) {
      setLoadingSearch(false);
    } else {
      setLoadingSearch(true);
    }
  };
  const handleRemoveSearchValue = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setSearchValue("");
    setUsers([]);
  };

  return (
    <Form className={styles.formSearch}>
      <Form.Group
        className={`${styles.inputGroup} ${inputIsFocus ? styles.focus : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
          setInputIsFocus(true);
        }}
      >
        <i className={`${styles.iconSearch} pi pi-search`}></i>

        <Form.Control
          type="text"
          ref={inputRef}
          placeholder="Try searching for people or keywords"
          className={styles.formInput}
          value={searchValue}
          onChange={handleChangeSearchValue}
        />
        {searchValue.length > 0 && (
          <div className={styles.iconClear} onClick={handleRemoveSearchValue}>
            <i className="pi pi-times"></i>
          </div>
        )}
        {inputIsFocus && <UsersResult users={users} loading={loadingSearch} />}
      </Form.Group>
    </Form>
  );
});

export default InputSearchUser;
