import React, { useState, useEffect } from 'react'

import Post from '../Components/Post'

interface IPostType {
    title: string,
    body: string,
    created_by: {
        firstName: string,
        lastName: string
    }
}

export default function() {
    // let posts: postType[] = []
    const [posts, setPosts] = useState<IPostType[]>([])


    useEffect(() => {
        fetch('/api/posts')
            .then(res => res.json())
            .then(({data}) => {
                setPosts(data.posts)
            })
    }, [])

    return (
        <main>
            <h1>Hello from reeeeaaacctt!!!</h1>
            {
                posts.length ? posts.map((post, i) => <Post key={i} data={post} />) : null
            }
        </main>
    )
}
