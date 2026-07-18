import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotesById } from '@/lib/api'
import NoteDetailsClient from "./Notes.client";

interface NoteDetailsProps{
    params: Promise<{id: string}>
}

export default async function NoteDetails({params}:NoteDetailsProps) {
    const queryClient = new QueryClient()
    const {id} = await params

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: ()=>fetchNotesById(id)
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    )
}