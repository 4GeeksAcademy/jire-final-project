import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { CardSolicitudes } from "../component/cardSolicitudes"
import { Link } from "react-router-dom"
import Filter from "../component/filter"



export const Solicitudes = () => {
    const { store, actions } = useContext(Context)
    const [filter, setFilter] = useState({
        category:"",
        service:""
    })
    const [isFiltered, setIsFiltered] = useState(false)

    useEffect(() => {
        actions.getSolicitudes()
    }, [])

    const handleChange = (e) => {
        setIsFiltered(true)
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    const filteredCards = store.solicitudes.filter((item) => item.category[0] == filter.category || item.service[0] == filter.service)

    return (
        <>
        <div className="text-center my-3">
        <div className="d-flex justify-content-center">
        <h1 className="text-center mx-2">Catalogo de Solicitudes</h1>
        <Link to='/addsolicitud'>
        <button className="btn btn-success mt-2">Agregar una Solicitud</button>
        </Link>
        </div>
        <div className="container">
        <select
                    className="form-select"
                    value={filter.category}
                    name="category"
                    onChange={handleChange}>
                    <option >Seleccione una categoria</option>
                    <option value="mantenimiento">mantenimiento</option>
                    <option value="limpieza">limpieza</option>
                    <option value="construcción">construcción</option>
                    <option value="jardineria">jardineria</option>
                    <option value="mudanzas">mudanzas</option>
                    <option value="tecnologias">tecnologias</option>
                    <option value="negocios">negocios</option>
                    <option value="salud">salud</option>
                    <option value="eventos">eventos</option>
                    <option value="traducciones">traducciones</option>
                    <option value="idiomas">idiomas</option>
                    <option value="personal_training">personal training</option>
                </select>
        </div>
       

        </div>
        {isFiltered == false? <CardSolicitudes/>: filter.category == "Seleccione una categoria"? <CardSolicitudes/>: filteredCards.length == 0 ? <div className="alert alert-danger" role="alert">
                No hay solicitudes sobre {filter.category}
                <Link to="/addsolicitud"><button className="btn btn-primary mx-3">Agregar una Solicitud</button></Link>
            </div> : <Filter filters={filteredCards} />}
        </>
    )
}