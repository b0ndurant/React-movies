import React, { Component } from 'react';
import { MDBMask, MDBView, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import localeInfo from 'rc-pagination/lib/locale/fr_FR';
import Pagination from 'rc-pagination';

import 'rc-pagination/assets/index.css';
import './Search.css'



const api_key = "api_key=98233e57334c8c1cb90aeb8b199223cf"

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            totalPages: null,
            currentPage: this.props.match.params.pageIndex || 1,
        }
    }

    componentDidMount() {
        this.getMovies(this.props.match.params.title)
    }

    componentWillReceiveProps = (nextProps)=> {
        if (nextProps.location.pathname !== this.props.location.pathname) {
            window.location.reload();
        }
    }

    onChange = (page) => {
        const title = this.props.match.params.title;
        this.setState({
            currentPage: page,
        });
        const target = `/search/${title}/${page}`;
        this.props.history.push({
            pathname: target,
        });
        this.getMovies(title)
    }

    getMovies = (valueMovie) => {
        const currentPage = this.state.currentPage

        const url = `https://api.themoviedb.org/3/search/movie?${api_key}&language=fr-FR&query=${valueMovie}&page=${currentPage}&include_adult=false&region=FR`;

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
            <div className="container mt-5">
                <h1 className="text-center">Resultat trouvée pour <span className="result">{this.props.match.params.title}</span></h1>
                <MDBRow className="mt-5">
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
                <div className="row justify-content-center">
                    <div className="col-md-auto">
                        <Pagination
                            showQuickJumper
                            onChange={this.onChange}
                            current={parseInt(this.state.currentPage)}
                            total={this.state.totalPages * 10}
                            locale={localeInfo}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Search;