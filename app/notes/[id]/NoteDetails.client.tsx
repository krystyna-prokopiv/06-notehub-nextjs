'use client'

import { useState } from "react"
import { useParams } from "next/navigation"
import { useQuery } from '@tanstack/react-query'
import { fetchNotesById } from "@/lib/api"
import css from './NoteDetails.client.module.css'

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>()

    const [isEdit, setIsEdit] = useState<boolean>(false)

    const noteQ = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNotesById(id),
        refetchOnMount: false
    })

     const toggleEdit = () => {
    setIsEdit((prevIsEdit) => !prevIsEdit);
  };


    return (
        <>
            {noteQ.isSuccess &&
                <div className={css.container}>
                    <div className={css.item}>
                        <div className={css.header}>
                            <h2>{noteQ.data?.title}</h2>
                        </div>
                        <p className={css.tag}>{noteQ.data?.tag}</p>
                        <p className={css.content}>{noteQ.data?.content}</p>
                        <p className={css.date}>{noteQ.data?.createdAt}</p>
                    </div>
                </div>}
            {noteQ.isError && <p>Loading, please wait...</p>}
            {noteQ.isLoading && <p>Something went wrong.</p>}
        </>
    )


}
