import React from "react";
import PropTypes from "prop-types";
import Bookmark from "../common/bookmark";
import Qualities from "./qualities/qualitiesList";
import Table, { TableBody, TableHeader } from "../common/table";
import { Link } from "react-router-dom";

const UserTable = ({
    users,
    selectedSort,
    onSort,
    handleDelete,
    handleToggleBookmark
}) => {
    const columns = {
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link key={user._id} to={`users/${user._id}`}>
                    {user.name}
                </Link>
            )
        },
        qualities: {
            name: "Качества",
            component: (user) => <Qualities qualities={user.qualities} />
        },
        professions: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <Bookmark
                    key={user._id}
                    id={user._id}
                    {...user}
                    status={user.bookmark}
                    onClick={handleToggleBookmark}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            )
        }
    };
    return (
        <Table>
            <TableHeader {...{ onSort, selectedSort, columns }} />
            <TableBody {...{ columns, data: users }} />
        </Table>
    );
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    handleToggleBookmark: PropTypes.func.isRequired,
    handleDelete: PropTypes.func,
    selectedSort: PropTypes.object.isRequired
};

export default UserTable;
