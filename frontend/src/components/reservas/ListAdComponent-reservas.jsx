import React, { Component, useCallback, useEffect, useState } from 'react'
import AdService from "../../services/AdService";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";


export default function ListAdComponent() {

  const [count, setCount] = useState(0);

  const [state, setState] = useState({ anuncios: [] });
  const navigate = useNavigate();

  const addAd = useCallback(
      () => {
        navigate('/add-adreserva/_add');
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const editAd = useCallback(
      (id) => {
        navigate(`/add-adreserva/${id}`);
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const getOne = useCallback(
      (id) => {
        navigate(`/show-ad/${id}`);
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const deleteAd = useCallback(
      (id) => {
        AdService.deleteAd(id).then(res => {
          setState(prevState => ({
            ...prevState,
            anuncios: prevState.anuncios.filter(anuncio => anuncio.id !== id)
          }));
        });
      },
      [],
  );


  useEffect(() => {
    AdService.getAll().then((res) => {
      if (res.data == null) {
        navigate('/add-adreserva/_add');
      }
      // Filtrar los anuncios por categoría "RESERVA"
      const filteredAnuncios = res.data.filter(anuncio => anuncio.categoria === "RESERVA");
      setState({ anuncios: filteredAnuncios });
    });

    const user = AuthService.getCurrentUser();

    if (user) {
      state.anuncios.map(anuncio => ({
        ...anuncio,
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_PORTERO"),
        showAdminUpdateAd: user.roles.includes("ROLE_ADMIN"),
      }));
    }

    EventBus.on("logout", () => {
      AuthService.logOut(); // Cambiar this.logOut() a AuthService.logOut()
    });
  }, [count]);

  return (
      //const { currentUser, showModeratorBoard, showAdminUpdateAd } = this.state;
      <>
        <div>
          <h2 className="text-center">Listado de Reservas:</h2>
          <div className="row">
            <button className="btn btn-primary" onClick={addAd}> Añadir Reserva </button>
          </div>
          <br></br>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th> ID </th>
                <th> Categoría </th>
                <th> Contenido de la Reserva</th>
                <th> Fecha</th>
                <th> Acciones</th>
              </tr>
              </thead>
              <tbody>
              {
                state.anuncios.map(anuncio => (
                    <tr key={anuncio.id} >
                      <td> {anuncio.id} </td>
                      <td> {anuncio.categoria} </td>
                      <td> {anuncio.contenido}</td>
                      <td> {anuncio.fecha}</td>
                      <td>
                        <button className="mi-botón" onClick={ () => editAd(anuncio.id)} className="btn btn-info">Modificar </button>
                        <button className="mi-botón" onClick={ () => deleteAd(anuncio.id)} className="btn btn-danger">Borrar </button>
                        <button className="mi-botón" onClick={ () => getOne(anuncio.id)} className="btn btn-info">Ver detalles </button>
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