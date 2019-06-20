import React, { Component } from 'react';

export const ListGroup = props => {
    const genres = () => {

        return props.genreList.map(genre =>
            <li key={genre._id} className={props.genreSelected == genre.name ? "list-group-item active" : "list-group-item"}
                onClick={() => props.onItemSelect(genre.name)}>{genre.name}</li>
        );

    }
    return (
        <ul class="list-group">
            {genres()}
        </ul>
    );
}