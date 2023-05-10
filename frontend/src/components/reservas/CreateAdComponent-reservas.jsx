import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import AdService from '../../services/AdService';
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";

const CreateAdComponent = ({ history, match }) => {
    const { id } = useParams();
    const [contenido, setContenido] = useState('');
    const [fecha, setFecha] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [categoria, setCategoria] = useState('RESERVA');
    const [userId, setUserId] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminUpdateAd, setShowAdminUpdateAd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === '_add') {
            return;
        } else {
            AdService.getOne(id).then((res) => {
                let anuncio = res.data;
                setContenido(anuncio.contenido);
                setFecha(anuncio.fecha);
                setUserId(anuncio.userId);
                setFechaReserva(anuncio.fechaReserva);
                //setCategoria(anuncio.categoria);
            });
        }

        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminUpdateAd(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });
    }, [id]); // Agrega "id" como dependencia en el arreglo de dependencias de useEffect


    const saveOrUpdateAd = (e) => {
        e.preventDefault();
        let anuncio = { contenido: contenido, fecha: fecha, categoria: categoria, userId: userId, fechaReserva: fechaReserva }; // También incluye la categoría en el objeto
        console.log('anuncio => ' + JSON.stringify(anuncio));

        if (id === '_add') {
            AdService.createAd(anuncio).then(res => {
                navigate('/reservas');

            });
        } else {
            AdService.updateAd(anuncio, id).then(res => {
                navigate('/reservas');
            });
        }
    }

    const changeContenidoHandler = (event) => {
        setContenido(event.target.value);
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        if (currentUser){
            console.log(currentUser.id)
            setUserId(currentUser.id);
        }

    }

    const changeFechaHandler = (event) => {
        setFecha(event.target.value);
    }
    const changeFechaReservaHandler = (fechaReserva) => {
        setFechaReserva(fechaReserva);
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
        if (currentUser){
            console.log(currentUser.id)
            setUserId(currentUser.id);
        }
    };
    /*const changeCategoriaHandler = (event) => {
        setCategoria(event.target.value);
    }*/

    const cancel = () => {
        navigate('/reservas');
    }

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Añadir Reserva</h3>
        } else {
            return <h3 className="text-center">Modificar Reserva</h3>
        }
    }

    const logOut = () => {
        // Implementa la función logOut aquí o elimina esta línea si no la necesitas
    }
    console.log('currentUser => ', currentUser);

    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        {
                            getTitle()
                        }
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> Contenido: </label>
                                    <select name="contenido" className="form-control" data-test="contenido-pickup-test"
                                            value={contenido} onChange={changeContenidoHandler}>
                                        <option value="SELECCIONA" >Selecciona una opcion</option>
                                        <option value="PistaPadelA">Pista Padel A</option>
                                        <option value="PistaPadelB">Pista Padel B</option>
                                        <option value="PistaTenis">Pista Tenis</option>
                                        <option value="SalaReuniones1">Sala Reuniones 1</option>
                                        <option value="SalaReuniones2">Sala Reuniones 2</option>
                                        <option value="PistaFutbolSala">Pista Futbol Sala</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label> Fecha Reserva: </label>
                                    <DatePicker
                                        selected={fechaReserva}
                                        onChange={changeFechaReservaHandler}
                                        showTimeSelect
                                        timeFormat="HH:mm"
                                        timeIntervals={15}
                                        dateFormat="yyyy-MM-dd HH:mm"
                                        className="form-control"
                                        placeholderText="Seleccione fecha y hora"
                                    />
                                </div>
                                <div className="form-group" data-test="category-test">
                                    <label> Categoría: {categoria}</label>
                                </div>

                                <button className="btn btn-success" data-test="save-btn-test" onClick={saveOrUpdateAd}>Guardar</button>
                                <button className="btn btn-danger" data-test="cancel-btn-test" onClick={cancel} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CreateAdComponent
