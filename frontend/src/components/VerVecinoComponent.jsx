import React, { Component } from 'react'
import VecinoService from "../services/VecinoService";

class VerVecinoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            vecino: {}
        }
    }

    componentDidMount(){
        VecinoService.getVecinoById(this.state.id).then( res => {
            this.setState({vecino: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> Ver detalles del Vecino</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Nombre del Vecino: </label>
                            <div> { this.state.vecino.nombre }</div>
                        </div>
                        <div className = "row">
                            <label> Apellido del Vecino: </label>
                            <div> { this.state.vecino.apellido }</div>
                        </div>
                        <div className = "row">
                            <label> Comunidad del Vecino: </label>
                            <div> { this.state.vecino.comunidad }</div>
                        </div>
                        <div className = "row">
                            <label> Email : </label>
                            <div> { this.state.vecino.email }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default VerVecinoComponent
