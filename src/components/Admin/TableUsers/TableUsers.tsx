import UserRole from "@/components/Admin/Badges/UserRole";
import UserStatus from "@/components/Admin/Badges/UserStatus";
import {
  ETypePageForTableUser,
  ETypeTabUserFilter,
} from "@/components/Admin/interface";
import { ETypePageForPagination } from "@/components/interfaces";
import NoneData from "@/components/shared/NoneData/NoneData";
import PaginationTable from "@/components/shared/PaginationTable";
import { PATHS } from "@/contanst/paths";
import { getAllUsers } from "@/features/admin/user/userAction";
import { EUserStatus, IUser } from "@/features/interface";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { nanoid } from "@reduxjs/toolkit";
import moment from "moment";
import Link from "next/link";
import { ProgressSpinner } from "primereact/progressspinner";
import { useEffect, useState } from "react";
import { Form, Table } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import ButtonManageRecordTable from "../ButtonManageTable";
import styles from "./tableUsers.module.scss";
import { Dropdown } from "primereact/dropdown";
import ModalSuccess from "@/components/Modal/ModalSuccess";
import { clearArchiveUserSuccess } from "@/features/admin/user/userSlice";

type Props = {
  typePage: ETypePageForTableUser;
  customClassNameTableWrapper?: string;
};

