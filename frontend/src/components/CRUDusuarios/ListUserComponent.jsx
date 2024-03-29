import React, {Component, useCallback, useEffect, useState} from 'react'
import AdService from "../../services/AdService";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import VecinoService from "../../services/VecinoService";



export default function ListUserComponent(){

  const [count, setCount] = useState(0);

  const [state, setState] = useState({ usuarios: [] });
  const navigate = useNavigate();


  const addUs = useCallback(
      () => {
        navigate('/add-us/_add');
      },
      [], // Tells React to memoize regardless of arguments.
  );
  const addAdmin = useCallback(
      () => {
        navigate('/add-us/_admin');
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const editUs = useCallback(
      (id) => {
        navigate(`/add-us/${id}`);
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const getOne = useCallback(
      (id) => {
        navigate(`/show-us/${id}`);
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const deleteUs = useCallback(
      (id) => {
        VecinoService.deleteVecino(id).then(res => {
          setState(prevState => ({
            ...prevState,
            usuarios: prevState.usuarios.filter(usuario => usuario.id !== id)
          }));
        });
      },
      [],
  );

  useEffect(() => {
    VecinoService.getVecinos().then((res) => {
      if(res.data==null)
      {
        navigate('/add-us/_add');
      }
      setState({usuarios: res.data});
    });

    const user = AuthService.getCurrentUser();

    if (user) {
      state.usuarios.map(usuario => ({
        ...usuario,
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_PORTERO"),
        showAdminUpdateAd: user.roles.includes("ROLE_ADMIN"),
      }));
    }

    EventBus.on("logout", () => {
      AuthService.logOut(); // Cambiar this.logOut() a AuthService.logOut()
    });
  }, [count]);

  return(
      //const { currentUser, showModeratorBoard, showAdminUpdateAd } = this.state;
      <>
        <div>
          <h2 className="text-center">Listado de Usuarios:</h2>

            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" data-test="adduser-btn-test" onClick={addUs}>Añadir Usuario</button>
              <button className="btn btn-danger" data-test="addadmin-btn-test" onClick={addAdmin}>Añadir Admin</button>
            </div>
          <br></br>
          <div className = "row">
            <table className = "table table-striped table-bordered">
              <thead>
              <tr>
                <th> ID </th>
                <th> Nombre </th>
                <th> Email </th>
                <th> Roles</th>
                <th> Acciones</th>
              </tr>
              </thead>
              <tbody>
              {
                state.usuarios.map(usuario => (
                    <tr key={usuario.id}>
                      <td data-test="id-test">{usuario.id}</td>
                      <td data-test="username-test">{usuario.username}</td>
                      <td data-test="email-test">{usuario.email}</td>
                      <td data-test="role-test">{usuario.roles[0].name}</td>
                      <td>
                        <button className="mi-botón" data-test="modify-btn-test" onClick={() => editUs(usuario.id)} className="btn btn-info">Modificar </button>
                        <button className="mi-botón" data-test="delete-btn-test" onClick={() => deleteUs(usuario.id)} className="btn btn-danger">Borrar </button>
                        <button className="mi-botón" data-test="detail-btn-test"onClick={() => getOne(usuario.id)} className="btn btn-info">Ver detalles </button>
                      </td>
                    </tr>
                ))
              }


              </tbody>

            </table>
          </div>
        </div>
      </>
    );
}
