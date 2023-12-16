import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import {  Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const AddOferta = () => {
    const navigate = useNavigate()
    const { actions, store } = useContext(Context)
    const [oferta, setOferta] = useState({
        title: "",
        description: "",
        category: "",
        service: "",
        images: ""
    })

    useEffect(() => {
        actions.profile()
    }, [])

    const handleChange = (event) => {
        setOferta({
            ...oferta,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("title", oferta.title)
        formData.append("description", oferta.description)
        formData.append("category", oferta.category)
        formData.append("service", oferta.service)
        formData.append("images", oferta.images)


        let result = await actions.addOferta(formData)
        console.log(result)



        if (result == 400) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Information not valid"
            })
        }
        if (result == 201) {
            navigate('/ofertas')
        }
    }

    const handleImage = (event) => {
        if (event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png" ) {
            setOferta({ ...oferta, images: event.target.files[0] })
        } else {
            console.log("Format not compatible")
        }
    }

    return (
        <>
            {store.profile[1] == "No personal info" ? <>
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        No personal info added, please complete it
                        <Link to="/editprofile"><button className="btn btn-primary mx-3">Complete profile</button></Link>
                    </div>

                </div>

            </>
                :
                <div className="container w-75">
                    <h1>Que oferta desea publicar?</h1>
                    <form className="border" onSubmit={handleSubmit}>
                        <div className="form-group  mt-3 mx-3">
                            <label>Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={oferta.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group  mt-3 mx-3">
                            <label>Descripcion</label>
                            <textarea
                                type="text"
                                className="form-control"
                                name="description"
                                value={oferta.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group  mt-3 mx-3">
                            <label>Categoria</label>
                            <select
                                className="form-select"
                                value={oferta.category}
                                name="category"
                                onChange={handleChange}>
                                <option >Seleccione una opcion</option>
                                <option value="mantenimiento">Mantenimiento</option>
                                <option value="limpieza">Limpieza</option>
                                <option value="construcción">Construcción</option>
                                <option value="jardineria">Jardineria</option>
                                <option value="mudanzas">Mudanzas</option>
                                <option value="tecnologias">Tecnologías</option>
                                <option value="negocios">Negocios</option>
                                <option value="salud">Salud</option>
                                <option value="eventos">Eventos</option>
                                <option value="traducciones">Traducciones</option>
                                <option value="idiomas">Idiomas</option>
                                <option value="personal_training">Personal training</option>
                            </select>
                        </div>
                        <div className="form-group mt-3 mx-3">
                            <label>Tipo de servicio</label>
                            <select
                                className="form-select"
                                value={oferta.service}
                                name="service"
                                onChange={handleChange}>
                                <option >Seleccione una opcion</option>
                                <option value="remote">Remote</option>
                                <option value="in_place">In place</option>
                            </select>

                        </div>
                        <div className="form-group m-3">
                            <label>Adjunte una imagen que ayude a clarificar su proyecto ofertado</label>
                            <input
                                type="file"
                                className="form-control"
                                name="images"
                                onChange={handleImage}
                            />
                        </div>
                        <div className="form-group m-3">
                            <button onSubmit={handleSubmit} className="btn btn-primary">Crear Oferta</button>
                        </div>

                    </form>
                </div>
            }
        </>
    )
}

export default AddOferta