import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import PropTypes from "prop-types";
import api from "../api";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UserTable from "./usersTable";
import _ from "lodash";
import SearchUser from "./searchUser";

const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [searchedUsers, setSearchedUsers] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [users, setUsers] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) => setProfession(data))
            .finally(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data));
    }, []);
    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        setUsers(newUsers);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };
    const handleSearchUserChange = (e) => {
        const { value } = e.target;
        setSearchedUsers(value);
    };

    if (!isLoading) {
        const filteredUsers =
            searchedUsers !== undefined
                ? users.filter((user) => {
                      return user.name.toLowerCase().includes(searchedUsers);
                  })
                : selectedProf
                ? users.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : users;
        const count = filteredUsers.length;
        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        );
        const userCrop = paginate(sortedUsers, currentPage, pageSize);
        const clearSearch = () => {
            setSearchedUsers(undefined);
            setSelectedProf();
        };
        const clearFilter = () => {
            setSelectedProf();
            setSearchedUsers(undefined);
        };

        return (
            <div className="d-flex">
                {professions && (
                    <d-flex className="flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </d-flex>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <SearchUser
                        onChange={handleSearchUserChange}
                        onClick={clearSearch}
                    />
                    {count > 0 && (
                        <UserTable
                            users={userCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            handleDelete={handleDelete}
                            handleToggleBookmark={handleToggleBookmark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        );
    }
    return "loading...";
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired,
    handleDelete: PropTypes.func,
    handleToggleBookmark: PropTypes.func
};

export default UsersList;
