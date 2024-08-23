import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from "firebase/firestore";
import { Post as IPost } from "./Home"
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import "../../styles/post.css"


interface Props {
	post: IPost;
}

interface Like {
	userId: string;
	likeId: string;
}

export const Post = (props: Props) => {
	const { post } = props;
	const [User] = useAuthState(auth);

	const [likes, setLikes] = useState<Like[] | null>(null)

	const likesRef = collection(db, "likes")

	const likesDoc = query(likesRef, where("postId", "==", post.id));

	const getLikes = async () => {
		const likesData = await getDocs(likesDoc)
		setLikes(likesData.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id})))
	}

	const addLike = async () => {
		try {
			const newDoc = await addDoc(likesRef, {
				userId: User?.uid,
				postId: post.id
			})
			if (User) {
				setLikes((prev) => prev ? [...prev, { userId: User?.uid, likeId: newDoc.id}] : [{ userId: User.uid,  likeId: newDoc.id}])
			}
		} catch (error) {
			console.error("Error adding like")
		}
	}

	const removeLike = async () => {
		try {
			const likeToDeleteQuery = query(
				likesRef,
				where("postId", "==", post.id), 
				where("userId", "==", User?.uid)
			)

			const likeToDeleteData = await getDocs(likeToDeleteQuery);

			const likeId = likeToDeleteData.docs[0].id

      const likeToDelete = doc(db, "likes", likeId)
			await deleteDoc(likeToDelete);

			if (User) {
				setLikes((prev) => prev && prev.filter((like) => like.likeId !== likeId))
			}
		} catch (error) {
			console.error("Error adding like")
		}
	}

	const hasUserLiked = likes?.find((like) => like.userId === User?.uid)

	useEffect(() => {
		getLikes()
	}, [])


	return (
		<div className="post">
			<div className="title">
				<h2>{post.title}</h2>
			</div>
			<div className="body">
				<p>{post.description}</p>
			</div>
			<div className="footer">
				<span>@{post.username}</span>
				<div className="likes">
					<button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
					{likes && <span>Likes: {likes?.length}</span>}
				</div>
			</div>
		</div>
	)
}