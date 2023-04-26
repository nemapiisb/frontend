import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdService from '../../services/AdService';
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import VecinoService from "../../services/VecinoService";
import vecinoService from "../../services/VecinoService";

const CreateAdComponent = ({ history, match }) => {
    const { id } = useParams();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [roles, setRoles] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminUpdateAd, setShowAdminUpdateAd] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (id === '_add') {
            return;
        } else if (id === '_admin') {
            return;
        } else {
            VecinoService.getVecinoById(id).then((res) => {
                let usuario = res.data;
                setUsername(usuario.username);
                setEmail(usuario.email);
                setPassword(usuario.password);
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


    const saveOrUpdateUs = (e) => {
        e.preventDefault();
        let usuario = { username: username, email: email, password: password }; // También incluye la categoría en el objeto
        console.log('usuario => ' + JSON.stringify(usuario));

        if (id === '_add') {
            vecinoService.crearVecino(usuario).then(res => {
                //history.push('/anuncios');
                navigate('/listadoUsers');
            });
        } else if (id === '_admin') {
            vecinoService.crearAdmin(usuario).then(res => {
                //history.push('/anuncios');
                navigate('/listadoUsers');
            });
        }
        else {
            vecinoService.updateVecino(usuario, id).then(res => {
                //history.push('/anuncios');
                navigate('/listadoUsers');
            });
        }
    }

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value);
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value);
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value);
    }

    const cancel = () => {
        //history.push('/anuncios');
        navigate('/listadoUsers');
    }

    const getTitle = () => {
        if (id === '_add') {
            return <h3 className="text-center">Añadir Usuario</h3>
        } else if (id === '_admin') {
            return <h3 className="text-center">Añadir Admin</h3>
        } else {
            return <h3 className="text-center">Modificar Usuario</h3>
        }
    }

    const logOut = () => {
        // Implementa la función logOut aquí o elimina esta línea si no la necesitas
    }

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
                                    <label> Username: </label>
                                    <input placeholder="Nombre de Usuario" name="username" className="form-control"
                                           value={username} onChange={changeUsernameHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Email: </label>
                                    <input placeholder="email" name="email" className="form-control"
                                           value={email} onChange={changeEmailHandler} />
                                </div>
                                <div className="form-group">
                                    <label> Contraseña: </label>
                                    <input name="password" className="form-control"
                                            value={password} onChange={changePasswordHandler} />
                                </div>

                                <button className="btn btn-success" onClick={saveOrUpdateUs}>Guardar</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancelar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default CreateAdComponent