const TableUsers = ({ typePage, customClassNameTableWrapper }: Props) => {
  const dispatch = useAppDispatch();
  const { page, totalPage } = useAppSelector(
    (state: RootState) => state.adminUser
  );
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { users, archiveSuccess } = useAppSelector(
    (state: RootState) => state.adminUser
  );

  const [loadingGetUser, setLoadingGetUsers] = useState<boolean>(false);

  const [tabFilters, setTabFilters] = useState<
    { id: string; type: ETypeTabUserFilter; status: EUserStatus | string }[]
  >([
    {
      id: nanoid(),
      type: ETypeTabUserFilter.All,
      status: "",
    },
    {
      id: nanoid(),
      type: ETypeTabUserFilter.Active,
      status: EUserStatus.Active,
    },
    {
      id: nanoid(),
      type: ETypeTabUserFilter.InActive,
      status: EUserStatus.InActive,
    },
  ]);

  const [tabActive, setTabActive] = useState<ETypeTabUserFilter>(
    ETypeTabUserFilter.All
  );

  const [filters, setFilters] = useState<{
    limit: number;
    page: number;
    name: string;
    status: EUserStatus | string;
    verified: boolean;
  }>({
    limit: 4,
    page: 1,
    name: "",
    status: "",
    verified: false,
  });

  const dropdownFilters = [
    {
      name: ETypeTabUserFilter.All,
    },
    {
      name: ETypeTabUserFilter.Active,
    },
    {
      name: ETypeTabUserFilter.InActive,
    },
  ];

  const [valueFilterMobile, setValueFilterMobile] = useState<string>("");

  const searchValue = useDebounce(filters.name);

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetUsers(true);
        await dispatch(getAllUsers(filters)).unwrap();
        setLoadingGetUsers(false);
      } catch (error) {
        setLoadingGetUsers(false);
      }
    }
    getData();
  }, [searchValue, filters.status, filters.verified]);

  return (
    <div className={`${styles.tableWrapper} ${customClassNameTableWrapper}`}>
      {typePage === ETypePageForTableUser.DashboardPage && (
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h1 className={styles.headingTop}>
            Hi <strong>{user?.name}</strong>, Welcome back!
          </h1>
          <Link href={PATHS.AdminManageUsers} className={styles.btnSeeMore}>
            More
          </Link>
        </div>
      )}
      <div className={styles.tabFilters}>
        {tabFilters.map((tab) => (
          <div
            className={`${styles.tabItem} ${styles.desktop} ${
              tabActive === tab.type ? styles.active : ""
            }`}
            key={tab.id}
            onClick={() => {
              setTabActive(tab.type);
              setFilters({
                ...filters,
                status: tab.status,
                verified: false,
              });
            }}
          >
            {tab.type}
          </div>
        ))}

        <div
          className={`${styles.tabItem} ${
            tabActive === ETypeTabUserFilter.Verified ? styles.active : ""
          }`}
          onClick={() => {
            setTabActive(ETypeTabUserFilter.Verified);

            setFilters({
              limit: 4,
              page: 1,
              status: "",
              name: "",
              verified: true,
            });
          }}
        >
          Verified
        </div>

        <div
          className={`${styles.tabItem} ${
            tabActive === ETypeTabUserFilter.Verified ? styles.active : ""
          }`}
        >
          <div className={styles.inputGroup}>
            <div className={styles.iconSearch}>
              <FiSearch className={styles.icon} />
            </div>
            <Form.Control
              value={filters.name}
              className={styles.formInput}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              placeholder="Enter a name..."
            />
          </div>
        </div>
      </div>

      {/* ===== FILTERS MOBILE ======= */}
      <div className={`${styles.tabFilters} ${styles.mobile}`}>
        <Dropdown
          value={{ name: valueFilterMobile }}
          onChange={(e) => {
            if (e.value.name === ETypeTabUserFilter.All) {
              setValueFilterMobile(e.value.name);
              setFilters({ ...filters, status: "", verified: false });
              setTabActive(e.value.name);
            } else {
              setFilters({ ...filters, status: e.value.name, verified: false });
              setValueFilterMobile(e.value.name);
              setTabActive(e.value.name);
            }
          }}
          options={dropdownFilters}
          optionLabel="name"
          placeholder="Select a Status"
          className={styles.filtersDropdown}
        />

        <div
          className={`${styles.tabItem} ${
            tabActive === ETypeTabUserFilter.Verified ? styles.active : ""
          }`}
          onClick={() => {
            setTabActive(ETypeTabUserFilter.Verified);

            setFilters({
              limit: 4,
              page: 1,
              status: "",
              name: "",
              verified: true,
            });
          }}
        >
          Verified
        </div>
        <div
          className={`${styles.tabItem} ${
            tabActive === ETypeTabUserFilter.Verified ? styles.active : ""
          }`}
        >
          <div className={styles.inputGroup}>
            <div className={styles.iconSearch}>
              <FiSearch className={styles.icon} />
            </div>
            <Form.Control
              value={filters.name}
              className={styles.formInput}
              onChange={(e) => setFilters({ ...filters, name: e.target.value })}
              placeholder="Enter a name..."
            />
          </div>
        </div>
      </div>

      {loadingGetUser ? (
        <div className="d-flex align-items-center justify-content-center w-100 h-100">
          <ProgressSpinner className={styles.loading} strokeWidth="4px" />
        </div>
      ) : (
        <>
          {users.length <= 0 ? (
            <NoneData
              title="Don't have any user?"
              customClassNameContainer={styles.bannerNoneData}
              customClassNameTitle={styles.bannerTitle}
            />
          ) : (
            <Table hover responsive className={styles.table}>
              <thead>
                <tr className={styles.tableRowHeader}>
                  <th className={styles.tableCellHeader}>Id</th>
                  <th className={styles.tableCellHeader}>Information</th>
                  <th className={styles.tableCellHeader}>Email</th>
                  <th className={styles.tableCellHeader}>Phone</th>
                  <th className={styles.tableCellHeader}>Bio</th>
                  <th className={styles.tableCellHeader}>Gender</th>
                  <th className={styles.tableCellHeader}>Age</th>
                  <th className={styles.tableCellHeader}>Website</th>
                  <th className={styles.tableCellHeader}>Role</th>
                  <th className={styles.tableCellHeader}>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className={styles.tableRow}>
                    <td className={styles.tableCell}>
                      <div className={styles.id}>{user.id}</div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.information}>
                        <Link
                          href={`${PATHS.AdminManageUsers}/${user.id}`}
                          className={styles.avatar}
                        >
                          <img
                            src={
                              user.avatar
                                ? user.avatar
                                : "/images/avatar-placeholder.png"
                            }
                            alt=""
                          />
                        </Link>
                        <div className={styles.info}>
                          <Link
                            href={`${PATHS.AdminManageUsers}/${user.id}`}
                            className={styles.name}
                          >
                            {user.name}

                            {user.verified && (
                              <img
                                src="/icons/twitter-verified-badge.svg"
                                alt=""
                                className={styles.iconVerified}
                              />
                            )}
                          </Link>
                          <div className="d-flex align-items-center justify-content-start gap-4 mt-2">
                            <div
                              className={`${styles.followItem} ${styles.badge}`}
                            >
                              <div className={styles.key}>Followers</div>
                              <div className={styles.value}>
                                {user.followers.length}
                              </div>
                            </div>
                            <div
                              className={`${styles.followItem} ${styles.badge}`}
                            >
                              <div className={styles.key}>Following</div>
                              <div className={styles.value}>
                                {user.followings.length}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={`${styles.email} ${styles.textCommon}`}>
                        {user.email ? user.email : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={`${styles.phone} ${styles.textCommon}`}>
                        {user.phone ? user.phone : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={`${styles.bio} ${styles.textCommon}`}>
                        {user.bio ? user.bio : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.gender}>
                        {user.gender ? user.gender : "N/A"}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={`${styles.age} ${styles.textCommon}`}>
                        {user.birthDate ? (
                          <>{moment().diff(moment(user.birthDate), "years")}</>
                        ) : (
                          "N/A"
                        )}
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      {user.website ? user.website : "N/A"}
                    </td>
                    <td className={styles.tableCell}>
                      <UserRole role={user.role} />
                    </td>
                    <td className={styles.tableCell}>
                      <UserStatus status={user.status} />
                    </td>

                    <td className={styles.tableCell}>
                      <ButtonManageRecordTable
                        link={`${PATHS.AdminManageUsers}/${user.id}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}

      {typePage === ETypePageForTableUser.ManageUsersPage ? (
        <div className="d-flex align-items-center justify-content-end w-100 mt-4">
          <PaginationTable
            page={page}
            totalPage={totalPage}
            typePage={ETypePageForPagination.AdminManageUsers}
          />
        </div>
      ) : null}

      <ModalSuccess
        isOpen={archiveSuccess}
        handleClose={() => dispatch(clearArchiveUserSuccess())}
        message="Archive user successfully"
      />
    </div>
  );
};

export default TableUsers;
