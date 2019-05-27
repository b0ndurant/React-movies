import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import movieDetails from "./MovieDetails";
import Movies from "./Movies";
import MoviesCurrently from "./MoviesCurrently";
import Search from "./Search";
import Navbar from "./Navbar";

class Router extends Component {

    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/" component={Movies} />
                    <Route path="/page/:pageIndex" component={Movies} />
                    <Route exact path="/films-actuellement-au-cinema" component={MoviesCurrently} />
                    <Route exact path="/films-actuellement-au-cinema/:pageIndex" component={MoviesCurrently} />
                    <Route path="/search/:title/:pageIndex" component={Search} />
                    <Route path="/movie/:id" component={movieDetails} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default Router