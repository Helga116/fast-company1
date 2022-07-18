import React, { useState } from 'react'
import Users from './components/users'
import SearchStatus from './components/searchStatus'
import api from './api'

function App() {
    const [users, setUsers] = useState(api.users.fetchAll())

    const [check, setChecked] = useState(false)

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookmark = (id) => {
        const newStatus = users.map((user) => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
                return { ...user }
            }
            return user
        })
        setChecked(newStatus)
    }

    return (
        <div className="App">
            <h2>
                <SearchStatus length={users.length} />
            </h2>
            <Users users={users} handleDelete={handleDelete} handleToggleBookmark={handleToggleBookmark} />
        </div>
    )
}

export default App
