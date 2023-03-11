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
