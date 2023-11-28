import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { Cardcatalogo } from "../component/cardSolicitudes"



export const Solicitudes = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getSolicitudes()
    }, [])

    return (
        <>
        <div className="text-center my-3">
        <h1>Catalogo de Solicitudes</h1>
        </div>
        <Cardcatalogo/>
        </>
    )
}