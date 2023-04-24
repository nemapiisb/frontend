import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";


// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import ListAdComponent from "./components/ListAdComponent";
import CreateAdComponent from "./components/CreateAdComponent";
import ShowAdComponent from "./components/ShowAdComponent";
import ListAdComponentUSER from "./components/ListAdComponentUSER";
import CreateAdComponentUSER from "./components/CreateAdComponentUSER";
import ListUserComponent from "./components/ListUserComponent";
import CreateUserComponent from "./components/CreateUserComponent";
import showUserComponent from "./components/ShowUserComponent";
import ShowUserComponent from "./components/ShowUserComponent";

//import comunicados_gestoria
import ListAdComponentComunicados from "./components/comunicados_gestoria/ListAdComponent-comunicados_gestoria";
import CreateAdComponentComunicados from "./components/comunicados_gestoria/CreateAdComponent-comunicados_gestoria";
import ListAdComponentComunicadosUSER from "./components/comunicados_gestoria/ListAdComponent-comunicados_gestoriaUSER";

//import actas_reunion
import ListAdComponentActas from "./components/actas_reunion/ListAdComponent-actas_reunion";
import CreateAdComponentActas from "./components/actas_reunion/CreateAdComponent-actas_reunion";
import ListAdComponentActasUSER from "./components/actas_reunion/ListAdComponent-actas_reunionUSER";

//import anuncios_vecinales
import ListAdComponentAnuncios from "./components/anuncios_vecinales/ListAdComponent-anuncios_vecinales";
import CreateAdComponentAnuncios from "./components/anuncios_vecinales/CreateAdComponent-anuncios_vecinales";
import ListAdComponentAnunciosUSER from "./components/anuncios_vecinales/ListAdComponent-anuncios_vecinalesUSER";

//import incidencias
import ListAdComponentIncidencias from "./components/incidencias/ListAdComponent-incidencias";
import CreateAdComponentIncidencias from "./components/incidencias/CreateAdComponent-incidencias";
import ListAdComponentIncidenciasUSER from "./components/incidencias/ListAdComponent-incidenciasUSER";

