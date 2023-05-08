import React, { Component } from "react";

import UserService from "../services/user.service";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron" data-test="home-header-test">
            <h1>Bienvenidos a Neighbors Manager [NEMA]</h1>
        </header>
        <p>En esta pagina estaria interesante informar de la utilizacion de la web y de que comunidad de vecinos pertenece</p>
      </div>
    );
  }
}
