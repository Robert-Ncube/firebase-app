import {getDocs, collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase"
import { useEffect, useState } from "react"
import {Post} from "./Post"

export interface Post {
    likes: any;
    id: string;
    title: string;
    description: string;
    username: string;
    userId: string;
    createdAt: any; // firebase timestamp or Date object
}

export const Home = () => {
    const [posts, setPosts] = useState<Post[] | null>(null)
    const postsRef = collection(db, "posts")

    const getPosts = async () => {
        const postsSnap = await getDocs(postsRef)
        const postsData = postsSnap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id,
        }) as Post)
        setPosts(postsData)
    }

    useEffect(() => {
        getPosts()
    }, [])

    return(
        <div>
            {posts?.map((post) => (
                <Post post={post}/>
            ))}
        </div>
    )
}