import React, { Component } from 'react';
import Input from './input';
import Joi from 'joi-browser';
import { getMovies, deleteMovie, saveMovie } from '../fakeMovieService';
import { getGenres } from '../fakeGenreService';
import axios from 'axios';
class MovieForm extends Component {
    state = {
        account: { name: '', numberInStock: '', dailyRentalRate: '', genreId: '' },
        genres: [],
        errors: {}
    }
    schema = {
        name: Joi.string().min(5).max(50).required().label("Movie Name").error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Movie Name should not be empty!";
                        break;
                    case "string.min":
                        err.message = `Movie Name should have at least ${err.context.limit} characters!`;
                        break;
                    case "string.max":
                        err.message = `Movie Name should have at most ${err.context.limit} characters!`;
                        break;
                    default:
                        break;
                }
            });
            return errors;
        }),
        genreId: Joi.number().integer().required().label("Genre"),
        numberInStock: Joi.number().integer().required().label('Stock').error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Stock should not be empty!";
                        break;
                    case "number.base":
                        err.message = "Stock must be a number";
                    case "number.integer":
                        err.message = "Stock must be a full number"
                    default:
                        break;
                }
            });
            return errors;
        }),
        dailyRentalRate: Joi.number().required().label('Rent').error(errors => {
            errors.forEach(err => {
                switch (err.type) {
                    case "any.empty":
                        err.message = "Rent should not be empty!";
                        break;
                    case "number.base":
                        err.message = "Rent must be a number";

                    default:
                        break;
                }
            });
            return errors;
        }),
    }

    handleSubmit = async e => {
        e.preventDefault(); //this avoids the full page reload/refresh
        const errors = this.validate();
        this.setState({ errors });
        if (Object.keys(errors).length > 0) return;
        let movie = { _id: this.props.match.params['id'], ...this.state.account };
        console.log('Movie before saving ' + JSON.stringify(movie));
        movie = { title: movie.name, ...movie }
        console.log('Movie after spread ' + JSON.stringify(movie));
        if (movie._id == 'new')
            await axios.post('http://localhost:8080/movies/save', {
                title: movie.name, numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate, genreId: movie.genreId
            });
        else
            await axios.put('http://localhost:8080/movies/update/' + movie._id, {
                title: movie.name, numberInStock: movie.numberInStock,
                dailyRentalRate: movie.dailyRentalRate, genreId: movie.genreId, _id: movie.id
            })
        //saveMovie(movie);
        this.props.history.push('/movies');
    }
    validate = () => {
        const result = Joi.validate(this.state.account, this.schema, { abortEarly: false }); //JOI library is used for form field validation
        //console.log('Result of JOI ' + JSON.stringify(result.error.details));
        let uniquemsg = '';
        let finalmsg = {};
        console.log('Result  ' + JSON.stringify(result));
        if (result.error) {
            console.log('All Errors ' + JSON.stringify(result.error.details));
            for (let message of result.error.details) {
                if (uniquemsg != message.context.label) {
                    uniquemsg = message.context.label;
                    console.log('message ' + JSON.stringify(message));
                    finalmsg[message.context.key] = message.message;

                }
            }
        }
        console.log('final message ' + JSON.stringify(finalmsg));

        return finalmsg;

        // return Object.keys(errors).length == 0 ? null : errors;
    }

    handleChange = e => {
        console.log(e.currentTarget.name);
        console.log(e.currentTarget.value);
        const account = { ...this.state.account };
        const errors = { ...this.state.errors };
        account[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ account });
    }
    populateGenreOptions = () => {

        return this.state.genres.map(genre =>
            <option value={genre.id}>{genre.name}</option>
        );
    }
    async componentDidMount() {
        let movieid = this.props.match.params['id'];
        let genres = await axios.get('http://localhost:8080//genre/getall');
        genres = genres.data;
        this.setState({ genres });
        if (movieid != 'new') {
            let movie = await axios.get('http://localhost:8080/movies/getmovie/' + movieid);

            let account = {};
            account.name = movie.data.title;
            account.numberInStock = movie.data.numberInStock;
            account.dailyRentalRate = movie.data.dailyRentalRate;
            account.genreId = movie.data.genre.id;
            this.setState({ account });
        }
    }
    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div class="col-md-2">

                    </div>
                    <div className="col-md-6">
                        <h3> Movie Form {this.props.match.params['id']} </h3>
                        <form onSubmit={this.handleSubmit}>
                            <Input type="text"
                                name="name"
                                label="Movie Name"
                                value={this.state.account.name}
                                onChange={this.handleChange}
                                placeholder="Enter Movie Name"
                                error={this.state.errors.name ? this.state.errors.name : ''} />
                            <div className="form-group">
                                <label>Genre</label>
                                <select className="form-control" name="genreId"
                                    value={this.state.account.genreId}
                                    onChange={this.handleChange}>
                                    {this.populateGenreOptions()}
                                </select>
                            </div>

                            <Input type="text"
                                name="numberInStock"
                                label="Number in Stock"
                                value={this.state.account.numberInStock}
                                onChange={this.handleChange}
                                placeholder="Enter Stock"
                                error={this.state.errors.stock ? this.state.errors.stock : ''} />
                            <Input type="text"
                                name="dailyRentalRate"
                                label="Rent"
                                value={this.state.account.dailyRentalRate}
                                onChange={this.handleChange}
                                placeholder="Enter Rent"
                                error={this.state.errors.rent ? this.state.errors.rent : ''} />
                            <div className="form-group">
                                <button
                                    className="btn btn-primary my-2 my-sm-0 m-1" onClick={this.handleSubmit}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>);
    }
}

export default MovieForm;