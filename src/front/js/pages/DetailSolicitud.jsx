import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import JireLogo from '../../img/handyman.png'

const DetailSolicitud = () => {
  const { store, actions } = useContext(Context)
  return (
    <div className='container'>
      <div className="card mb-3">
        <img src={store.solicitudProfile[2]?.images == null? JireLogo: store.solicitudProfile[2]?.images } className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Solicitud de trabajo: {store.solicitudProfile[2]?.title}</h5>
          <p className="card-text">{store.solicitudProfile[2]?.description}</p>
          <p className="card-text">Categoria: {store.solicitudProfile[2]?.category}</p>
          <p className="card-text">Tipo de Servicio: {store.solicitudProfile[2]?.service}</p>
          <p className="card-text">{store.solicitudProfile[2]?.address}, {store.solicitudProfile[2]?.city}, {store.solicitudProfile[2]?.state}, {store.solicitudProfile[2]?.country} </p>
          <h5 className='card-title'>Datos del solicitante</h5>
          <p className="card-text">{store.solicitudProfile[0]?.name} {store.solicitudProfile[0]?.lastname}</p>
          <p className="card-text">{store.solicitudProfile[0]?.email}</p>
          <p className="card-text">{store.solicitudProfile[1]?.phone}</p>
          <p className="card-text">{store.solicitudProfile[1]?.description}</p>
          <p className="card-text">{store.solicitudProfile[1]?.address}, {store.solicitudProfile[1]?.city}, {store.solicitudProfile[1]?.state}, {store.solicitudProfile[1]?.country} </p>
          <button className='btn btn-primary'>Quiero aplicar a esta solicitud</button>
        </div>
      </div>

    </div>
  )
}

export default DetailSolicitud