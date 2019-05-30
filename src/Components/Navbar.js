import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';



class Navbar extends Component {

  submitForm = (e) => {
    const value = e.target.movieName.value;
    e.preventDefault();
    this.props.history.push(`/search/${value}/1`);
  }

  render() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }}>
          <Link to="/" className="navbar-brand">Home</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor03">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/films-actuellement-au-cinema" className="nav-link"> Films au cinéma</Link>
              </li>
            </ul>
            <div>
              <form className="form-inline" onSubmit={this.submitForm}>
                <input className="form-control mr-sm-2" type="search" name="movieName" placeholder="Rechercher votre film" aria-label="Search" />
                <button className="btn btn-outline-primary my-2 my-sm-0" type="submit">Rechercher</button>
              </form>
            </div>
          </div>
        </nav>
    );
  }
}

export default withRouter(Navbar);