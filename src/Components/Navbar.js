import React, { Component } from "react";
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
} from "mdbreact";
import { Link, withRouter } from 'react-router-dom';


class Navbar extends Component {



    submitForm = (e) => {
        const value = e.target.movieName.value;
        e.preventDefault();
        this.props.history.push(`/search/${value}/1`);
        window.location.reload();
    }

    render() {
        return (
            <MDBNavbar color="indigo" dark expand="md" fixed="top">
                <MDBNavbarBrand>
                    <Link to="/"><strong className="white-text">Home</strong></Link>
                </MDBNavbarBrand>
                <MDBNavbarToggler />
                <MDBCollapse navbar>
                    <MDBNavbarNav left>
                        <MDBNavItem active>
                            <Link to="/films-actuellement-au-cinema" className="white-text">Films au cinéma</Link>
                        </MDBNavItem>
                    </MDBNavbarNav>
                    <MDBNavbarNav right>
                        <MDBNavItem>
                            <MDBFormInline onSubmit={this.submitForm} waves>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text"><i className="fas fa-search"></i></div>
                                    </div>
                                    <input type="text" className="form-control" name="movieName" placeholder="Rechercher votre film" />
                                </div>
                            </MDBFormInline>
                        </MDBNavItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar >
        );
    }
}

export default withRouter(Navbar);