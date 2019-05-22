import React, { Component } from 'react';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './MoviesOfMonth.css';

class MoviesOfMonth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            totalPages: null,
            currentPage: this.props.match.params.pageIndex || 1,
        }
    }

    onChange = async (page) => {
        await this.setState({
            currentPage: page,
        });
        const target = `/page/${page}`;
        this.props.history.push({
            pathname: target,
        });
        this.getMovies()
    }

    componentDidMount() {
        window.onpopstate = function (event) {
            window.location.reload();
        };
        this.getMovies()
    }

    getMovies = () => {
        const api_key = "api_key=98233e57334c8c1cb90aeb8b199223cf"
        const currentPage = this.state.currentPage

        const url = `https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2019-05-01&primary_release_date.lte=2019-05-29&${api_key}&page=${currentPage}&language=fr&region=FR`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données
                this.setState({
                    movies: data.results,
                    totalPages: data.total_pages,
                });
            });
    }

    render() {
        return (
            <MDBContainer className="mt-5">
                <h1 className="text-center">Films du mois</h1>
                <MDBRow className="mt-4">
                    {this.state.movies.map((movie, index) => (
                        <MDBCol md="3" key={index}>
                            <Link to={{ pathname: `/movie/${movie.id}`, state: { movie } }}>
                                <MDBView hover zoom>
                                    {movie.poster_path === null ?
                                        <img src={`https://standardsw.com/wp-content/uploads/2018/07/no-image-icon-21.png`} alt={movie.title} title={movie.title} className="h-100" /> :
                                        <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`} alt={movie.title} title={movie.title} className="img-fluid" />
                                    }
                                    <MDBMask className="flex-center" overlay="black-strong">
                                        <p className="white-text text-center font-weight-bold">{movie.title}</p>
                                    </MDBMask>
                                </MDBView>
                            </Link>
                        </MDBCol>
                    ))}
                </MDBRow>
                <MDBRow>
                    <MDBCol>
                        <Pagination onChange={this.onChange} current={parseInt(this.state.currentPage)} total={this.state.totalPages * 10} />
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default MoviesOfMonth;