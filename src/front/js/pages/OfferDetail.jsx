import React from "react";
import { useContext } from "react";
import JireLogo from '../../img/handyman.png'
import { Context } from "../store/appContext"


export const OfferDeatail = () => {
    const {store, actions} = useContext(Context)
    const {offerDetail} = store

    return (
        <>
            <div className="container">
            <div className="card mb-3">
                <img src={offerDetail[3]?.images == null? JireLogo: offerDetail[3]?.images } className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{offerDetail[3]?.title}</h5>
                    <p className="card-text">{offerDetail[3]?.description}</p>
                    <p className="card-text">{offerDetail[3]?.address}, {offerDetail[3]?.city}, {offerDetail[3]?.state}, {offerDetail[3]?.country}</p>
                    <h5 className="card-title">Datos del profesional</h5>
                    <p className="card-text">{offerDetail[0]?.name} {offerDetail[0]?.lastname} </p>
                    <p className="card-text">{offerDetail[2]?.ocupation}</p>
                    <p className="card-text">{offerDetail[2]?.skills}, {offerDetail[2]?.skills_level} </p>
                    <p className="card-text">{offerDetail[2]?.languages}</p>
                    <p className="card-text">{offerDetail[0]?.email}</p>
                    <p className="card-text">{offerDetail[1]?.phone}</p>
                    <div className="d-flex ">
                    <button className="btn btn-primary">Ver Perfil del Profesional</button>
                    <button className="btn btn-primary mx-2">Aplicar</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}