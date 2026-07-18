"use client"

import { useState, } from 'react'
import { fetchNotes } from '@/lib/api'  
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useDebouncedCallback } from 'use-debounce'
import css from '@/components/NotesPage/NotesPage.module.css'
import NoteList from '@/components/NoteList/NoteList'
import type { NotesQueryParams } from '@/lib/api'
import Pagination from '@/components/Pagination/Pagination'
import Modal from '@/components/Modal/Modal'
import NoteForm from '@/components/NoteForm/NoteForm'
import SearchBox from '@/components/SearchBox/SearchBox'


function NotesClient() {
  const [search, setSearch] = useState<NotesQueryParams>({
     search: '',
  page: 1,
    perPage: 10,
    tag: 'Todo',
    sortBy: 'created',
  })

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const { data, isSuccess } = useQuery({
    queryKey: ['notes', search],
    queryFn: () => fetchNotes(search),
    placeholderData: keepPreviousData
  })
  
  const totalPages = data?.totalPages ?? 0
  const closeModal = () =>  setIsModalOpen(false) 
  
  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleSearchInput = useDebouncedCallback( (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch((prev)=> ({
      ...prev,
      search: event.target.value,
  page: 1,
    }))
  }, 1000)
  const handlePageChange = (newPage: number) => {
    setSearch((prev) => ({
      ...prev,
      page: newPage,
    }))
  }

  return (
    
      <div className={css.app}>
      <header className={css.toolbar}
      > 
        <SearchBox defaultValue={search.search ?? ''} onChange={handleSearchInput}  />
        {isSuccess && totalPages > 0 && <Pagination page={search.page} setPage={handlePageChange} totalPages={totalPages} />}
        <button className={css.button} onClick={handleClick}>Create note +</button>
      </header>
      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
      {isModalOpen && <Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}/>
      </Modal> }
</div>

  )
}

export default NotesClient