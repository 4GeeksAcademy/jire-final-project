import React, { useEffect } from "react";
import { useContext } from "react";
import JireLogo from '../../img/handyman.png'
import { Context } from "../store/appContext"
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


export const OfferDeatail = () => {
    const {store, actions} = useContext(Context)
    const userid = useParams()
    const id = useParams()
    const {offerDetail} = store
    useEffect(() =>{
        actions.getOfferProfile(userid.userid, id.id)
    }, [])


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
                    <Link to={`/public-profile/${userid.userid}/${id.id}`}>
                    <button className="btn btn-primary">Ver Perfil del Profesional</button>
                    </Link>

                    <button className="btn btn-primary mx-2">Aplicar</button>
                    </div>
                </div>
            </div>
            </div>
        </>
    )
}