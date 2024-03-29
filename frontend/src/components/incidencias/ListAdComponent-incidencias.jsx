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
        navigate('/add-adincidencia/_add');
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const editAd = useCallback(
      (id) => {
        navigate(`/add-adincidencia/${id}`);
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const getOne = useCallback(
      (id) => {
        navigate(`/show-ad_2/${id}`);
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
        navigate('/add-adincidencia/_add');
      }
      // Filtrar los anuncios por categoría "INCIDENCIA"
      const filteredAnuncios = res.data.filter(anuncio => anuncio.categoria === "INCIDENCIA");
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
          <h2 className="text-center">Listado de Incidencias:</h2>
          <div className="row">
            <button className="btn btn-primary" onClick={addAd}> Añadir Incidencia </button>
          </div>
          <br></br>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th> ID </th>
                <th> Categoría </th>
                <th> Contenido de la Incidencia</th>
                <th> Fecha</th>
                <th> Acciones</th>
              </tr>
              </thead>
              <tbody>
              {
                state.anuncios.map(anuncio => (
                    <tr key={anuncio.id} >
                      <td data-test="id-test"> {anuncio.id} </td>
                      <td data-test="category-test"> {anuncio.categoria} </td>
                      <td data-test="content-test"> {anuncio.contenido}</td>
                      <td data-test="date-test"> {anuncio.fecha}</td>
                      <td>
                        <button className="mi-botón" data-test="modify-btn-test" onClick={ () => editAd(anuncio.id)} className="btn btn-info">Modificar </button>
                        <button className="mi-botón" data-test="delete-btn-test" onClick={ () => deleteAd(anuncio.id)} className="btn btn-danger">Borrar </button>
                        <button className="mi-botón" data-test="detail-btn-test" onClick={ () => getOne(anuncio.id)} className="btn btn-info">Ver detalles </button>
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
