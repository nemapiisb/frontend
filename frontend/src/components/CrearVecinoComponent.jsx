import React, { Component } from 'react'
import vecinoService from '../services/VecinoService';

class CrearVecinoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            nombre: '',
            apellido: '',
            comunidad: '',
            email: ''
        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.saveOrUpdatevecino = this.saveOrUpdatevecino.bind(this);
    }

    // step 3
    componentDidMount() {

        // step 4
        if (this.state.id === '_add') {
            return
        } else {
            vecinoService.getvecinoById(this.state.id).then((res) => {
                let vecino = res.data;
                this.setState({
                    firstName: vecino.firstName,
                    lastName: vecino.lastName,
                    emailId: vecino.emailId
                });
            });
        }
    }
    saveOrUpdateVecino = (e) => {
        e.preventDefault();
        let vecino = { firstName: this.state.firstName, lastName: this.state.lastName, emailId: this.state.emailId };
        console.log('vecino => ' + JSON.stringify(vecino));

        // step 5
        if (this.state.id === '_add') {
            vecinoService.crearVecino(vecino).then(res => {
                this.props.history.push('/vecinos');
            });
        } else {
            vecinoService.updateVecino(vecino, this.state.id).then(res => {
                this.props.history.push('/vecinos');
            });
        }
    }

    changeNameHandler = (event) => {
        this.setState({ nombre: event.target.value });
    }

    changeLastNameHandler = (event) => {
        this.setState({ apellido: event.target.value });
    }

    changeCommunityHandler = (event) => {
        this.setState({ comunidad: event.target.value });
    }

    changeEmailHandler = (event) => {
        this.setState({ email: event.target.value });
    }

    cancel() {
        this.props.history.push('/vecinos');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Añadir vecino</h3>
        } else {
            return <h3 className="text-center">Modificar vecino</h3>
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
                                        <label> First Name: </label>
                                        <input placeholder="First Name" name="firstName" className="form-control"
                                            value={this.state.nombre} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Last Name: </label>
                                        <input placeholder="Last Name" name="lastName" className="form-control"
                                            value={this.state.apellido} onChange={this.changeLastNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Comunidad: </label>
                                        <input placeholder="Comunidad" name="comunidad" className="form-control"
                                            value={this.state.comunidad} onChange={this.changeCommunityHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Email Id: </label>
                                        <input placeholder="Email Address" name="emailId" className="form-control"
                                            value={this.state.email} onChange={this.changeEmailHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveOrUpdateVecino}>Guardar</button>
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

export default CrearVecinoComponent
