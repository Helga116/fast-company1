import React from 'react'

const User = (props) => {
    console.log(props)
    return (
        <tr key={props._id}>
            <td>{props.name}</td>
            <td>
                {props.qualities.map((item) => (
                    <span
                        className={'badge m-1 bg-' + item.color}
                        key={item._id}
                    >
                        {item.name}
                    </span>
                ))}
            </td>
            <td>{props.profession.name}</td>
            <td>{props.completedMeetings}</td>
            <td>{props.rate} /5</td>
            <td>{props.bookmark}</td>
            <td>
                <button
                    onClick={() => props.handleDelete(props._id)}
                    className="btn btn-danger"
                >
                    delete
                </button>
            </td>
        </tr>
    )
}

export default User
