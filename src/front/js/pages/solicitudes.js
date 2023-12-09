import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { CardSolicitudes } from "../component/cardSolicitudes"
import { Link } from "react-router-dom"



export const Solicitudes = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getSolicitudes()
    }, [])

    return (
        <>
        <div className="text-center my-3">
        <div className="d-flex justify-content-center">
        <h1 className="text-center mx-2">Catalogo de Solicitudes</h1>
        <Link to='/addsolicitud'>
        <button className="btn btn-success mt-2">Agregar una Solicitud</button>
        </Link>

        </div>

        </div>
        <CardSolicitudes/>
        </>
    )
}