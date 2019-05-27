import React, { Component } from 'react';
import { MDBMask, MDBView, MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import { Link } from 'react-router-dom';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import './Movies.css';

const api_key = "api_key=98233e57334c8c1cb90aeb8b199223cf"

class Movies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            totalPages: null,
            currentPage: this.props.match.params.pageIndex || 1,
        }
        console.log('const')
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

    submitForm = (e) => {
        const value = e.target.movieName.value;
        e.preventDefault();
        this.props.history.push({
            pathname: `/search/${value}/1`,
        })
    }

    componentDidMount() {
        window.onpopstate = function (event) {
            window.location.reload();
        };
        this.getMovies()
        let today = new Date();
        let dd = today.getDate();
        let mm = (today.getMonth() + 1) <10 ? '0'+(today.getMonth() + 1) : (today.getMonth() + 1) ;
        let yyyy = today.getFullYear();
        console.log(yyyy+'-'+mm+'-'+dd)
    }

    getMovies = () => {
        const currentPage = this.state.currentPage

        const url = `https://api.themoviedb.org/3/discover/movie?release_date.lte=2019-05-27&${api_key}&page=${currentPage}&language=fr&region=FR&with_type_release=2|3&sort_by=release_date.desc`;

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
            <MDBContainer>
                <h1 className="text-center">Films</h1>
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
                    <div className="col-md-4 text-center">
                        <Pagination onChange={this.onChange} current={parseInt(this.state.currentPage)} total={this.state.totalPages * 10} />
                    </div>
                </div>
            </MDBContainer>
        );
    }
}

export default Movies;