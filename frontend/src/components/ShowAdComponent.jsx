import React, { Component } from 'react'
import AdService from "../services/AdService";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

class ShowAdComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            anuncio: {}
        }
    }

    componentDidMount(){
        AdService.getOne(this.state.id).then( res => {
            this.setState({anuncio: res.data});
        })

        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_PORTERO"),
                showAdminUpdateAd: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Ver detalles del Anuncio</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Contenido del Anuncio: </label>
                        </div>
                        <div><p>{ this.state.anuncio.contenido }</p></div>
                        <div className = "row">
                            <label> Fecha del Anuncio:<br /> </label>
                        </div>
                        <div> <p> { this.state.anuncio.fecha }</p></div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ShowAdComponent
