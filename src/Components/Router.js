import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Details from "./Details";
import MoviesOfMonth from "./MoviesOfMonth";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" component={MoviesOfMonth} exact strict/>
                <Route path="/page/:pageIndex" component={MoviesOfMonth} exact />
                <Route path="/movie/:id" component={Details} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router