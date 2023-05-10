import React, { Component, useCallback, useEffect, useState } from 'react'
import AdService from "../../services/AdService";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../../services/auth.service";
import EventBus from "../../common/EventBus";
import VecinoService from "../../services/VecinoService";

function toLocaleDateString(fecha){
  const fechaFormatted = fecha ? new Date(fecha).toLocaleString() : '';
  return fechaFormatted;
}
export default function ListAdComponent() {

  const [count, setCount] = useState(0);

  const [state, setState] = useState({ anuncios: [], currentUser: null, });
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
                <th> Fecha Creación</th>
                <th> Fecha Reserva</th>
                <th> Usuario </th>
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
                      <td data-test="date-test"> {anuncio.fechaReserva ? toLocaleDateString(anuncio.fechaReserva) : ''}</td>
                      <td>
                        {anuncio.userId && (
                            <RenderUser userId={anuncio.userId} />
                        )}
                      </td>
                      <td>
                        <button className="mi-botón" data-test="detail-btn-test" onClick={ () => getOne(anuncio.id)} className="btn btn-info">Ver detalles </button>
                        <button className="mi-botón" data-test="modify-btn-test" onClick={ () => editAd(anuncio.id)} className="btn btn-info">Modificar </button>
                        <button className="mi-botón" data-test="delete-btn-test" onClick={ () => deleteAd(anuncio.id)} className="btn btn-danger">Borrar </button>

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
  function RenderUser(props) {
    const [user, setUser] = useState(null);
    const { userId } = props;

    useEffect(() => {
      async function fetchData() {
        const response = await VecinoService.getVecinoById(userId);
        setUser(response.data.username);
      }
      fetchData();
    }, [userId]);

    if (!user) {
      return <td>Cargando...</td>
    }

    return <td>{user}</td>
  }
}
