import React, { Component } from 'react';
import { getMovies, deleteMovie } from './fakeMovieService';
import { getGenres } from './fakeGenreService';
import Pagination from './components/common/pagination';
import propTypes from 'prop-types';
import { ListGroup } from './components/common/ListGroup';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Movies extends Component {
    state = {
        movies: [],
        genres: [],
        pageSize: propTypes.number = 4,
        currentPage: propTypes.number = 1,
        selectedGenre: 0,
        sortOrder: 'asc'
    }

    async componentDidMount() {
        const genres = await axios.get('http://localhost:8080//genre/getall');

        const movies = await axios.get('http://localhost:8080//movies/getall');


        this.setState({ genres: genres.data });
        this.setState({ movies: movies.data })
        //console.log('genres ' + JSON.stringify(this.state.genres.length));
    }
    handlePageChange = page => {
        this.setState({ currentPage: page });
        console.log(page);
    }
    handleGenreSelect = moviename => {
        this.setState({ selectedGenre: moviename });
    }
    removeMovie = async (id) => {
        await axios.delete('http://localhost:8080/movies/delete/' + id);
        this.props.history.push('/');
        /*const movies = this.state.movies.filter(movie => id !== movie._id);
        this.setState({ movies })*/
    }
    getMoviesPerPage() {

        return this.state.movies.slice((this.state.currentPage - 1) * this.state.pageSize, this.state.currentPage * this.state.pageSize);
    }
    getMovieRecords() {
        return this.getMoviesPerPage().map(movie =>
            <tr><td><Link to={`/movie/${movie._id}`}> {movie.title}</Link></td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td><button onClick={() => this.removeMovie(movie._id)} className="btn btn-danger">Delete</button></td>
            </tr >);
    }

    handleSort = (columnname, subcolumnname) => {
        let sortOrder = this.state.sortOrder == 'asc' ? 'desc' : 'asc';
        this.setState({ sortOrder })
        const sortedMovies = this.state.movies.sort((a, b) => {
            a = subcolumnname == '' ? a[columnname] : a[columnname][subcolumnname]
            b = subcolumnname == '' ? b[columnname] : b[columnname][subcolumnname]
            if (this.state.sortOrder == 'asc') {
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            }
            else {
                if (a < b) return 1;
                if (a > b) return -1;
                return 0;
            }
        })

    }

    getTotalPages() {
        const totalPages = Math.ceil(this.state.movies.length / this.state.pageSize);
        let a = new Array(totalPages);
        for (let i = 0; i < a.length; i++) {
            a[i] = i;
        }
        return a;
    }
    render() {
        const { length: count } = this.state.movies;
        return (
            <div className="row">
                <div className="col-2 sticky-top">
                    <ListGroup genreList={this.state.genres} onItemSelect={this.handleGenreSelect} genreSelected={this.state.selectedGenre} />
                </div>
                <div className="col">
                    <div className="container">
                        <Link to='/movie/new'><button className='btn btn-primary'>Add Movie</button></Link>
                        <p style={{ fontWeight: "bold" }}>{count > 0 ? `Showing ${count} movies in the DB` : 'There are no movies'}</p>
                        <input type="text" className="form-control" placeholder="Search....."></input>
                        {count !== 0 &&
                            <table className="table  table-striped table-hover">
                                <tr>
                                    <th onClick={() => this.handleSort('title', '')}>Title</th>
                                    <th onClick={() => this.handleSort('genre', 'name')}>Genre</th>
                                    <th onClick={() => this.handleSort('numberInStock', '')}>Stock</th>
                                    <th onClick={() => this.handleSort('dailyRentalRate', '')}>Rate</th>
                                    <th></th>
                                </tr>
                                <tbody>
                                    {this.getMovieRecords()}
                                </tbody>
                            </table>}
                        <Pagination itemsCount={count} pageSize={this.state.pageSize} movies={this.state.movies}
                            noOfPages={this.getTotalPages()} currentPage={this.state.currentPage} onPageChange={this.handlePageChange}></Pagination>
                    </div>

                </div>

            </div >
        );

    }
}

export default Movies;
