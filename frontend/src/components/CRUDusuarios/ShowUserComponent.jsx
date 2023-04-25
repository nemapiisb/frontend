import React, { useEffect, useState } from 'react';
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import {useParams} from "react-router-dom";
import VecinoService from "../../services/VecinoService";

const ShowAdComponent = (props) => {
    const [usuario, setUsuario] = useState({});
    const [currentUser, setCurrentUser] = useState(null);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminUpdateAd, setShowAdminUpdateAd] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        //const id = props.match.params.id;

        VecinoService.getVecinoById(id).then(res => {
            setUsuario(res.data);
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
                <h3 className="text-center"> Ver detalles del Usuario</h3>
                <div className="card-body">
                    <div className="row">
                        <label> Id del Usuario: </label>
                    </div>
                    <div><p>{usuario.id}</p></div>
                    <div className="row">
                        <label> Nombre del Usuario:<br /> </label>
                    </div>
                    <div> <p> {usuario.username}</p></div>
                    <div className="row">
                        <label> Email:<br /> </label>
                    </div>
                    <div> <p> {usuario.email}</p></div>
                </div>
            </div>
        </div>
    )
}

export default ShowAdComponent;
