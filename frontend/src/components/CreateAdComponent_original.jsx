import React, { Component } from 'react'
import AdService from '../services/AdService';
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

class CreateAdComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2

            id: this.props.match.params.id,
            contenido: '',
            fecha: ''
        }
        this.changeContenidoHandler = this.changeContenidoHandler.bind(this);
        this.changeFechaHandler = this.changeFechaHandler.bind(this);
        this.saveOrUpdateAd = this.saveOrUpdateAd.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            AdService.getOne(this.state.id).then((res) => {
                let anuncio = res.data;
                this.setState({
                    contenido: anuncio.contenido,
                    fecha: anuncio.fecha
                });
            });
        }

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
    saveOrUpdateAd = (e) => {
        e.preventDefault();
        let anuncio = { contenido: this.state.contenido, fecha: this.state.fecha };
        console.log('anuncio => ' + JSON.stringify(anuncio));

        // step 5
        if (this.state.id === '_add') {
        AdService.createAd(anuncio).then(res => {
                this.props.history.push('/anuncios');
            });
        } else {
            AdService.updateAd(anuncio, this.state.id).then(res => {
                this.props.history.push('/anuncios');
            });
        }
    }

    changeContenidoHandler = (event) => {
        this.setState({ contenido: event.target.value });
    }

    changeFechaHandler = (event) => {
        this.setState({ fecha: event.target.value });
    }

    cancel() {
        this.props.history.push('/anuncios');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Añadir anuncio</h3>
        } else {
            return <h3 className="text-center">Modificar anuncio</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Contenido: </label>
                                        <input placeholder="Contenido" name="contenido" className="form-control"
                                            value={this.state.contenido} onChange={this.changeContenidoHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Fecha: </label>
                                        <input placeholder="fecha" name="fecha" className="form-control"
                                            value={this.state.fecha} onChange={this.changeFechaHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateAd}>Guardar</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancelar</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateAdComponent
