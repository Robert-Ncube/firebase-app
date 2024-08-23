import {useForm} from "react-hook-form"
import * as yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"
import "../../styles/form.css"
import {addDoc, collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import {useNavigate} from "react-router-dom"

interface CreateFormData{
    title: string;
    description: string;
}

export const CreateForm = () => {

    const [User] = useAuthState(auth)
    const navigate = useNavigate()

    const schema = yup.object().shape({
        title: yup.string().required("Please add a title!"),
        description: yup.string().required("Please add a message!"),
    })

    const {register, handleSubmit, formState: {errors}} = useForm<CreateFormData>({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts")

    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            ...data,
            username: auth.currentUser?.displayName,
            userId: auth.currentUser?.uid
        })
        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit(onCreatePost)}>
            <input type="text" placeholder="title..." {...register("title")}/>
            <p style={{color: "red"}}>{errors.title?.message}</p>
            <textarea placeholder="description..." {...register("description")}></textarea>
            <p style={{color: "red"}}>{errors.description?.message}</p>
            <input type="submit" />
        </form>
    )
}

