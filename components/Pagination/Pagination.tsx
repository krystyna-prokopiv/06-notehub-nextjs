import * as ReactPaginateNS from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import type { ComponentType } from "react";
import css from './Pagination.module.css';

type ModuleWithDefault = { default?: ComponentType<ReactPaginateProps> };

const ReactPaginate = (
  (ReactPaginateNS as unknown as ModuleWithDefault).default
  ?? (ReactPaginateNS as unknown as ComponentType<ReactPaginateProps>)
);

interface PaginationProps {
    totalPages: number;
    page: number;
    setPage: (selected: number) => void;
}

export default function Pagination({ totalPages, page, setPage }: PaginationProps) {
    return (
        <ReactPaginate
            pageCount={totalPages}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            onPageChange={({ selected }) => setPage(selected + 1)}
            forcePage={page - 1}
            containerClassName={css.pagination}
            activeClassName={css.active}
            nextLabel="→"
            previousLabel="←"
        />
    );
}