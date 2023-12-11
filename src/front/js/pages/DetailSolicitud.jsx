import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import JireLogo from '../../img/handyman.png'

const DetailSolicitud = () => {
  const { store, actions } = useContext(Context)
  const {solicitudProfile} = store
  return (
    <div className='container'>
      <div className="card mb-3">
        <img src={solicitudProfile[2]?.images == null? JireLogo: solicitudProfile[2]?.images } className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">Solicitud de trabajo: {solicitudProfile[2]?.title}</h5>
          <p className="card-text">{solicitudProfile[2]?.description}</p>
          <p className="card-text">Categoria: {solicitudProfile[2]?.category}</p>
          <p className="card-text">Tipo de Servicio: {solicitudProfile[2]?.service}</p>
          <p className="card-text">{solicitudProfile[2]?.address}, {solicitudProfile[2]?.city}, {solicitudProfile[2]?.state}, {solicitudProfile[2]?.country} </p>
          <h5 className='card-title'>Datos del solicitante</h5>
          <p className="card-text">{solicitudProfile[0]?.name} {solicitudProfile[0]?.lastname}</p>
          <p className="card-text">{solicitudProfile[0]?.email}</p>
          <p className="card-text">{solicitudProfile[1]?.phone}</p>
          <p className="card-text">{solicitudProfile[1]?.description}</p>
          <p className="card-text">{solicitudProfile[1]?.address}, {solicitudProfile[1]?.city}, {solicitudProfile[1]?.state}, {solicitudProfile[1]?.country} </p>
          <button className='btn btn-primary'>Quiero aplicar a esta solicitud</button>
        </div>
      </div>

    </div>
  )
}

export default DetailSolicitud