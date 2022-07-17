import React, { useState } from 'react'
import api from '../api'
import Bookmark from './bookmark'
import Quality from './quality'
import SearchStatus from './searchStatus'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const [check, setChecked] = useState(false)

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        const newStatus = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
                console.log(user._id, id, user.bookmark)
                return { ...user }
            }
            return user
        })
        setChecked(newStatus)
    }

    return (
        <>
            <h2>
                <SearchStatus length={users.length} />
            </h2>

            {users.length > 0 && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Имя</th>
                            <th scope="col">Качества</th>
                            <th scope="col">Профессия</th>
                            <th scope="col">Встретился, раз</th>
                            <th scope="col">Оценка</th>
                            <th scope="col">Избранное</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>
                                    {user.qualities.map((item) => (
                                        <Quality
                                            key={item._id}
                                            id={item._id}
                                            name={item.name}
                                            color={item.color}
                                        />
                                    ))}
                                </td>
                                <td>{user.profession.name}</td>
                                <td>{user.completedMeetings}</td>
                                <td>{user.rate} /5</td>
                                <td>
                                    <Bookmark
                                        key={user._id}
                                        id={user._id}
                                        status={user.bookmark}
                                        {...user}
                                        onClick={handleToggleBookmark}
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user._id)}
                                        className="btn btn-danger"
                                    >
                                        delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}

export default Users
