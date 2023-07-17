import React, { useEffect, useState } from "react";
import styles from "./tableUsers.module.scss";
import { Form, Table } from "react-bootstrap";
import { EUserStatus, IUser } from "@/features/interface";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getAllUsers } from "@/features/admin/user/userAction";
import { ProgressSpinner } from "primereact/progressspinner";
import { nanoid } from "@reduxjs/toolkit";
import { ETypeTabUserFilter } from "@/components/Admin/interface";
import NoneData from "@/components/shared/NoneData/NoneData";
import moment from "moment";
import UserRole from "@/components/Admin/Badges/UserRole/UserRole";
import UserStatus from "@/components/Admin/Badges/UserStatus/UserStatus";
type Props = {};

const TableUsers = ({}: Props) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.adminUser);

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
    limit: 2,
    page: 1,
    name: "",
    status: "",
    verified: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        setLoadingGetUsers(true);
        Promise.all([dispatch(getAllUsers(filters)).unwrap()]);
        setLoadingGetUsers(false);
      } catch (error) {
        setLoadingGetUsers(false);
      }
    }
    getData();
  }, [filters]);

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.tabFilters}>
        {tabFilters.map((tab) => (
          <div
            className={`${styles.tabItem} ${
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
              limit: 2,
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
          <div className="iconSearch"></div>
          <Form.Control
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            placeholder="enter a name"
          />
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
                        <div className={styles.avatar}>
                          <img
                            src={
                              user.avatar
                                ? user.avatar
                                : "/images/avatar-placeholder.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className={styles.info}>
                          <div className={styles.name}>{user.name}</div>
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
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </>
      )}
    </div>
  );
};

export default TableUsers;
