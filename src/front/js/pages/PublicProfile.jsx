import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, Link, useParams } from "react-router-dom";
import '../../styles/home.css'

export const PublicProfile = () => {
    const { store, actions } = useContext(Context)
    const { offerDetail } = store
    const userid = useParams()
    const id = useParams()


    useEffect(() => {
        actions.getOfferProfile(userid.userid, id.id)
    }, [])

    return (
        <>
            {store.token == null ? <Navigate to="/login" /> : <></>}
            <div className="container my-3">
                <h1 className="text-center">Perfil Personal</h1>
                <div className="contianer mt-4">
                    <h2>{offerDetail[0]?.name}  {offerDetail[0]?.lastname}</h2>
                    <p className="fs-4">Email: {offerDetail[0]?.email}</p>
                    <p className="fs-4">Rol: {offerDetail[0]?.rol}</p>
                </div>
                <div className="contianer mt-4">
                    <>
                        <h2>Personal Info:</h2>
                        <img className="avatar" src={offerDetail[1]?.avatar}></img>
                        <p className="fs-4">Nickname: {offerDetail[1]?.nickname}</p>
                        <p className="fs-4">Personal description: <span className="fs-5">{offerDetail[1]?.description}</span></p>
                        <p className="fs-4">Address: {offerDetail[1]?.address}</p>
                        <p className="fs-4">City: {offerDetail[1]?.city}</p>
                        <p className="fs-4">State: {offerDetail[1]?.state}</p>
                        <p className="fs-4">Country: {offerDetail[1]?.country}</p>
                        <p className="fs-4">Phone: {offerDetail[1]?.phone}</p>
                        <h2 className="mt-4">Professional Info:</h2>
                        <p className="fs-4">Ocupation: {offerDetail[2]?.ocupation}</p>
                        <p className="fs-4">Years of experience: {offerDetail[2]?.experience}</p>
                        <p className="fs-4">Certificate: {offerDetail[2]?.certificate}</p>
                        <p className="fs-4">Institution: {offerDetail[2]?.institution}</p>
                        <p className="fs-4">Languages: {offerDetail[2]?.languages}</p>
                        <p className="fs-4">Languages Level: {offerDetail[2]?.language_level}</p>
                        <p className="fs-4">Skills: {offerDetail[2]?.skills} </p>
                        <p className="fs-4">Skills Level: {offerDetail[2]?.skills_level}</p>
                    </>
                </div>
            </div>
        </>
    )
}