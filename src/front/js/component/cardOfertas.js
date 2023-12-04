import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import logo from "../../img/logo-jire.png"
export const Cardoferta = () => {

    const { store, actions } = useContext(Context)

    return (
        <>
            <div className='container my-4'>
                <div className='col'>
                    <div className='row d-flex'>
                        {store.ofertas.map((oferta) => {
                            return (
                                <div className="card mx-3 my-3" key={oferta.id} style={{ width: '18rem' }}>
                                    <img src={logo} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{oferta.title}</h5>
                                        <p className="card-text">{oferta.description}</p>
                                        <p className="card-text">{oferta.city}, {oferta.country}</p>
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