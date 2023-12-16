import React, { useContext, useEffect, useState } from "react"
import { Context } from "../store/appContext"
import { Cardoferta } from "../component/cardOfertas"
import { Link } from "react-router-dom"
import Filter from '../component/filter'



export const Ofertas = () => {
    const { store, actions } = useContext(Context)
    const [isFiltered, setIsFiltered] = useState(false)
    const [filter, setFilter] = useState({
        category: "",
        service: ""
    })
    useEffect(() => {
        actions.getOfertas()
    }, [])

    const filteredCards = store.ofertas.filter((oferta) => oferta.category[0] == filter.category || oferta.service[0] == filter.service)
    const handleChange = (e) => {
        setIsFiltered(true)
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }
   

    return (
        <>
            <div className="text-center my-3">
                <div className="d-flex justify-content-center mx-2">
                <h1 className="mx-2">Catalogo de Ofertas</h1>
                <Link to='/addoferta'>
                 <button className="btn btn-success mt-2">Agregar una oferta</button>
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

            {isFiltered == false ? <Cardoferta /> : filter.category == "Seleccione una categoria"? <Cardoferta/>:filteredCards.length == 0 ? <div className="alert alert-danger" role="alert">
                No hay ofertas sobre {filter.category}
                <Link to="/addoferta"><button className="btn btn-primary mx-3">Agregar una oferta</button></Link>
            </div> : <Filter filters={filteredCards} />}

        </>
    )
}
