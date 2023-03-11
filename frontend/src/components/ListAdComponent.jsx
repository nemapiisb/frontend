import React, { Component } from 'react'
import AdService from "../services/AdService";

class ListAdComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                anuncios: []
        }
        this.addAd = this.addAd.bind(this);
        this.editAd = this.editAd.bind(this);
        this.deleteAd = this.deleteAd.bind(this);
    }

    deleteAd(id){
        AdService.deleteAd(id).then( res => {
            this.setState({anuncios: this.state.anuncios.filter(anuncio => anuncio.id !== id)});
        });
    }
    getOne(id){
        this.props.history.push(`/${id}`);
    }
    editAd(id){
        this.props.history.push(`/add-ad/${id}`);
    }
  componentDidMount(){
        AdService.getAll().then((res) => {
            if(res.data==null)
            {
                this.props.history.push('/add-ad/_add');
            }
            this.setState({ anuncios: res.data});
        });
    }

    addAd(){
        this.props.history.push('/add-ad/_add');
    }

    render() {
        return (
            <div>
                 <h2 className="text-center">Lista de anuncios:</h2>
                 <div className = "row">
                    <button className="btn btn-primary" onClick={this.addAd}> Añadir Anuncio </button>
                 </div>
                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered">

                            <thead>
                                <tr>
                                    <th> ID del anuncio</th>
                                    <th> Contenido del anuncio</th>
                                    <th> Fecha del anuncio</th>
                                    <th> Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.anuncios.map(
                                        anuncio =>
                                        <tr key = {anuncio.id}>
                                             <td> {anuncio.contenido} </td>
                                             <td> {anuncio.fecha}</td>
                                             <td>
                                                 <button onClick={ () => this.editAd(anuncio.id)} className="btn btn-info">Modificar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.deleteAd(anuncio.id)} className="btn btn-danger">Borrar </button>
                                                 <button style={{marginLeft: "10px"}} onClick={ () => this.getOne(anuncio.id)} className="btn btn-info">Ver detalles </button>
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

export default ListAdComponent
