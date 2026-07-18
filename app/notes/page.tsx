import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from '@/lib/api'
import NotesClient from "./Notes.client/Notes.client";

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', { search: '', page: 1, perPage: 10, tag: 'Todo', sortBy: 'created' }],
    queryFn: () => fetchNotes({ search: '', page: 1, perPage: 10, tag: 'Todo', sortBy: 'created' }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}