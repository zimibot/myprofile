import ReactPaginate from 'react-paginate';

export const Paggination = ({ pageCount = 200, pageNext, initialPage = 0 }) => {
    let pageClass = 'bg-slate-200 shadow p-2 px-3 rounded hover:bg-cyan-500 hover:text-white block'
    return (<ReactPaginate
        breakLabel="..."
        className='flex items-center gap-2'
        pageLinkClassName={pageClass}
        initialPage={initialPage}
        activeLinkClassName='bg-cyan-500 text-white'
        nextLabel="NEXT"
        nextLinkClassName={pageClass}
        disabledLinkClassName="bg-slate-500 hover:!bg-slate-500 !text-black cursor-not-allowed"
        previousLinkClassName={pageClass}
        onPageChange={pageNext}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="PREVIOUS"
        renderOnZeroPageCount={null}
    />)
}