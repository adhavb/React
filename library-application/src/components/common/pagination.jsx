import React, { Component } from 'react';


function Pagination(props) {
    const getPagination = () => {
        let totalPages = [...props.noOfPages]
        return totalPages.map(page =>
            <li class={props.currentPage == page + 1 ? "page-item active" : "page-item"}><a class="page-link" onClick={() => props.onPageChange(page + 1)}>{page + 1}</a></li>);
        //return 1;
    }
    return (
        < React.Fragment >
            {props.noOfPages.length > 1 &&
                <ul class="pagination justify-content-center">
                    <li class="page-item"><a class="page-link" >&laquo;</a></li>
                    {getPagination()}
                    <li class="page-item"><a class="page-link" >&raquo;</a></li>
                </ul >}
        </React.Fragment >
    );

}
export default Pagination;