import React, { useState, useContext, useEffect } from "react"
import { Context } from "../store/appContext"
import {  Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const AddSolicitud = () => {
    const navigate = useNavigate()
    const { actions, store } = useContext(Context)
    const [solicitud, setSolicitud] = useState({
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
        setSolicitud({
            ...solicitud,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("title", solicitud.title)
        formData.append("description", solicitud.description)
        formData.append("category", solicitud.category)
        formData.append("service", solicitud.service)
        formData.append("images", solicitud.images)


        let result = await actions.addSolicitud(formData)
        console.log(result)



        if (result == 400) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Information not valid"
            })
        }
        if (result == 200) {
            navigate('/solicitudes')
        }
    }

    const handleImage = (event) => {
        if (event.target.files[0].type == "image/jpg" || event.target.files[0].type == "image/jpeg" || event.target.files[0].type == "image/png") {
            setSolicitud({ ...solicitud, images: event.target.files[0] })
        } else {
            console.log("Format not compatible")
        }
    }

    return (
        <>
            {store.profile[1] == "No personal info" ? <>
                <div className="container">
                    <div className="alert alert-danger" role="alert">
                        No personal info added, please complete it here
                        <Link to="/editprofile"><button className="btn btn-primary mx-3">Complete profile</button></Link>
                    </div>

                </div>

            </>
                :
                <div className="container w-75">
                    <h1>Que servicio necesita?</h1>
                    <form className="border" onSubmit={handleSubmit}>
                        <div className="form-group  mt-3 mx-3">
                            <label>Titulo</label>
                            <input
                                type="text"
                                className="form-control"
                                name="title"
                                value={solicitud.title}
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
                                value={solicitud.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group  mt-3 mx-3">
                            <label>Categoria</label>
                            <select
                                className="form-select"
                                value={solicitud.category}
                                name="category"
                                onChange={handleChange}>
                                <option >Seleccione una opcion</option>
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
                        <div className="form-group mt-3 mx-3">
                            <label>Tipo de servicio</label>
                            <select
                                className="form-select"
                                value={solicitud.service}
                                name="service"
                                onChange={handleChange}>
                                <option >Seleccione una opcion</option>
                                <option value="remote">Remote</option>
                                <option value="in_place">In place</option>
                            </select>

                        </div>
                        <div className="form-group m-3">
                            <label>Adjunte una imagen que ayude a clarificar su proyecto</label>
                            <input
                                type="file"
                                className="form-control"
                                name="images"
                                onChange={handleImage}
                            />
                        </div>
                        <div className="form-group m-3">
                            <button onSubmit={handleSubmit} className="btn btn-primary">Crear Solicitud</button>
                        </div>

                    </form>
                </div>
            }
        </>
    )
}

export default AddSolicitud
