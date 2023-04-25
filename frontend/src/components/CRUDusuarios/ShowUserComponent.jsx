import React, { useEffect, useState } from 'react';
import AdService from "../../services/AdService";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import {useParams} from "react-router-dom";

const ShowAdComponent = (props) => {
    const [anuncio, setAnuncio] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminUpdateAd, setShowAdminUpdateAd] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        //const id = props.match.params.id;

        AdService.getOne(id).then(res => {
            setAnuncio(res.data);
        });

        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_PORTERO"));
            setShowAdminUpdateAd(user.roles.includes("ROLE_ADMIN"));
        }

        EventBus.on("logout", () => {
            logOut();
        });

    }, []);

    const logOut = () => {
        // Implementa la lógica de cierre de sesión aquí
    }

    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center"> Ver detalles del Anuncio</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Contenido del Anuncio: </label>
                    </div>
                    <div><p>{anuncio.contenido}</p></div>
                    <div className="row">
                        <label> Fecha del Anuncio:<br /> </label>
                    </div>
                    <div> <p> {anuncio.fecha}</p></div>
                    <div className="row">
                        <label> Categoría del Anuncio:<br /> </label>
                    </div>
                    <div> <p> {anuncio.categoria}</p></div>
                </div>
            </div>
        </div>
    )
}

export default ShowAdComponent;
