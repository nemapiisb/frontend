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

class App extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
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
            showUserManagementBoard: false,
            currentUser: undefined,
        });
    }

    render() {
        const { currentUser, showModeratorBoard, showAdminBoard, showUserManagementBoard } = this.state;

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
                        {showUserManagementBoard && (
                            <li className="nav-item">
                                <Link to={"/listadoUsers"} className="nav-link">
                                    User Management
                                </Link>
                            </li>
                        )}

                        {currentUser && (
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
                        <Route path="/anuncios" element={<ListAdComponentUSER />} />
                        <Route path="/listadoUsers" element={<ListUserComponent />} />

                        <Route path="/add-us/:id" element={<CreateUserComponent />} />
                        <Route path="/edit-us/:id" element={<CreateUserComponent />} />
                        <Route path="/show-us/:id" element={<ShowUserComponent />} />

                        <Route path="/add-ad/:id" element={<CreateAdComponent />} />
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
