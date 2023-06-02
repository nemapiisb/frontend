import React, { Component } from "react";

import UserService from "../services/user.service";
import imageSrc from "../imagenes/nema.png";
import logoSrc from "../imagenes/nmlogo.jpg";

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
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src={imageSrc} alt="Imagen" style={{ width: '100%', height: 'auto' }} />
          <img src={logoSrc} alt="Logo" style={{ width: '20%', height: 'auto' }} />
        </div>

    );
  }
}
