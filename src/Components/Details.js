import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import { Parallax } from 'react-parallax';
import YouTube from 'react-youtube';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import Slider from "react-slick";
import 'react-circular-progressbar/dist/styles.css';
import './Details.css';

const api_key = "api_key=98233e57334c8c1cb90aeb8b199223cf";

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            castings: [],
            videos: [],
        };
    }

    componentDidMount() {
        this.getMovie();
        this.getCastings();
        this.getVideos();
    }

    getCastings = async () => {
        const movie_id = this.props.match.params.id;

        const url = `https://api.themoviedb.org/3/movie/${movie_id}/credits?${api_key}&language=fr`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données
                this.setState({
                    castings: data,
                });
            });
        console.log('cast :', this.state.castings)
    }

    getMovie = async () => {

        const movie_id = this.props.match.params.id;

        const url = `https://api.themoviedb.org/3/movie/${movie_id}?${api_key}&language=fr&region=FR`;

        await fetch(url)
            .then(response => response.json())
            .then(data => {
                // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données
                this.setState({
                    movie: data,
                });
                console.log('movie :', this.state.movie)
            });
        //console.log(this.props.history.goBack())
    }

    getVideos = () => {
        const movie_id = this.props.match.params.id;
        const url = `https://api.themoviedb.org/3/movie/${movie_id}/videos?${api_key}&language=FR`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // Une fois les données récupérées, on va mettre à jour notre state avec les nouvelles données
                this.setState({
                    videos: data,
                });
                console.log('videos :', this.state.videos)
            });
    }

    goBack = (e) => {
        e.preventDefault();
        this.props.history.goBack()
    }

    render() {
        const movie = this.state.movie;
        const castings = this.state.castings;
        const videos = this.state.videos;
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 4
        };

        return (
            <>
                {movie.length !== 0 && castings.length !== 0 && videos.length !== 0 &&
                    <Parallax
                        bgImage={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                        bgImageAlt={movie.title}
                        strength={700}
                    >
                        <div className="container">
                            <div className="jumbotron">
                                <div className="text-center mt-2 mb-5">
                                    <h1>{movie.original_title}</h1>
                                    <h4><em>{movie.tagline}</em></h4>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">
                                        <figure>
                                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                                        </figure>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row align-items-center mb-4">
                                            <div className="col-md-6 border-right">
                                                <div className="row align-items-center">
                                                    <div className="col">
                                                        Note des utilisateurs
                                                <CircularProgressbar
                                                            value={movie.vote_average * 10}
                                                            text={`${movie.vote_average * 10}%`}
                                                            strokeWidth={10}
                                                            styles={buildStyles({ textSize: '28px' })} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row align-items-center">
                                                    <div className="col" >
                                                        Nombres de votes : <span className="border p-1 rounded-circle">{movie.vote_count}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col">
                                                Date de sortie : {moment(this.props.location.state.movie.release_date).format("Do MMMM YYYY")}
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col">
                                                Durée : {movie.runtime} min
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col">Genre :</div>
                                            {movie.genres.map((genre, index) => (<div key={index} className="col border text-center">{genre.name}</div>))}
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12 mb-2">Castings :</div>
                                            <div className="col">
                                                <Slider {...settings}>
                                                    {castings.cast.map((cast, index) =>
                                                        (
                                                            <div className="col" key={index}>
                                                                <div className="card">
                                                                    {cast.profile_path === null ?
                                                                        <img className="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg" alt="available" /> :
                                                                        <img className="card-img-top" src={`https://image.tmdb.org/t/p/w185/${cast.profile_path}`} alt={cast.name} />
                                                                    }
                                                                    <div className="card text-center">
                                                                        <h6 className="card-title"><strong>{cast.character}</strong></h6>
                                                                        <p className="card-text"><em>{cast.name}</em></p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </Slider>
                                            </div>
                                        </div>
                                        {movie.homepage &&
                                            <div className="row">
                                                <div className="col">Site Web : <a href={movie.homepage}>{movie.homepage}</a></div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <h3>Synopsis : </h3>
                                    </div>
                                    <div className="col">
                                        {movie.overview}
                                    </div>
                                </div>
                                <hr />
                                {videos.results[0] &&
                                    <>
                                        <h2 className="text-center mb-4">Bande annonce</h2>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <h5 className="text-center">{videos.results[0].name}</h5>
                                                <YouTube videoId={videos.results[0].key} opts={{ width: '100%', }} />
                                            </div>
                                            {videos.results[1] &&
                                                <div className="col-md-6">
                                                    <h5 className="text-center">{videos.results[1].name}</h5>
                                                    <YouTube videoId={videos.results[1].key} opts={{ width: '100%' }} />
                                                </div>
                                            }
                                        </div>
                                    </>
                                }
                                <button className="btn btn-primary" onClick={this.goBack}>Revenir en arriere</button>
                            </div>
                        </div>
                    </Parallax>
                }
            </>
        );
    }
}

export default Details