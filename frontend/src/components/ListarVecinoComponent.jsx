import React, { Component } from 'react'
import VecinoService from "../services/VecinoService";

class ListarVecinoComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                vecinos: []
        }
        this.addVecino = this.addVecino.bind(this);
        this.editVecino = this.editVecino.bind(this);
        this.deleteVecino = this.deleteVecino.bind(this);
    }

    deleteVecino(id){
        VecinoService.deleteVecino(id).then( res => {
            this.setState({vecinos: this.state.vecinos.filter(vecino => vecino.id !== id)});
        });
    }
    viewVecino(id){
        this.props.history.push(`/view-vecino/${id}`);
    }
    editVecino(id){
        this.props.history.push(`/add-vecino/${id}`);
    }

  componentDidMount(){
        VecinoService.getVecinos().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-vecino/_add');
            }
            this.setState({ vecinos: res.data});
        });
    }

    addVecino(){
        this.props.history.push('/add-vecino/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Lista de vecinos:</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addVecino}> Añadir Vecino </button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> Nombre del vecino</th>
                                    <th> Apellido del vecino</th>
                                    <th> Comunidad a la que pertenece el vecino</th>
                                    <th> Email del vecino</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.vecinos.map(
                                        vecino =>
                                        <tr key = {vecino.id}>
                                             <td> { vecino.nombre} </td>
                                             <td> {vecino.apellido}</td>
                                             <td> {vecino.comunidad}</td>
                                             <td> {vecino.email}</td>
                                             <td>
                                                 <button onClick={ () => this.editVecino(vecino.id)} className="btn btn-info">Update </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteVecino(vecino.id)} className="btn btn-danger">Borrar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.viewVecino(vecino.id)} className="btn btn-info">Ver detalles </button>
                                             </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>

                 </div>

            </div>
        )
    }
}

export default ListarVecinoComponent