//import reservas
import ListAdComponentReservas from "./components/reservas/ListAdComponent-reservas";
import CreateAdComponentReservas from "./components/reservas/CreateAdComponent-reservas";
import ListAdComponentReservasUSER from "./components/reservas/ListAdComponent-reservasUSER";

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            showVecinoBoard: false,
            showBoardComunicados: false,
            showBoardActas: false,
            showBoardAnuncios: false,
            showBoardIncidencias: false,
            showBoardReservas: false,
            showUserManagementBoard: false,
            currentUser: undefined,
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
                showModeratorBoard: user.roles.includes("ROLE_PORTERO"),
                showAdminBoard: user.roles.includes("ROLE_ADMIN"),
                showVecinoBoard: user.roles.includes("ROLE_VECINO"),
                showBoardComunicados: user.roles.includes("ROLE_ADMIN"),
                showBoardActas: user.roles.includes("ROLE_ADMIN"),
                showBoardAnuncios: user.roles.includes("ROLE_ADMIN"),
                showBoardIncidencias: user.roles.includes("ROLE_ADMIN"),
                showBoardReservas: user.roles.includes("ROLE_ADMIN"),
                showUserManagementBoard: user.roles.includes("ROLE_ADMIN"),
            });
        }

        EventBus.on("logout", () => {
            this.logOut();
        });
    }

    componentWillUnmount() {
        EventBus.remove("logout");
    }

    logOut() {
        AuthService.logout();
        this.setState({
            showModeratorBoard: false,
            showAdminBoard: false,
            showVecinoBoard: false,
            showBoardComunicados:false,
            showBoardActas: false,
            showBoardAnuncios: false,
            showBoardIncidencias: false,
            showBoardReservas: false,
            showUserManagementBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, showVecinoBoard} = this.state;

        return (
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/"} className="navbar-brand">
                        NEMA
                    </Link>
                    <div className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>

                        {showModeratorBoard && (
                            <li className="nav-item">
                                <Link to={"/mod"} className="nav-link">
                                    Moderator Board
                                </Link>
                            </li>
                        )}

                        {showAdminBoard && (
                            <li className="nav-item">
                                {/*<Link to={"/admin"} className="nav-link">*/}
                                <Link to={"/anunciosAdmin"} className="nav-link">
                                    Admin Board
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/comunicadosGestoria"} className="nav-link">
                                    Comunicados Gestoría
                                </Link>
                            </li>
                        )}
                        {showVecinoBoard && (
                            <li className="nav-item">
                                <Link to={"/comunicadosGestoriaUSER"} className="nav-link">
                                    Comunicados Gestoría
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/actasReunion"} className="nav-link">
                                    Actas De Reunión
                                </Link>
                            </li>
                        )}
                        {showVecinoBoard && (
                            <li className="nav-item">
                                <Link to={"/actasReunionUSER"} className="nav-link">
                                    Actas De Reunión
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/anunciosVecinales"} className="nav-link">
                                    Anuncios Vecinales
                                </Link>
                            </li>
                        )}
                        {showVecinoBoard && (
                            <li className="nav-item">
                                <Link to={"/anunciosVecinalesUSER"} className="nav-link">
                                    Anuncios Vecinales
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/incidencias"} className="nav-link">
                                    Incidencias
                                </Link>
                            </li>
                        )}
                        {showVecinoBoard && (
                            <li className="nav-item">
                                <Link to={"/incidenciasUSER"} className="nav-link">
                                    Incidencias
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/reservas"} className="nav-link">
                                    Reservas
                                </Link>
                            </li>
                        )}
                        {showVecinoBoard && (
                            <li className="nav-item">
                                <Link to={"/reservasUSER"} className="nav-link">
                                    Reservas
                                </Link>
                            </li>
                        )}
                        {showAdminBoard && (
                            <li className="nav-item">
                                <Link to={"/listadoUsers"} className="nav-link">
                                    User Management
                                </Link>
                            </li>
                        )}

                        {showAdminBoard  && (
                            <li className="nav-item">
                                <Link to={"/anuncios"} className="nav-link">
                                    User Board
                                </Link>
                            </li>
                        )}

                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/profile"} className="nav-link">
                                    {currentUser.username}
                                </Link>
                            </li>
                            <li className="nav-item">
                                <a href="/login" className="nav-link" onClick={this.logOut}>
                                    LogOut
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link to={"/register"} className="nav-link">
                                    Sign Up
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/user" element={<BoardUser />} />
                        <Route path="/mod" element={<BoardModerator />} />
                        <Route path="/admin" element={<BoardAdmin />} />
                        <Route path="/anunciosAdmin" element={<ListAdComponent />} />
                        <Route path="/comunicadosGestoria" element={<ListAdComponentComunicados />} />
                        <Route path="/comunicadosGestoriaUSER" element={<ListAdComponentComunicadosUSER />} />
                        <Route path="/actasReunion" element={<ListAdComponentActas />} />
                        <Route path="/actasReunionUSER" element={<ListAdComponentActasUSER />} />
                        <Route path="/anunciosVecinales" element={<ListAdComponentAnuncios />} />
                        <Route path="/anunciosVecinalesUSER" element={<ListAdComponentAnunciosUSER />} />
                        <Route path="/incidencias" element={<ListAdComponentIncidencias />} />
                        <Route path="/incidenciasUSER" element={<ListAdComponentIncidenciasUSER />} />
                        <Route path="/reservas" element={<ListAdComponentReservas />} />
                        <Route path="/reservasUSER" element={<ListAdComponentReservasUSER />} />
                        <Route path="/anuncios" element={<ListAdComponentUSER />} />
                        <Route path="/listadoUsers" element={<ListUserComponent />} />

                        <Route path="/add-us/:id" element={<CreateUserComponent />} />
                        <Route path="/edit-us/:id" element={<CreateUserComponent />} />
                        <Route path="/show-us/:id" element={<ShowUserComponent />} />

                        <Route path="/add-ad/:id" element={<CreateAdComponent />} />
                        <Route path="/add-adcomunicado/:id" element={<CreateAdComponentComunicados />} />
                        <Route path="/add-adacta/:id" element={<CreateAdComponentActas />} />
                        <Route path="/add-adanuncio/:id" element={<CreateAdComponentAnuncios />} />
                        <Route path="/add-adincidencia/:id" element={<CreateAdComponentIncidencias />} />
                        <Route path="/add-adreserva/:id" element={<CreateAdComponentReservas />} />
                        <Route path="/add-adUSER/:id" element={<CreateAdComponentUSER />} />
                        <Route path="/edit-ad/:id" element={<CreateAdComponent />} />
                        <Route path="/show-ad/:id" element={<ShowAdComponent />} />
                    </Routes>
                </div>

                {/* <AuthVerify logOut={this.logOut}/> */}
            </div>
        );
    }
}

export default App;
