import React, { useState, useEffect } from "react";
import { paginate } from "../../../../utils/paginate";
import Pagination from "../../pagination";
import api from "../../../../api";
import GroupList from "../../groupList";
import SearchStatus from "../../../ui/searchStatus";
import UserTable from "../../../ui/usersTable";
import _ from "lodash";
import SearchUser from "../../../searchUser";
import { useUser } from "../../../../hooks/useUser";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfession] = useState([]);
    const [selectedProf, setSelectedProf] = useState();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(true);
    const users = useUser();
    useEffect(() => {
        api.professions
            .fetchAll()
            .then((data) => setProfession(data))
            .finally(() => setIsLoading(false));
    }, []);

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId));
        console.log(userId);
    };

    const handleToggleBookmark = (id) => {
        const newUsers = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newUsers);
        console.log(newUsers);
    };
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);
    const handleProfessionSelect = (item) => {
        setSearchQuery("");
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
        setSelectedProf();
        setSearchQuery(value);
    };

    if (!isLoading) {
        const filteredUsers =
            searchQuery !== ""
                ? users.filter((user) => {
                      return user.name.toLowerCase().includes(searchQuery);
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
            setSearchQuery("");
            setSelectedProf();
        };
        const clearFilter = () => {
            setSelectedProf();
            setSearchQuery("");
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
                        searchQuery={searchQuery}
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

export default UsersListPage;
