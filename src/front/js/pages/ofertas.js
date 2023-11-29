import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { Cardoferta } from "../component/cardOfertas"



export const Ofertas = () => {
    const { store, actions } = useContext(Context)
    useEffect(() => {
        actions.getOfertas()
    }, [])

    return (
        <>
        <div className="text-center my-3">
        <h1>Catalogo de Ofertas</h1>
        </div>
        <Cardoferta/>
        
        </>
    )
}
