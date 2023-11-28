import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import logo from "../../img/logo-jire.png"
export const Cardcatalogo = () => {

    const { store, actions } = useContext(Context)

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col d-flex'>
                        {store.solicitudes.map((solicitud) => {
                            return (
                                <div className="card mx-3" key={solicitud.id} style={{ width: '18rem' }}>
                                    <img src={logo} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{solicitud.title}</h5>
                                        <p className="card-text">{solicitud.description}</p>
                                        <p className="card-text">Ubicación : {solicitud.location}</p>
                                        <a href="#" className="btn btn-primary">Contactar</a>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}