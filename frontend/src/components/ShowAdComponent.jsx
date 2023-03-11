import React, { Component } from 'react'
import AdService from "../services/AdService";

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
                            <div> { this.state.anuncio.contenido }</div>
                        </div>
                        <div className = "row">
                            <label> Fecha del Anuncio: </label>
                            <div> { this.state.anuncio.fecha }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ShowAdComponent
