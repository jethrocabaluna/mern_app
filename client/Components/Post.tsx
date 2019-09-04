import React from 'react'

type propsTypes = {
    data: {
        title: string,
        body: string,
        created_by: {
            firstName: string,
            lastName: string
        }
    }
}

export default function({data} : propsTypes) {
    const { title, body, created_by } = data
    return (
        <div className="post">
            <h2>{title}</h2>
            <p>{body}</p>
            <p>{created_by.firstName}</p>
        </div>
    )
}