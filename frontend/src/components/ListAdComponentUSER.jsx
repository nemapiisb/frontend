import React, {Component, useCallback, useEffect, useState} from 'react'
import AdService from "../services/AdService";
import {Link, useNavigate} from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import ListAdComponentCSS from "../hojas-de-estilo/ListAdComponent.css";


export default function ListAdComponent(){

  const [count, setCount] = useState(0);

  const [state, setState] = useState({ anuncios: [] });
  const navigate = useNavigate();

  const addAd = useCallback(
      () => {
        navigate('/add-adUSER/_add');
      },
      [], // Tells React to memoize regardless of arguments.
  );

  const editAd = useCallback(
      (id) => {
        navigate(`/add-adUSER/${id}`);
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
      if(res.data==null)
      {
        navigate('/add-adUSER/_add');
      }
      setState({anuncios: res.data});
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

  return(
      //const { currentUser, showModeratorBoard, showAdminUpdateAd } = this.state;
      <>
        <div>
          <h2 className="text-center">Listado de anuncios:</h2>
          <div className = "row">
            <button className="btn btn-primary" onClick={addAd}> Añadir Anuncio </button>
          </div>
          <br></br>
          <div className = "row">
            <table className="table table-striped table-bordered">
              <thead>
              <tr>
                <th> ID </th>
                <th> Categoría </th>
                <th> Contenido del anuncio</th>
                <th> Fecha</th>
                <th> Acciones</th>
              </tr>
              </thead>
              <tbody>
              {
                state.anuncios.map(anuncio =>(
                    <tr key={anuncio.id} className={anuncio.categoria === 'MANTENIMIENTO' ? 'table-color1' : (anuncio.categoria === 'CONVOCATORIA' ? 'table-color2' : (anuncio.categoria === 'COMUNICADO' ? 'table-color3' : ''))}>
                    <td> {anuncio.id} </td>
                      <td> {anuncio.categoria} </td>
                      <td> {anuncio.contenido}</td>
                      <td> {anuncio.fecha}</td>
                      <td>
                        <button style={{marginLeft: "10px"}} onClick={ () => getOne(anuncio.id)} className="btn btn-info">Ver detalles </button>
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
