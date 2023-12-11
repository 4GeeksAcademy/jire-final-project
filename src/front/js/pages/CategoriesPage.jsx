import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext'
import { useParams, Link } from 'react-router-dom'
import logo from "../../img/logo-jire.png"

export const CategoriesPage = () => {
    const category = useParams()

    const { actions, store} = useContext(Context)
    useEffect(() =>{
        actions.getOfertas()
        actions.getSolicitudes()
    }, [])

    const offers = store.ofertas.filter((offer)=> offer.category[0] == category.categoria)
    const solicitudes = store.solicitudes.filter((sol) => sol.category[0] == category.categoria)


  return (
    <>
    <div className='container my-4'>
        <h1 className='text-center'>Ofertas sobre {category.categoria}</h1>
        <div className='container my-4'>
                <div className='col'>
                    <div className='row d-flex'>
                        {offers.length == 0? <div className="alert alert-danger" role="alert">
                        No hay ofertas sobre {category.categoria} 
                        <Link to="/addoferta"><button className="btn btn-primary mx-3">Agregar una oferta</button></Link>
                    </div> : offers.map((oferta) => {
                            return (
                                <div className="card mx-3 my-3" key={oferta.id} style={{ width: '18rem' }}>
                                    <img src={oferta.images == null? logo : oferta.images} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{oferta.title}</h5>
                                        <p className="card-text">{oferta.description}</p>
                                        <p className="card-text">{oferta.city}, {oferta.country}</p>
                                        <Link to='/offerdetail'>
                                        <button className='btn btn-primary' onClick={() => actions.getOfferProfile(oferta.user_id, oferta.id)}>Ver Mas</button>
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <h1 className='text-center my-4'>Solicitudes sobre {category.categoria}</h1>
            <div className='container my-4'>
                <div className='col'>
                    <div className='row d-flex'>
                        {solicitudes.length == 0? <div className="alert alert-danger" role="alert">
                        No hay solicitudes sobre {category.categoria} 
                        <Link to="/addsolicitud"><button className="btn btn-primary mx-3">Agregar una solicitud</button></Link>
                    </div> :solicitudes.map((solicitud) => {
                            return (
                                <div className="card mx-3 my-3" key={solicitud.id} style={{ width: '18rem' }}>
                                    <img src={solicitud.images == null? logo : solicitud.images} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{solicitud.title}</h5>
                                        <p className="card-text">{solicitud.description}</p>
                                        <p className="card-text">{solicitud.city}, {solicitud.country}</p>
                                        <Link to='/detailsolicitud'><button className='btn btn-primary' onClick={()=>actions.getSolicitudProfile(solicitud.user_id, solicitud.id)}>Ver Mas</button></Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
    </div>
    </>  
  )
}
