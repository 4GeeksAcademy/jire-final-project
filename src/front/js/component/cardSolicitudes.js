import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import logo from "../../img/logo-jire.png"
export const CardSolicitudes = () => {

    const { store, actions } = useContext(Context)

    return (
        <>
            <div className='container my-4'>
                <div className='col'>
                    <div className='row d-flex'>
                        {store.solicitudes.map((solicitud) => {
                            return (
                                <div className="card mx-3 my-3" key={solicitud.id} style={{ width: '18rem' }}>
                                    <img src={logo} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{solicitud.title}</h5>
                                        <p className="card-text">{solicitud.description}</p>
                                        <p className="card-text">{solicitud.city}, {solicitud.country}</p>
                                        <button className='btn btn-primary'>Ver Mas</button>
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